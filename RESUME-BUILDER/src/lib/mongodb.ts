import mongoose from "mongoose"

const globalWithMongoose = global as typeof globalThis & {
    mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI!).then((mongoose) => {
            console.log("mongodb connected")
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.log("error in connecting db", e)
        throw e;
    }

    return cached.conn;
}