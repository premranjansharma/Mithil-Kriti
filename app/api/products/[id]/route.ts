import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const product = await Product.findOne({
      $or: [
        { slug: params.id },
        { _id: params.id.match(/^[a-f\d]{24}$/i) ? params.id : null },
      ],
      is_active: true,
    }).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error('[GET /api/products/[id]]', error);
    return NextResponse.json({ error: 'Product fetch karne mein error aaya' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Product.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('[PATCH /api/products/[id]]', error);
    return NextResponse.json({ error: 'Product update karne mein error aaya' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const updated = await Product.findByIdAndUpdate(
      params.id,
      { $set: { is_active: false } },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: 'Product nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product delete ho gaya' });
  } catch (error) {
    console.error('[DELETE /api/products/[id]]', error);
    return NextResponse.json({ error: 'Product delete karne mein error aaya' }, { status: 500 });
  }
}