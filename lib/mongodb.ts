import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error('MONGODB_URI define nahi hai');

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
declare global { var mongoose: Cache; }

const cached: Cache = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
