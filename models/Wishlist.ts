import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlistItem {
  product_id: string;
  added_at: Date;
}

export interface IWishlist extends Document {
  user_id: string;
  items: IWishlistItem[];
  created_at: Date;
  updated_at: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },

    items: [
      {
        product_id: {
          type: String,
          required: true,
        },

        added_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

WishlistSchema.index({ user_id: 1 });

const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist ||
  mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default Wishlist;