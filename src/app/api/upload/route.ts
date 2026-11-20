import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

import { verifySessionToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

function loadEnvFile() {
    const candidatePaths = [
        path.join(process.cwd(), '.env.local'),
        path.join(process.cwd(), '.env'),
        path.join(process.cwd(), '..', '..', '.env.local'),
        path.join(process.cwd(), '..', '..', '.env'),
        '/var/www/pkc/.env.local',
        '/var/www/pkc/.env',
    ];

    for (const p of candidatePaths) {
        try {
            if (fs.existsSync(p)) {
                const content = fs.readFileSync(p, 'utf-8');
                const lines = content.split(/\r?\n/);
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed.startsWith('#')) continue;
                    const eqIndex = trimmed.indexOf('=');
                    if (eqIndex > 0) {
                        const key = trimmed.slice(0, eqIndex).trim();
                        const val = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
                        if (!process.env[key]) {
                            process.env[key] = val;
                        }
                    }
                }
            }
        } catch {
            // ignore
        }
    }
}

function getS3Config() {
    loadEnvFile();

    const region = process.env.AWS_REGION || "us-east-1";
    const bucket = process.env.AWS_BUCKET_NAME || "pkcevents-storage";
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !bucket || !accessKeyId || !secretAccessKey) {
        console.warn('S3 config missing required keys at runtime:', {
            hasRegion: !!region,
            hasBucket: !!bucket,
            hasAccessKeyId: !!accessKeyId,
            hasSecretAccessKey: !!secretAccessKey
        });
        return null;
    }

    return { region, bucket, accessKeyId, secretAccessKey };
}

function saveToPublicUploads(subfolder: string, fileName: string, buffer: Buffer): string {
    const candidateDirs = [
        path.join(process.cwd(), 'public', subfolder),
        path.join(process.cwd(), '.next', 'standalone', 'public', subfolder),
        path.join('/var', 'www', 'pkc', 'public', subfolder),
        path.join('/var', 'www', 'pkc', '.next', 'standalone', 'public', subfolder),
        path.join(__dirname, '..', '..', '..', 'public', subfolder),
        path.join(__dirname, '..', '..', 'public', subfolder),
    ];

    for (const dir of candidateDirs) {
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(path.join(dir, fileName), buffer);
        } catch {
            // ignore candidate directory path if not existing
        }
    }
    return `/${subfolder}/${fileName}`;
}

/**
 * Ensures binary data is backed by a standard, unshared ArrayBuffer instance.
 * Sharp or worker threads/napi may produce memory backed by SharedArrayBuffer,
 * which causes AWS SDK / @smithy and Node crypto hash functions to reject it with:
 * "The 'input' argument must be ArrayBuffer. Received type object ([object SharedArrayBuffer])"
 */
function toStandardBuffer(buf: Buffer | Uint8Array | ArrayBuffer | SharedArrayBuffer): Buffer {
    const uint8 = new Uint8Array(buf as any);
    const standardArrayBuffer = new ArrayBuffer(uint8.byteLength);
    new Uint8Array(standardArrayBuffer).set(uint8);
    return Buffer.from(standardArrayBuffer);
}

export async function POST(request: Request) {
    try {
        const sessionCookie = (await cookies()).get('admin_session')?.value;
        const session = await verifySessionToken(sessionCookie);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.formData();
        const file = data.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const isImageMime = file.type.startsWith('image/');
        const isImageExt = /\.(jpg|jpeg|png|webp|avif|gif|bmp|tiff|tif|heic|heif|jfif|svg|svgz|ico|raw|cr2|nef|arw|dng|jpe)$/i.test(file.name);

        const isSvg = file.type === 'image/svg+xml' || /\.svgz?$/i.test(file.name);
        const isGif = file.type === 'image/gif' || /\.gif$/i.test(file.name);

        const isVideoMime = file.type.startsWith('video/');
        const isVideoExt = /\.(mp4|webm|mov|m4v|ogg|ogv|avi|mkv|flv|wmv)$/i.test(file.name);

        if (!isImageMime && !isImageExt && !isVideoMime && !isVideoExt) {
            return NextResponse.json({ error: 'Only image or video files are allowed' }, { status: 400 });
        }

        const rawArrayBuffer = await file.arrayBuffer();
        const rawBuffer = toStandardBuffer(rawArrayBuffer);
        const s3Config = getS3Config();

        // Handle Video uploads (.mp4, .webm, .mov, .avi, etc.)
        if (isVideoMime || isVideoExt) {
            const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
            const ext = extMatch ? extMatch[1].toLowerCase() : 'mp4';
            const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            const safeName = baseName.replace(/[^a-zA-Z0-9-]/g, '') || 'video';
            const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}.${ext}`;
            const contentType = file.type || (ext === 'mov' ? 'video/quicktime' : 'video/mp4');

            if (s3Config) {
                try {
                    const { region, bucket, accessKeyId, secretAccessKey } = s3Config;
                    const client = new S3Client({
                        region,
                        credentials: {
                            accessKeyId,
                            secretAccessKey,
                        },
                    });
                    const key = `uploads/videos/${fileName}`;

                    await client.send(new PutObjectCommand({
                        Bucket: bucket,
                        Key: key,
                        Body: rawBuffer,
                        ContentType: contentType,
                        CacheControl: 'public, max-age=31536000, immutable',
                    }));

                    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
                    return NextResponse.json({
                        url,
                        format: ext,
                        type: 'video',
                        size: rawBuffer.length,
                    });
                } catch (s3Err) {
                    console.warn('S3 video upload failed, falling back to local filesystem:', s3Err);
                }
            }

            // Local filesystem fallback for video
            const url = saveToPublicUploads('uploads/videos', fileName, rawBuffer);
            return NextResponse.json({
                url,
                format: ext,
                type: 'video',
                size: rawBuffer.length,
            });
        }

        // Handle SVG vector graphics directly (preserves pure scalable XML without rasterizing)
        if (isSvg) {
            const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
            const safeName = baseName.replace(/[^a-zA-Z0-9-]/g, '') || 'vector';
            const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}.svg`;
            const contentType = 'image/svg+xml';

            if (s3Config) {
                try {
                    const { region, bucket, accessKeyId, secretAccessKey } = s3Config;
                    const client = new S3Client({
                        region,
                        credentials: {
                            accessKeyId,
                            secretAccessKey,
                        },
                    });
                    const key = `uploads/${fileName}`;

                    await client.send(new PutObjectCommand({
                        Bucket: bucket,
                        Key: key,
                        Body: rawBuffer,
                        ContentType: contentType,
                        CacheControl: 'public, max-age=31536000, immutable',
                    }));

                    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
                    return NextResponse.json({
                        url,
                        format: 'svg',
                        originalSize: file.size,
                        compressedSize: rawBuffer.length,
                    });
                } catch (s3Err) {
                    console.warn('S3 SVG upload failed, falling back to local filesystem:', s3Err);
                }
            }

            const url = saveToPublicUploads('uploads', fileName, rawBuffer);
            return NextResponse.json({
                url,
                format: 'svg',
                originalSize: file.size,
                compressedSize: rawBuffer.length,
            });
        }

        // Support all raster images (JPEG, PNG, WebP, AVIF, HEIC, TIFF, BMP, JFIF, ICO, animated GIF, RAW):
        // 1. .rotate() auto-orients camera/mobile photos based on EXIF metadata
        // 2. .resize() downscales extra-large/high-res photos (max 2560px) without enlarging smaller images
        // 3. .webp() automatically compresses and converts to modern WebP format (preserves animation for GIFs)
        let finalBuffer: Buffer;
        let finalExt = 'webp';
        let finalContentType = 'image/webp';

        try {
            const webpRaw = await sharp(rawBuffer, { animated: isGif, failOn: 'none' })
                .rotate()
                .resize({
                    width: 2560,
                    height: 2560,
                    fit: 'inside',
                    withoutEnlargement: true,
                })
                .webp({ quality: 80, effort: 4 })
                .toBuffer();

            finalBuffer = toStandardBuffer(webpRaw);
            finalExt = 'webp';
            finalContentType = 'image/webp';
        } catch (sharpErr) {
            console.warn('Sharp conversion fallback to raw image buffer:', sharpErr);
            finalBuffer = rawBuffer;
            const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
            finalExt = extMatch ? extMatch[1].toLowerCase() : (file.type ? file.type.split('/')[1] || 'png' : 'png');
            finalContentType = file.type || `image/${finalExt}`;
        }

        // Extract base filename without extension and append appropriate extension
        const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        const safeName = baseName.replace(/[^a-zA-Z0-9-]/g, '') || 'image';
        const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}.${finalExt}`;

        if (s3Config) {
            try {
                const { region, bucket, accessKeyId, secretAccessKey } = s3Config;
                const client = new S3Client({
                    region,
                    credentials: {
                        accessKeyId,
                        secretAccessKey,
                    },
                });
                const key = `uploads/${fileName}`;

                await client.send(new PutObjectCommand({
                    Bucket: bucket,
                    Key: key,
                    Body: finalBuffer,
                    ContentType: finalContentType,
                    CacheControl: 'public, max-age=31536000, immutable',
                }));

                const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
                return NextResponse.json({
                    url,
                    format: finalExt,
                    originalSize: file.size,
                    compressedSize: finalBuffer.length,
                });
            } catch (s3Err) {
                console.warn('S3 image upload failed, falling back to local filesystem:', s3Err);
            }
        }

        // Local filesystem fallback
        const url = saveToPublicUploads('uploads', fileName, finalBuffer);
        return NextResponse.json({
            url,
            format: finalExt,
            originalSize: file.size,
            compressedSize: finalBuffer.length,
        });
    } catch (error) {
        console.error('Image processing/upload failed:', error);
        const message = error instanceof Error ? error.message : 'Image upload failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
