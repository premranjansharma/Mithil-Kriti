import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import { categories } from '@/app/collections/page';

export async function GET(_req: NextRequest) {
  try {
    await connectDB();

    const counts = await Product.aggregate([
      { $match: { is_active: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]));

    const data = categories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      href: `/collections/${cat.slug}`,
      product_count: countMap[cat.slug] ?? 0,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[GET /api/collections]', error);
    return NextResponse.json({ error: 'Collections fetch karne mein error aaya' }, { status: 500 });
  }
}