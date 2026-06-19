import Link from 'next/link';
import Image from 'next/image';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Product {
  id: string;
  title: string;
  slug: string;
  price_in_cents: number;
  currency: string;
  category: string;
  images: string[];
  is_new?: boolean;
}

interface ApiResponse {
  data: Product[];
  total: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(cents: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

// ---------------------------------------------------------------------------
// Data fetching — Server Component (no 'use client' needed)
// ---------------------------------------------------------------------------

async function getNewArrivals(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products?sort=created_at&order=desc&limit=12&is_new=true`,
      {
        next: { revalidate: 60 }, // ISR — revalidate every 60 seconds
      }
    );

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const json: ApiResponse = await res.json();
    return json.data;
  } catch (error) {
    console.error('Failed to fetch new arrivals:', error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative aspect-3/4 bg-stone-100 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* New badge */}
        {product.is_new && (
          <span className="absolute top-3 left-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white shadow">
            New
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-4">
        <p className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-stone-800 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {product.title}
        </h3>
        <p className="mt-1 text-base font-bold text-stone-900">
          {formatCurrency(product.price_in_cents, product.currency)}
        </p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center text-stone-400">
      <svg className="h-16 w-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p className="text-lg font-medium">Abhi koi naye products nahi hain</p>
      <p className="text-sm mt-1">Jald hi naye arrivals aayenge — dobara check karein</p>
      <Link
        href="/collections"
        className="mt-6 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
      >
        Saari Collections Dekhein
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page — Server Component
// ---------------------------------------------------------------------------

export default async function NewArrivals() {
  const products = await getNewArrivals();

  return (
    <section className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 px-6 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium mb-3">
          Madhubani Paints
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
          New Arrivals
        </h1>
        <p className="mt-3 text-stone-400 text-sm max-w-md mx-auto">
          Taze haath se bane nayi collections — seedhe Mithila se
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-amber-500 text-lg select-none">
          {'🌿 ◆ ✦ ◆ 🌿'.split(' ').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Count */}
        {products.length > 0 && (
          <p className="text-sm text-stone-400 mb-6">
            {products.length} naye products
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* View all link */}
        {products.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/collections"
              className="inline-block rounded-full border-2 border-stone-800 px-8 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-800 hover:text-white transition-colors duration-200"
            >
              Saari Collections Dekhein →
            </Link>
          </div>
        )}
      </div>

      <div className="text-center pb-12 text-xs text-stone-400 tracking-wide">
        ✦ Handcrafted with love from Mithila ✦
      </div>
    </section>
  );
}