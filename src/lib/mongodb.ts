import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose | null> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose | null> {
    if (!MONGODB_URI) {
        return null;
    }

    if (!cached) return null;

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 2000,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((m) => m)
            .catch((err) => {
                console.error('MongoDB connection error:', err);
                if (cached) cached.promise = null;
                return null;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch {
        if (cached) cached.promise = null;
        return null;
    }

    return cached.conn;
}

export default dbConnect;
