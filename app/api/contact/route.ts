import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Naam, email aur message zaroori hai' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Valid email address daalo' }, { status: 400 });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      subject: subject?.trim(),
      message: message.trim(),
    });

    return NextResponse.json(
      { message: 'Aapka message mil gaya! Hum jald hi contact karenge.', data: { id: contact._id } },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/contact]', error);
    return NextResponse.json({ error: 'Message send karne mein error aaya' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = req.nextUrl;
    const page  = Math.max(1, Number(searchParams.get('page')  ?? 1));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit') ?? 20)));
    const read  = searchParams.get('read');

    const filter: Record<string, unknown> = {};
    if (read === 'true') filter['is_read'] = true;
    if (read === 'false') filter['is_read'] = false;

    const [messages, total] = await Promise.all([
      Contact.find(filter)
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Contact.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: messages,
      pagination: { page, limit, total, total_pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('[GET /api/contact]', error);
    return NextResponse.json({ error: 'Messages fetch karne mein error aaya' }, { status: 500 });
  }
}