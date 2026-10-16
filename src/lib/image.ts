/**
 * Safely resolves an image src for Next.js Image component.
 * Valid Next.js image sources must:
 * 1. Start with a leading slash '/' for local relative public paths (e.g., '/image/about.webp')
 * 2. Or be an absolute URL starting with 'http://' or 'https://'
 * 3. Or be a valid data URI starting with 'data:image/'
 *
 * Any invalid strings (like "afdas", whitespace, or arbitrary text) will safely fall back to the fallback image.
 */
export function getValidImageUrl(src?: string | null, fallback = '/image/about.webp'): string {
    if (!src || typeof src !== 'string') return fallback;
    const trimmed = src.trim();
    if (!trimmed) return fallback;

    // Relative public path, absolute URL, or data URI
    if (
        trimmed.startsWith('/') ||
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('data:image/')
    ) {
        return trimmed;
    }

    // Auto-fix paths missing leading slash if pointing to public subfolders
    if (trimmed.startsWith('image/') || trimmed.startsWith('images/') || trimmed.startsWith('uploads/')) {
        return `/${trimmed}`;
    }

    return fallback;
}
