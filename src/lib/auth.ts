const SECRET_KEY = process.env.ADMIN_JWT_SECRET || 'pkc-secret-auth-key-2026-secure-random-981273';

function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    return crypto.subtle.importKey(
        'raw',
        encoder.encode(SECRET_KEY),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
}

export interface SessionPayload {
    email: string;
    exp: number;
}

export async function createSessionToken(email: string, durationInSeconds: number = 60 * 60 * 24): Promise<string> {
    const payload: SessionPayload = {
        email,
        exp: Math.floor(Date.now() / 1000) + durationInSeconds,
    };
    const encoder = new TextEncoder();
    const payloadJson = JSON.stringify(payload);
    const payloadPart = base64UrlEncode(encoder.encode(payloadJson));

    const key = await getHmacKey();
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadPart));
    const signaturePart = base64UrlEncode(signature);

    return `${payloadPart}.${signaturePart}`;
}

export async function verifySessionToken(token?: string | null): Promise<SessionPayload | null> {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadPart, signaturePart] = parts;
    try {
        const key = await getHmacKey();
        const encoder = new TextEncoder();
        const signatureBytes = base64UrlDecode(signaturePart);
        const isValid = await crypto.subtle.verify(
            'HMAC',
            key,
            signatureBytes as unknown as BufferSource,
            encoder.encode(payloadPart)
        );

        if (!isValid) return null;

        const payloadBytes = base64UrlDecode(payloadPart);
        const decoder = new TextDecoder();
        const payload: SessionPayload = JSON.parse(decoder.decode(payloadBytes));

        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            return null;
        }

        return payload;
    } catch {
        return null;
    }
}
