import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const Order = mongoose.models['Order'];
    if (!Order) {
      return NextResponse.json({ error: 'Order model nahi mila' }, { status: 500 });
    }

    const { id } = await params;
    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json({ error: 'Order nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ data: order });
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
    const Order = mongoose.models['Order'];
    if (!Order) {
      return NextResponse.json({ error: 'Order model nahi mila' }, { status: 500 });
    }

    const { id } = await params;
    const body = await req.json();

    const updated = await Order.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Order nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
