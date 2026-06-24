import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable define nahi hai');
}

declare global {
  var _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;

  if (!mongoose.models['Product']) {
    const { Schema } = mongoose;
    const VariantSchema = new Schema({
      id: { type: String, required: true },
      title: { type: String, required: true },
      price_in_cents: { type: Number, required: true },
      inventory_quantity: { type: Number, required: true, default: 0 },
      sku: { type: String },
    });
    const ProductSchema = new Schema(
      {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        category: { type: String, required: true },
        variants: { type: [VariantSchema], default: [] },
        images: { type: [String], default: [] },
        currency: { type: String, default: 'INR' },
        is_new: { type: Boolean, default: false },
        is_active: { type: Boolean, default: true },
      },
      { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
    );
    ProductSchema.index({ slug: 1 });
    ProductSchema.index({ category: 1 });
    ProductSchema.index({ is_new: 1 });
    ProductSchema.index({ '$**': 'text' });
    mongoose.model('Product', ProductSchema);
  }

  return cache.conn;
}

export function getModel(name: string) {
  return mongoose.models[name];
}
