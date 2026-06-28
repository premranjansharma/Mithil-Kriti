// lib/mongodb.js
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI define nahi hai');

const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
};

export { connectDB };
export default connectDB;
