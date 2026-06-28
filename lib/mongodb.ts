// lib/mongodb.ts
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI define nahi hai');

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

const globalWithMongoose = global as typeof globalThis & { mongoose: MongooseCache };

const cached: MongooseCache = globalWithMongoose.mongoose ?? (globalWithMongoose.mongoose = { conn: null, promise: null });

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(process.env.MONGODB_URI!);
  cached.conn = await cached.promise;
  return cached.conn;
};

export { connectDB };
export default connectDB;
