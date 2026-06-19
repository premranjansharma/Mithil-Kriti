import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order, { generateOrderNumber } from '@/models/Order';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      items, customer, shipping_address,
      shipping_in_cents = 1500, currency = 'INR', payment_id,
    } = body;

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart mein koi item nahi hai' }, { status: 400 });
    }
    if (!customer?.name || !customer?.email) {
      return NextResponse.json({ error: 'Customer naam aur email zaroori hai' }, { status: 400 });
    }
    if (!shipping_address?.line1 || !shipping_address?.city || !shipping_address?.pincode) {
      return NextResponse.json({ error: 'Shipping address adhura hai' }, { status: 400 });
    }

    const subtotal_in_cents: number = items.reduce(
      (sum: number, item: { price_in_cents: number; quantity: number }) =>
        sum + item.price_in_cents * item.quantity, 0
    );
    const total_in_cents = subtotal_in_cents + shipping_in_cents;

    const order = await Order.create({
      order_number: generateOrderNumber(),
      customer: { ...customer, email: customer.email.toLowerCase() },
      items, shipping_address,
      subtotal_in_cents, shipping_in_cents, total_in_cents,
      currency,
      status: 'pending',
      payment_status: payment_id ? 'paid' : 'pending',
      payment_id,
    });

    const res = NextResponse.json({
      message: 'Order place ho gaya!',
      data: {
        order_id: order._id,
        order_number: order.order_number,
        total_in_cents: order.total_in_cents,
        currency: order.currency,
      },
    }, { status: 201 });

    res.cookies.set('mp_cart', '[]', { maxAge: 0, path: '/' });
    return res;
  } catch (error) {
    console.error('[POST /api/checkout]', error);
    return NextResponse.json({ error: 'Checkout mein error aaya. Dobara try karein.' }, { status: 500 });
  }
}