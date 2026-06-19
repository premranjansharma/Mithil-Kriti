import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface IOrderItem {
  product_id: string;
  variant_id: string;
  title: string;
  variant_title: string;
  price_in_cents: number;
  quantity: number;
  image?: string;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  order_number: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    external_id?: string;
  };
  items: IOrderItem[];
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  subtotal_in_cents: number;
  shipping_in_cents: number;
  total_in_cents: number;
  currency: string;
  status: OrderStatus;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_id?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const OrderItemSchema = new Schema<IOrderItem>({
  product_id: { type: String, required: true },
  variant_id: { type: String, required: true },
  title: { type: String, required: true },
  variant_title: { type: String, required: true },
  price_in_cents: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
});

const OrderSchema = new Schema<IOrder>(
  {
    order_number: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      external_id: { type: String },
    },
    items: { type: [OrderItemSchema], required: true },
    shipping_address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true, default: 'India' },
    },
    subtotal_in_cents: { type: Number, required: true },
    shipping_in_cents: { type: Number, required: true, default: 0 },
    total_in_cents: { type: Number, required: true },
    currency: { type: String, required: true, default: 'INR' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    payment_id: { type: String },
    notes: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// Index for fast lookups
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ created_at: -1 });

// ---------------------------------------------------------------------------
// Helper — unique order number generator
// ---------------------------------------------------------------------------

export function generateOrderNumber(): string {
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MP-${yy}${mm}${dd}-${rand}`; // e.g. MP-240615-A3X9
}

const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model<IOrder>('Order', OrderSchema);

export default Order;