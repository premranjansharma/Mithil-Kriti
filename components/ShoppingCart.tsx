"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CartProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartProduct[];
  onIncrease?: (id: string) => void;
  onDecrease?: (id: string) => void;
  onRemove?: (id: string) => void;
}

// ─── Demo Data (replace with real cart context) ───────────────────────────────
const DEMO_ITEMS: CartProduct[] = [
  {
    id: "1",
    name: "Madhubani Fish Pair Painting",
    category: "Madhubani Paintings",
    price: 1299,
    quantity: 1,
    image: "/products/fish-painting.jpg",
  },
  {
    id: "2",
    name: "Silk Dupatta — Lotus Motif",
    category: "Silk & Fabric",
    price: 2199,
    quantity: 2,
    image: "/products/silk-dupatta.jpg",
  },
];

// ─── Motif Divider ────────────────────────────────────────────────────────────
function MotifDivider() {
  return (
    <div className="overflow-hidden h-[6px] w-full">
      <svg viewBox="0 0 400 6" preserveAspectRatio="none" className="w-full h-[6px]" aria-hidden="true">
        <defs>
          <pattern id="cart-motif" x="0" y="0" width="20" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3" x2="20" y2="3" stroke="#e8e0d0" strokeWidth="0.5" />
            <rect x="8" y="1.5" width="4" height="3" fill="none" stroke="#B8922A" strokeWidth="0.4" opacity={0.5} />
          </pattern>
        </defs>
        <rect width="400" height="6" fill="url(#cart-motif)" />
      </svg>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-5">
        <ShoppingBag size={26} className="text-[#B8922A]" />
      </div>
      <p
        className="text-[#1a1410] text-[17px] mb-1"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
      >
        Your cart is empty
      </p>
      <p className="text-[#9a8c78] text-[12px] tracking-[0.04em] mb-8">
        Explore our handcrafted collection
      </p>
      <Link
        href="/shop"
        onClick={onClose}
        className="flex items-center gap-2 px-6 py-3 bg-[#1a1410] text-white text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-[#B8922A] transition-colors duration-200"
      >
        Browse Shop
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}

// ─── Cart Item ────────────────────────────────────────────────────────────────
function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartProduct;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex gap-4 py-5">
      {/* Image */}
      <div className="relative w-[72px] h-[72px] flex-shrink-0 bg-[#f5f0e8] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="72px"
        />
        {/* Gold corner accent */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#B8922A] opacity-60" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#B8922A] opacity-60" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-[#5a5040] text-[9px] tracking-[0.14em] uppercase mb-[3px]">
          {item.category}
        </p>
        <p
          className="text-[#1a1410] text-[13px] leading-snug mb-3 truncate"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
        >
          {item.name}
        </p>

        {/* Qty + Price row */}
        <div className="flex items-center justify-between">
          {/* Quantity Control */}
          <div className="flex items-center border border-[#e8e0d0]">
            <button
              onClick={() => onDecrease(item.id)}
              className="w-7 h-7 flex items-center justify-center text-[#9a8c78] hover:text-[#1a1410] hover:bg-[#f5f0e8] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={10} />
            </button>
            <span className="w-7 h-7 flex items-center justify-center text-[#1a1410] text-[12px] font-medium border-x border-[#e8e0d0]">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              className="w-7 h-7 flex items-center justify-center text-[#9a8c78] hover:text-[#1a1410] hover:bg-[#f5f0e8] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={10} />
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-[#1a1410] text-[13px] font-semibold">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-[#c8b8a0] hover:text-red-400 transition-colors"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ShoppingCart Drawer ─────────────────────────────────────────────────
export default function ShoppingCart({
  isOpen,
  onClose,
  items = DEMO_ITEMS,
  onIncrease = () => {},
  onDecrease = () => {},
  onRemove = () => {},
}: ShoppingCartProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[400px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#ede8e0]">
          <div className="flex items-center gap-3">
            <span
              className="text-[#1a1410] text-[18px]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              Your Cart
            </span>
            {totalItems > 0 && (
              <span className="bg-[#B8922A] text-white text-[9px] font-semibold px-2 py-[3px] rounded-full tracking-wide">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#9a8c78] hover:text-[#1a1410] hover:bg-[#f5f0e8] rounded-sm transition-colors"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        <MotifDivider />

        {/* Free Shipping Bar */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#faf8f4] border-b border-[#ede8e0]">
            {remainingForFreeShipping > 0 ? (
              <>
                <p className="text-[10px] text-[#7a6a4a] tracking-[0.06em] mb-2">
                  Add{" "}
                  <span className="font-semibold text-[#B8922A]">
                    ₹{remainingForFreeShipping.toLocaleString("en-IN")}
                  </span>{" "}
                  more for free shipping
                </p>
                <div className="h-[3px] bg-[#ede8e0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B8922A] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-[10px] text-[#B8922A] tracking-[0.06em] font-medium">
                ✦ You've unlocked free shipping!
              </p>
            )}
          </div>
        )}

        {/* Cart Items / Empty State */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyCart onClose={onClose} />
          ) : (
            <div className="px-6 divide-y divide-[#f0ebe3]">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer — only when items exist */}
        {items.length > 0 && (
          <div className="border-t border-[#ede8e0] px-6 py-5 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#7a6a4a] text-[11px] tracking-[0.06em]">Subtotal</span>
              <span
                className="text-[#1a1410] text-[16px]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
              >
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[#b0a090] text-[9px] tracking-[0.08em] mb-5">
              Taxes & shipping calculated at checkout
            </p>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#1a1410] text-white text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-[#B8922A] transition-colors duration-200"
            >
              Proceed to Checkout
              <ArrowRight size={13} />
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              className="w-full mt-3 text-[10px] text-[#9a8c78] tracking-[0.1em] uppercase hover:text-[#1a1410] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}