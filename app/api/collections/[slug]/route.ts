import { NextRequest, NextResponse } from 'next/server';
import { connectDB, getModel } from '@/lib/mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const Product = getModel('Product');

    const { slug } = await params;
    const { searchParams } = req.nextUrl;
    const page  = Math.max(1, Number(searchParams.get('page')  ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 12)));
    const sort  = searchParams.get('sort') ?? 'created_at';
    const order = searchParams.get('order') === 'asc' ? 1 : -1;

    const filter = { category: slug, is_active: true };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ [sort]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    if (total === 0) {
      return NextResponse.json(
        { error: `'${slug}' collection mein koi product nahi mila` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: products,
      collection: slug,
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('[GET /api/collections/[slug]]', error);
    return NextResponse.json({ error: 'Collection fetch karne mein error aaya' }, { status: 500 });
  }
}
