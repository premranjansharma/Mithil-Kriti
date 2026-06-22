import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order, { generateOrderNumber } from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const order = await Order.create({
      order_number: generateOrderNumber(),

      customer: {
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone,
      },

      items: body.items,

      shipping_address: {
        line1: body.shipping_address.line1,
        city: body.shipping_address.city,
        state: body.shipping_address.state,
        pincode: body.shipping_address.pincode,
        country: "India",
      },

      subtotal_in_cents: body.subtotal_in_cents,
      shipping_in_cents: body.shipping_in_cents,
      total_in_cents: body.total_in_cents,

      currency: "INR",
      status: "pending",
      payment_status: "pending",
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}