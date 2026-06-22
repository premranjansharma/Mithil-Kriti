// models/Address.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAddress extends Document {
  user_id: string;

  full_name: string;
  phone: string;

  line1: string;
  line2?: string;

  city: string;
  state: string;
  pincode: string;
  country: string;

  is_default: boolean;

  created_at: Date;
  updated_at: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    user_id: {
      type: String,
      required: true,
    },

    full_name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    line1: {
      type: String,
      required: true,
    },

    line2: String,

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    is_default: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Address: Model<IAddress> =
  mongoose.models.Address ||
  mongoose.model<IAddress>("Address", AddressSchema);

export default Address;