'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { fmt } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import type { IProduct } from '@/lib/types';
import ProductImage from "@/components/ui/ProductImage";
const CATEGORIES = [
  'Sarees', 'Suit Sets', 'Tops', 'T-Shirts', "Men's Kurta",
  "Men's Shirts", 'Bedsheets', 'Wall Hangings', 'Madhubani Paintings',
  'Handcrafted Bags', 'Home Decor', 'Custom Orders',
];

const SORT_OPTIONS = [
  { label: 'Latest',            sort: 'created_at',                  order: 'desc' },
  { label: 'Price: Low to High', sort: 'variants.0.price_in_cents',  order: 'asc'  },
  { label: 'Price: High to Low', sort: 'variants.0.price_in_cents',  order: 'desc' },
];

type FetchState = 'idle' | 'loading' | 'success' | 'error';

interface Toast {
  id: number;
  message: string;
}

export default function ShopPage() {
  const [products, setProducts]           = useState<IProduct[]>([]);
  const [fetchState, setFetchState]       = useState<FetchState>('idle');
  const [errorMessage, setErrorMessage]   = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortIndex, setSortIndex]         = useState(0);
  const [toasts, setToasts]               = useState<Toast[]>([]);
  const { addItem }                       = useCart();

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async (signal: AbortSignal) => {
    setFetchState('loading');
    setErrorMessage('');

    try {
      const params = new URLSearchParams({ limit: '50' });

      if (activeCategory) {
        params.set('category', activeCategory.toLowerCase().replace(/\s+/g, '-'));
      }

      const { sort, order } = SORT_OPTIONS[sortIndex];
      params.set('sort', sort);
      params.set('order', order);

      const res = await fetch(`/api/products?${params}`, { signal });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      if (!Array.isArray(json.data)) {
        throw new Error('Unexpected response format from server.');
      }

      setProducts(json.data);
      setFetchState('success');
    } catch (err: unknown) {
      if ((err as { name?: string }).name === 'AbortError') return; // unmount — ignore

      const message =
        err instanceof TypeError && err.message === 'Failed to fetch'
          ? 'Network error. Please check your connection and try again.'
          : err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';

      setErrorMessage(message);
      setFetchState('error');
    }
  }, [activeCategory, sortIndex]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

  // ── Toast ─────────────────────────────────────────────────────────────────
  function showToast(message: string) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  const isLoading = fetchState === 'loading';
  const isError   = fetchState === 'error';
  const isEmpty   = fetchState === 'success' && products.length === 0;

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="mb-3 text-4xl font-bold">Mithila Kriti Shop</h1>
          <p className="max-w-2xl text-muted-foreground">
            Authentic Mithila art, handcrafted bags, traditional sarees, paintings, and cultural products —
            straight from the heart of Bihar.
          </p>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">Shop By Category</h2>
        <div className="flex flex-wrap gap-3">
          <CategoryButton
            label="All"
            active={activeCategory === ''}
            onClick={() => setActiveCategory('')}
          />
          {CATEGORIES.map((cat) => (
            <CategoryButton
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat === activeCategory ? '' : cat)}
            />
          ))}
        </div>
      </section>

      {/* ── Products ── */}
      <section className="container mx-auto px-4 py-10">

        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">
            {activeCategory || 'All Products'}
            {fetchState === 'success' && (
              <span className="ml-2 text-base font-normal text-gray-400">
                ({products.length})
              </span>
            )}
          </h2>
          <select
            value={sortIndex}
            onChange={(e) => setSortIndex(Number(e.target.value))}
            className="rounded-lg border px-3 py-2 text-sm bg-background"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o, i) => (
              <option key={i} value={i}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-card animate-pulse">
                <div className="h-64 bg-gray-100 rounded-t-xl" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-9 bg-gray-100 rounded-lg flex-1" />
                    <div className="h-9 bg-gray-100 rounded-lg flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <span className="text-5xl">⚠️</span>
            <p className="text-gray-600 max-w-sm">{errorMessage}</p>
            <button
              onClick={() => fetchProducts(new AbortController().signal)}
              className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <span className="text-5xl">🧶</span>
            <p className="text-gray-500">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('')}
              className="text-blue-600 text-sm hover:underline"
            >
              View all products →
            </button>
          </div>
        )}

        {/* Product grid */}
        {fetchState === 'success' && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const price = (product.variants[0]?.price_in_cents ?? 0) / 100;

              return (
                <article
                  key={product._id}
                  className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-lg"
                >
                  {/* Image */}


                  
<div className="relative h-64 overflow-hidden bg-gray-50">
  <ProductImage
    src={product.images[0]}
    alt={product.title}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    className="object-cover transition-transform duration-300 hover:scale-105"
  />
  {product.is_new && (
    <span className="absolute top-2 left-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
      New
    </span>
  )}
</div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-gray-400 capitalize mb-1 tracking-wide">
                      {product.category}
                    </p>
                    <h3 className="mb-2 text-sm font-semibold line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                    <p className="mb-4 text-xl font-bold text-primary">
                      {fmt(price)}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                      href={`/products/${product.slug}`}
                        className="flex-1 rounded-lg border px-4 py-2 text-center text-sm hover:bg-gray-50 transition font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => {
                          addItem(product as any, 1, '', product.variants[0]?.title ?? '');
                          showToast(`${product.title} added to cart`);
                        }}
                        className="flex-1 rounded-lg bg-primary px-4 py-2 text-primary-foreground text-sm hover:opacity-90 transition font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Toast stack ── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-full shadow-lg animate-fade-in-up"
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sub-component ──────────────────────────────────────────────────────────
function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'hover:bg-primary hover:text-primary-foreground'
      }`}
    >
      {label}
    </button>
  );
}
