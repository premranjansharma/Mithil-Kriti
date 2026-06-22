import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        productId: String,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart ||
  mongoose.model<ICart>("Cart", CartSchema);