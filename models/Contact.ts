import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IContact extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: Date;
  updated_at: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    is_read: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

ContactSchema.index({ email: 1 });
ContactSchema.index({ is_read: 1 });
ContactSchema.index({ created_at: -1 });

const Contact: Model<IContact> =
  mongoose.models.Contact ?? mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;