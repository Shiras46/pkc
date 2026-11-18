import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MIME_MAP: Record<string, string> = {
    webp: 'image/webp',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    avif: 'image/avif',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
    tif: 'image/tiff',
    ico: 'image/x-icon',
    mp4: 'video/mp4',
    webm: 'video/webm',
    mov: 'video/quicktime',
};

export async function GET(
    request: Request,
    context: { params: Promise<{ path: string[] }> }
) {
    try {
        const { path: pathSegments } = await context.params;
        if (!pathSegments || pathSegments.length === 0) {
            return new NextResponse('File not found', { status: 404 });
        }

        const subPath = pathSegments.join('/');
        const ext = (subPath.match(/\.([a-zA-Z0-9]+)$/)?.[1] || 'webp').toLowerCase();
        const contentType = MIME_MAP[ext] || 'application/octet-stream';

        // 1. Check candidate local directories
        const candidatePaths = [
            path.join('/var', 'www', 'pkc', 'public', 'uploads', subPath),
            path.join('/var', 'www', 'pkc', '.next', 'standalone', 'public', 'uploads', subPath),
            path.join(process.cwd(), 'public', 'uploads', subPath),
            path.join(process.cwd(), '.next', 'standalone', 'public', 'uploads', subPath),
            path.join(__dirname, '..', '..', '..', '..', 'public', 'uploads', subPath),
            path.join(__dirname, '..', '..', '..', 'public', 'uploads', subPath),
        ];

        for (const fullPath of candidatePaths) {
            try {
                if (fs.existsSync(fullPath)) {
                    const fileBuffer = fs.readFileSync(fullPath);
                    return new NextResponse(fileBuffer, {
                        headers: {
                            'Content-Type': contentType,
                            'Cache-Control': 'public, max-age=31536000, immutable',
                        },
                    });
                }
            } catch {
                // continue searching
            }
        }

        // 2. Fallback to S3 if available
        const s3Url = `https://pkcevents-storage.s3.us-east-1.amazonaws.com/uploads/${subPath}`;
        try {
            const s3Res = await fetch(s3Url, { method: 'HEAD' });
            if (s3Res.ok) {
                return NextResponse.redirect(s3Url, { status: 302 });
            }
        } catch {
            // S3 check failed
        }

        // 3. Fallback to local default wedding catering image for images
        const defaultImagePaths = [
            path.join('/var', 'www', 'pkc', 'public', 'image', 'services', 'wedding-catering.webp'),
            path.join(process.cwd(), 'public', 'image', 'services', 'wedding-catering.webp'),
            path.join(process.cwd(), '.next', 'standalone', 'public', 'image', 'services', 'wedding-catering.webp'),
        ];

        for (const defPath of defaultImagePaths) {
            try {
                if (fs.existsSync(defPath)) {
                    const fallbackBuffer = fs.readFileSync(defPath);
                    return new NextResponse(fallbackBuffer, {
                        headers: {
                            'Content-Type': 'image/webp',
                            'Cache-Control': 'public, max-age=3600',
                        },
                    });
                }
            } catch {
                // continue
            }
        }

        return new NextResponse('File not found', { status: 404 });
    } catch (err) {
        console.error('Uploads route handler error:', err);
        return new NextResponse('Internal error', { status: 500 });
    }
}
