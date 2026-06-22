import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";

export async function GET(req: NextRequest) {
  await connectDB();

  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId required" },
      { status: 400 }
    );
  }

  const cart = await Cart.findOne({ userId });

  return NextResponse.json(cart || { userId, items: [] });
}

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();

  const cart = await Cart.findOneAndUpdate(
    { userId: body.userId },
    { items: body.items },
    { new: true, upsert: true }
  );

  return NextResponse.json(cart);
}