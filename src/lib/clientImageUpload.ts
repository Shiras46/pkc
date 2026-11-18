/**
 * Utility for converting images to WebP format in the browser before upload,
 * providing instant preview, and safely uploading to /api/upload.
 */

export interface WebPConversionResult {
    file: File;
    previewUrl: string;
    originalSize: number;
    webpSize: number;
    savedPercent: number;
}

/**
 * Converts any browser-supported image (JPEG, PNG, HEIC, TIFF, WebP, etc.)
 * into a modern, compressed WebP image in the browser.
 * 
 * - Preserves aspect ratio with max bounds (default 2560px).
 * - Drastically reduces payload size (typically 80-95% smaller) before network transmission.
 * - Prevents Nginx/proxy 413 "Request Entity Too Large" errors.
 */
export async function convertImageToWebP(
    file: File,
    maxWidth = 2560,
    maxHeight = 2560,
    quality = 0.85
): Promise<WebPConversionResult> {
    const originalSize = file.size;

    const isSvg = file.type === 'image/svg+xml' || /\.svgz?$/i.test(file.name);
    const isGif = file.type === 'image/gif' || /\.gif$/i.test(file.name);
    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|gif|bmp|tiff|tif|heic|heif|jfif|svg|svgz|ico|raw|cr2|nef|arw|dng|jpe)$/i.test(file.name);

    // If it's SVG (vector) or GIF (animated), preserve original format and allow server to process
    if (isSvg || isGif) {
        return {
            file,
            previewUrl: URL.createObjectURL(file),
            originalSize,
            webpSize: originalSize,
            savedPercent: 0,
        };
    }

    // If it's not an image (e.g. video or other file), bypass conversion
    if (!isImage) {
        return {
            file,
            previewUrl: URL.createObjectURL(file),
            originalSize,
            webpSize: originalSize,
            savedPercent: 0,
        };
    }

    return new Promise((resolve) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            let { width, height } = img;
            if (width > maxWidth || height > maxHeight) {
                if (width / maxWidth > height / maxHeight) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                } else {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                // Fallback if canvas context fails
                return resolve({
                    file,
                    previewUrl: URL.createObjectURL(file),
                    originalSize,
                    webpSize: originalSize,
                    savedPercent: 0,
                });
            }

            // Draw image to canvas
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        return resolve({
                            file,
                            previewUrl: URL.createObjectURL(file),
                            originalSize,
                            webpSize: originalSize,
                            savedPercent: 0,
                        });
                    }

                    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                    const cleanName = baseName.replace(/[^a-zA-Z0-9_-]/g, '') || 'image';
                    const webpFile = new File([blob], `${cleanName}.webp`, { type: 'image/webp' });
                    const previewUrl = URL.createObjectURL(webpFile);
                    const webpSize = blob.size;
                    const saved = originalSize > 0 ? Math.max(0, Math.round(((originalSize - webpSize) / originalSize) * 100)) : 0;

                    resolve({
                        file: webpFile,
                        previewUrl,
                        originalSize,
                        webpSize,
                        savedPercent: saved,
                    });
                },
                'image/webp',
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({
                file,
                previewUrl: URL.createObjectURL(file),
                originalSize,
                webpSize: originalSize,
                savedPercent: 0,
            });
        };

        img.src = objectUrl;
    });
}

/**
 * Safely uploads a file to /api/upload.
 * Correctly inspects response status and content-type so HTML errors (413, 502, 504)
 * do not trigger "Unexpected token '<', '<html>' is not valid JSON".
 */
export async function uploadFileSafely(file: File): Promise<{
    url: string;
    format: string;
    originalSize?: number;
    compressedSize?: number;
}> {
    const formData = new FormData();
    formData.set('file', file);

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
        if (contentType.includes('application/json')) {
            const errJson = await res.json().catch(() => null);
            throw new Error(errJson?.error || errJson?.message || `Upload failed with status ${res.status}`);
        } else {
            // Received non-JSON (e.g. Nginx 413 Request Entity Too Large or 502/504 HTML page)
            if (res.status === 413) {
                throw new Error('The uploaded file exceeds the server size limit. Please choose a smaller image.');
            } else if (res.status === 401) {
                throw new Error('Your admin session has expired. Please refresh the page and log in again.');
            } else if (res.status === 502 || res.status === 504) {
                throw new Error('The server is temporarily busy or unreachable. Please try again in a few moments.');
            } else {
                throw new Error(`Upload failed with server status ${res.status}.`);
            }
        }
    }

    if (!contentType.includes('application/json')) {
        throw new Error('Server returned an unexpected response format. Please try again.');
    }

    const data = await res.json();
    if (!data?.url) {
        throw new Error(data?.error || 'Invalid server response: missing file URL.');
    }

    return data;
}
