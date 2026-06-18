import { useState, useCallback } from 'react';

// ── Config — apna API URL yahan set karo ─────────────────────────────────────
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartVariant {
  sale_price_in_cents: number | null;
  sale_price_formatted: string;
  price_formatted: string;
  inventory_quantity: number;
  [key: string]: unknown;
}

export interface CartProduct {
  id: string | number;
  title: string;
  image?: string;
  [key: string]: unknown;
}

export interface CartItem {
  id: string;
  product: CartProduct;
  variant: CartVariant;
  quantity: number;
}

interface UseCartReturn {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (
    product: CartProduct,
    variant: CartVariant,
    quantity: number,
    maxQuantity?: number
  ) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCart(): UseCartReturn {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/cart`, {
        credentials: 'include', // cookies/session bhejo
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data: CartItem[] = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error('fetchCart error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (
      product: CartProduct,
      variant: CartVariant,
      quantity: number,
      maxQuantity?: number
    ) => {
      if (maxQuantity !== undefined && quantity > maxQuantity) {
        throw new Error(`Only ${maxQuantity} items available in stock.`);
      }

      const res = await fetch(`${API_BASE_URL}/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          variant,
          quantity,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? 'Failed to add to cart');
      }

      await fetchCart(); // cart refresh karo
    },
    [fetchCart]
  );

  const removeFromCart = useCallback(
    async (cartItemId: string) => {
      const res = await fetch(`${API_BASE_URL}/cart/items/${cartItemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to remove item from cart');
      await fetchCart();
    },
    [fetchCart]
  );

  const updateQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      const res = await fetch(`${API_BASE_URL}/cart/items/${cartItemId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error('Failed to update quantity');
      await fetchCart();
    },
    [fetchCart]
  );

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCart,
  };
}