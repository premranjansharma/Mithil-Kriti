"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CartItem, IProduct } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: IProduct,
    qty: number,
    color: string,
    size: string
  ) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "guest_cart";

// Guards against stale localStorage data saved by an older version of the
// app (e.g. before `priceInCents` existed on CartItem, or before `product`
// switched from the old `Product` shape to `IProduct`). Without this, a
// leftover bad entry silently turns every price calculation into NaN,
// which then serializes to `null` when sent to the API.
function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const i = item as Record<string, unknown>;
  const product = i.product as Record<string, unknown> | undefined;

  return (
    !!product &&
    typeof product._id === "string" &&
    typeof product.title === "string" &&
    typeof i.priceInCents === "number" &&
    !Number.isNaN(i.priceInCents) &&
    typeof i.qty === "number" &&
    !Number.isNaN(i.qty)
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart on page load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      const validItems = Array.isArray(parsed) ? parsed.filter(isValidCartItem) : [];

      setItems(validItems);

      // If we dropped anything, immediately overwrite storage so the
      // bad entries don't come back on the next load.
      if (!Array.isArray(parsed) || validItems.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(validItems));
      }
    } catch {
      // corrupted JSON — ignore and start fresh
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (
    product: IProduct,
    qty: number,
    color: string,
    size: string
  ) => {
    // Snapshot the price at add-time — IProduct has no flat `.price`,
    // real price lives on the variant.
    const priceInCents = product.variants[0]?.price_in_cents ?? 0;

    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.product._id === product._id &&
          i.selectedColor === color &&
          i.selectedSize === size
      );

      if (existing) {
        return prev.map((i) =>
          i.product._id === product._id &&
          i.selectedColor === color &&
          i.selectedSize === size
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }

      return [
        ...prev,
        {
          product,
          qty,
          selectedColor: color,
          selectedSize: size,
          priceInCents,
        },
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product._id !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product._id !== productId)
        : prev.map((i) =>
            i.product._id === productId ? { ...i, qty } : i
          )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalItems = items.reduce((acc, i) => acc + i.qty, 0);

  const subtotal = items.reduce(
    (acc, i) => acc + i.priceInCents * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}
