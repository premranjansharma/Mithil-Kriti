"use client";

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById, fmt, discountPercent } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productData = getProductById(Number(params.id));
  if (!productData) notFound();

  // notFound() throws, so productData is always defined below this line
  const product = productData!;

  const router = useRouter();
  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  const wished = isWished(product.id);
  const discount = discountPercent(product.price, product.originalPrice);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  function handleAddToCart() {
    addItem(product, qty, selectedColor, selectedSize);
    showToast("Cart mein add ho gaya!");
  }

  function handleBuyNow() {
    addItem(product, qty, selectedColor, selectedSize);
    router.push("/cart");
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-600">Products</Link>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <div className="aspect-square bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-8xl mb-3">
            {product.emoji}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`aspect-square bg-gray-50 rounded-lg border flex items-center justify-center text-2xl cursor-pointer transition-colors ${i === 0 ? "border-blue-400" : "border-gray-200 hover:border-gray-300"}`}>
                {product.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-medium tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            Mithila Handloom
          </span>
          <h1 className="text-xl font-medium text-gray-900 mt-3 mb-2 leading-snug">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500 text-sm">{"★".repeat(Math.round(product.rating))}</span>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-medium text-gray-900">{fmt(product.price)}</span>
            <span className="text-sm text-gray-400 line-through">{fmt(product.originalPrice)}</span>
            <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              {discount}% off
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-5">
            ya {fmt(Math.round(product.price / 3))}/month — 3 EMI, no cost
          </p>

          <hr className="border-gray-100 mb-4" />

          {/* Color */}
          <p className="text-xs font-medium text-gray-500 mb-2">Rang chuniye</p>
          <div className="flex gap-2 mb-4">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === c ? "border-gray-900 scale-110" : "border-transparent"}`}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>

          {/* Size */}
          <p className="text-xs font-medium text-gray-500 mb-2">
            Size: <span className="text-gray-900 font-medium">{selectedSize}</span>
          </p>
          <div className="flex gap-2 flex-wrap mb-5">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`min-w-11 h-9 px-3 rounded-lg text-sm font-medium border transition-all ${
                  selectedSize === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Qty */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <span className="text-sm font-medium px-4 border-x border-gray-200 leading-9">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
            {product.stock <= 5 && (
              <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                🔥 Sirf {product.stock} bacha hai!
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 h-11 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              🛒 Cart mein daalo
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 h-11 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              ⚡ Abhi kharido
            </button>
            <button
              onClick={() => { toggle(product); showToast(isWished(product.id) ? "Wishlist se hataya" : "Wishlist mein save!"); }}
              className={`w-11 h-11 border rounded-lg flex items-center justify-center transition-colors ${
                wished ? "border-pink-300 bg-pink-50 text-pink-600" : "border-gray-200 text-gray-400 hover:text-pink-500 hover:border-pink-300 hover:bg-pink-50"
              }`}
              aria-label="Wishlist"
            >
              {wished ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Delivery info */}
          <div className="space-y-2">
            <div className="flex gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
              <span>🚚</span>
              <span>Free delivery — 3–5 din mein. Cash on delivery available.</span>
            </div>
            <div className="flex gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
              <span>🔄</span>
              <span>7-din return policy. Koi sawaal nahi puchha jayega.</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}