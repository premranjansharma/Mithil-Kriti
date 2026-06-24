import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IVariant {
  id: string;
  title: string;
  price_in_cents: number;
  inventory_quantity: number;
  sku?: string;
}

export interface IProduct extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description?: string;
  category: string;
  variants: IVariant[];
  images: string[];
  currency: string;
  is_new: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const VariantSchema = new Schema<IVariant>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price_in_cents: { type: Number, required: true },
  inventory_quantity: { type: Number, required: true, default: 0 },
  sku: { type: String },
});

const ProductSchema = new Schema<IProduct>(
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

let Product: Model<IProduct>;

if (mongoose.models && mongoose.models['Product']) {
  Product = mongoose.models['Product'] as Model<IProduct>;
} else {
  Product = mongoose.model<IProduct>('Product', ProductSchema);
}

export default Product;
