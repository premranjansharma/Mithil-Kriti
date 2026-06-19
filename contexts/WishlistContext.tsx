"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/lib/types";

interface WishlistContextType {
  items: Product[];
  toggle: (product: Product) => void;
  isWished: (id: number) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const toggle = (product: Product) =>
    setItems((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );

  const isWished = (id: number) => items.some((p) => p.id === id);
  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, toggle, isWished, count }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
