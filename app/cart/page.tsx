"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  meta: string;
  emoji: string;
  price: number;
  qty: number;
}

interface Coupon {
  type: "percent" | "flat";
  value: number;
  desc: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Silk Saree — Banarasi", meta: "Rang: Laal · Size: Free", emoji: "🧣", price: 1299, qty: 1 },
  { id: 2, name: "Mithila Painting Print", meta: "Size: A3 · Frame: Wooden", emoji: "🖼️", price: 849, qty: 2 },
  { id: 3, name: "Handmade Madhubani Bag", meta: "Rang: Neela · Type: Tote", emoji: "👜", price: 499, qty: 1 },
];

const COUPONS: Record<string, Coupon> = {
  SAVE20:    { type: "percent", value: 20,  desc: "20% discount mila!" },
  MITHILA50: { type: "percent", value: 50,  desc: "50% discount mila! 🎉" },
  FLAT100:   { type: "flat",    value: 100, desc: "₹100 off mila!" },
};

const DELIVERY_CHARGE = 49;

function fmt(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponStatus, setCouponStatus] = useState<"idle" | "success" | "error">("idle");
  const [couponMsg, setCouponMsg] = useState("");
  const router = useRouter();

  const subtotal = products.reduce((acc, p) => acc + p.price * p.qty, 0);

  const couponDiscount = (() => {
    if (!appliedCoupon) return 0;
    const c = COUPONS[appliedCoupon];
    if (c.type === "percent") return Math.round(subtotal * c.value / 100);
    return Math.min(c.value, subtotal);
  })();

  const total = subtotal + DELIVERY_CHARGE - couponDiscount;
  const totalItems = products.reduce((acc, p) => acc + p.qty, 0);

  function changeQty(id: number, delta: number) {
    setProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p)
    );
  }

  function removeItem(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponStatus("error");
      setCouponMsg("Pehle code likho");
      return;
    }
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponStatus("success");
      setCouponMsg(COUPONS[code].desc);
    } else {
      setAppliedCoupon(null);
      setCouponStatus("error");
      setCouponMsg("Galat code hai, dobara try karo");
    }
  }

  function tryCode(code: string) {
    setCouponInput(code);
    setCouponStatus("idle");
    setCouponMsg("");
    setAppliedCoupon(null);
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponStatus("idle");
    setCouponMsg("");
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 font-sans">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <h1 className="text-xl font-medium text-gray-900">Aapka Cart</h1>
        <span className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {totalItems} items
        </span>
      </div>

      {/* Product List */}
      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-base font-medium text-gray-600">Cart khali hai</p>
          <p className="text-sm mt-1">Kuch products add karo!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-start">
              <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-3xl shrink-0">
                {p.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-0.5">{p.name}</p>
                <p className="text-xs text-gray-500 mb-3">{p.meta}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => changeQty(p.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      aria-label="Kam karo"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium px-3 border-x border-gray-200">{p.qty}</span>
                    <button
                      onClick={() => changeQty(p.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      aria-label="Zyada karo"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{fmt(p.price * p.qty)}</span>
                </div>
              </div>
              <button
                onClick={() => removeItem(p.id)}
                className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1 rounded-lg transition-colors"
                aria-label="Hatao"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Coupon Section */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
          🏷️ Coupon code lagao
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
            placeholder="Jaise: SAVE20"
            maxLength={12}
            disabled={!!appliedCoupon}
            className={`flex-1 h-10 px-3 border rounded-lg text-sm font-mono tracking-widest outline-none transition-all
              ${couponStatus === "success" ? "border-green-400 bg-green-50 text-green-800" :
                couponStatus === "error"   ? "border-red-400 bg-red-50 text-red-800" :
                "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}
              disabled:opacity-60 disabled:cursor-not-allowed`}
          />
          {appliedCoupon ? (
            <button
              onClick={removeCoupon}
              className="px-4 h-10 border border-red-200 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
              Hatao
            </button>
          ) : (
            <button
              onClick={applyCoupon}
              className="px-4 h-10 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-white transition-colors"
            >
              Lagao
            </button>
          )}
        </div>

        {/* Coupon message */}
        {couponMsg && (
          <p className={`mt-2 text-xs flex items-center gap-1
            ${couponStatus === "success" ? "text-green-700" : "text-red-600"}`}>
            {couponStatus === "success" ? "✓" : "✕"} {couponMsg}
          </p>
        )}

        {/* Quick try chips */}
        {!appliedCoupon && (
          <div className="flex flex-wrap gap-2 mt-3 items-center">
            <span className="text-xs text-gray-400">Try karo:</span>
            {Object.keys(COUPONS).map((code) => (
              <button
                key={code}
                onClick={() => tryCode(code)}
                className="text-xs font-mono px-3 py-1 rounded-full border border-dashed border-gray-300 text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {products.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-5">
          <div className="flex justify-between text-sm text-gray-600 py-1.5">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 py-1.5">
            <span>Delivery</span>
            <span>{fmt(DELIVERY_CHARGE)}</span>
          </div>
          {appliedCoupon && couponDiscount > 0 && (
            <div className="flex justify-between text-sm py-1.5 text-green-700">
              <span className="flex items-center gap-2">
                Coupon discount
                <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  {appliedCoupon}
                </span>
              </span>
              <span>−{fmt(couponDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-medium text-gray-900 border-t border-gray-200 mt-2 pt-3">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>

          <Button
  size="lg"
  className="w-full mt-4"
  onClick={() => router.push("/checkout")}
>
  🔒 Checkout karo
</Button>

          {appliedCoupon && couponDiscount > 0 && (
            <div className="mt-3 text-center text-xs text-green-700 bg-green-50 rounded-full py-2">
              🎊 {fmt(couponDiscount)} ki bachat! Badiya kiya
            </div>
          )}
        </div>
      )}
    </div>
  );
}