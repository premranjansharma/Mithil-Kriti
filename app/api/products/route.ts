import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = req.nextUrl;
    const page     = Math.max(1, Number(searchParams.get('page')  ?? 1));
    const limit    = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 12)));
    const category = searchParams.get('category');
    const is_new   = searchParams.get('is_new');
    const search   = searchParams.get('search');
    const sort     = searchParams.get('sort') ?? 'created_at';
    const order    = searchParams.get('order') === 'asc' ? 1 : -1;

    const filter: Record<string, unknown> = { is_active: true };
    if (category) filter['category'] = category;
    if (is_new === 'true') filter['is_new'] = true;
    if (search) filter['$text'] = { $search: search };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ [sort]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: products,
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json({ error: 'Products fetch karne mein error aaya' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, slug, description, category, variants, images, currency, is_new } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Title, slug aur category zaroori hai' }, { status: 400 });
    }

    const existing = await Product.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: 'Yeh slug pehle se exist karta hai' }, { status: 409 });
    }

    const product = await Product.create({
      title, slug, description, category,
      variants: variants ?? [],
      images: images ?? [],
      currency: currency ?? 'INR',
      is_new: is_new ?? false,
      is_active: true,
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/products]', error);
    return NextResponse.json({ error: 'Product create karne mein error aaya' }, { status: 500 });
  }
}