"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (
    product: Product,
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart on page load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (
    product: Product,
    qty: number,
    color: string,
    size: string
  ) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.product.id === product.id &&
          i.selectedColor === color &&
          i.selectedSize === size
      );

      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id &&
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
        },
      ];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) =>
            i.product.id === productId ? { ...i, qty } : i
          )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalItems = items.reduce((acc, i) => acc + i.qty, 0);

  const subtotal = items.reduce(
    (acc, i) => acc + i.product.price * i.qty,
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
