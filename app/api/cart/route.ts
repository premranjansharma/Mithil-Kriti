import { NextRequest, NextResponse } from 'next/server';

interface CartItem {
  product_id: string;
  variant_id: string;
  title: string;
  variant_title: string;
  price_in_cents: number;
  quantity: number;
  image?: string;
  currency: string;
  inventory_quantity: number;
}

const CART_COOKIE = 'mp_cart';
const MAX_AGE = 60 * 60 * 24 * 7;

function getCart(req: NextRequest): CartItem[] {
  const raw = req.cookies.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try { return JSON.parse(raw) as CartItem[]; }
  catch { return []; }
}

function cartResponse(items: CartItem[], status = 200) {
  const subtotal = items.reduce((sum, i) => sum + i.price_in_cents * i.quantity, 0);
  const res = NextResponse.json({ data: items, subtotal, count: items.length }, { status });
  res.cookies.set(CART_COOKIE, JSON.stringify(items), {
    httpOnly: true, sameSite: 'lax', maxAge: MAX_AGE, path: '/',
  });
  return res;
}

export async function GET(req: NextRequest) {
  const items = getCart(req);
  const subtotal = items.reduce((sum, i) => sum + i.price_in_cents * i.quantity, 0);
  return NextResponse.json({ data: items, subtotal, count: items.length });
}

export async function POST(req: NextRequest) {
  try {
    const body: CartItem = await req.json();
    const { product_id, variant_id, quantity = 1 } = body;

    if (!product_id || !variant_id) {
      return NextResponse.json({ error: 'product_id aur variant_id zaroori hai' }, { status: 400 });
    }

    const items = getCart(req);
    const existingIndex = items.findIndex(
      (i) => i.product_id === product_id && i.variant_id === variant_id
    );

    if (existingIndex > -1) {
      const newQty = items[existingIndex].quantity + quantity;
      items[existingIndex].quantity = Math.min(newQty, items[existingIndex].inventory_quantity);
    } else {
      items.push({ ...body, quantity });
    }

    return cartResponse(items, 201);
  } catch (error) {
    console.error('[POST /api/cart]', error);
    return NextResponse.json({ error: 'Cart mein item add karne mein error aaya' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { product_id, variant_id, quantity } = await req.json();

    if (!product_id || !variant_id || quantity == null) {
      return NextResponse.json({ error: 'product_id, variant_id aur quantity zaroori hai' }, { status: 400 });
    }

    let items = getCart(req);

    if (quantity <= 0) {
      items = items.filter((i) => !(i.product_id === product_id && i.variant_id === variant_id));
    } else {
      const idx = items.findIndex((i) => i.product_id === product_id && i.variant_id === variant_id);
      if (idx === -1) {
        return NextResponse.json({ error: 'Item cart mein nahi mila' }, { status: 404 });
      }
      items[idx].quantity = Math.min(quantity, items[idx].inventory_quantity);
    }

    return cartResponse(items);
  } catch (error) {
    console.error('[PATCH /api/cart]', error);
    return NextResponse.json({ error: 'Cart update karne mein error aaya' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest) {
  const res = NextResponse.json({ message: 'Cart clear ho gaya', data: [], count: 0 });
  res.cookies.set(CART_COOKIE, '[]', { maxAge: 0, path: '/' });
  return res;
}