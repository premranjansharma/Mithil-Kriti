import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const Product = mongoose.models['Product'];
    const { id } = await params;

    const product = await Product.findOne({
      $or: [
        { slug: id },
        { _id: id.match(/^[a-f\d]{24}$/i) ? id : null },
      ],
      is_active: true,
    }).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const Product = mongoose.models['Product'];
    const { id } = await params;
    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(
      id, { $set: body }, { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const Product = mongoose.models['Product'];
    const { id } = await params;

    const updated = await Product.findByIdAndUpdate(
      id, { $set: { is_active: false } }, { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product delete ho gaya' });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
