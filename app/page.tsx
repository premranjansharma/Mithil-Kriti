'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';

import { fmt } from '@/lib/data';
import type { IProduct } from '@/lib/types';

export default function HomePage() {
  const [featured, setFeatured] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  function markImgError(productId: string) {
    setImgErrors((prev) => ({ ...prev, [productId]: true }));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadFeatured() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/products?limit=3', {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Failed to load products (${res.status})`);
        }
        const json = await res.json();
        setFeatured(json.data ?? []);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load featured products. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadFeatured();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Hero />

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            View All →
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-xl p-4 animate-pulse">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
                <div className="h-4 bg-gray-100 rounded mb-2 w-3/4" />
                <div className="h-3 bg-gray-100 rounded mb-3 w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-12 text-gray-500">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && featured.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No featured products available right now.</p>
          </div>
        )}

        {!isLoading && !error && featured.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => {
              const price = (product.variants[0]?.price_in_cents ?? 0) / 100;
              return (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="border rounded-xl p-4 hover:shadow-lg transition"
                >
                  <div className="relative aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                    {product.images[0] && !imgErrors[product._id] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        onError={() => markImgError(product._id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        🧶
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 capitalize">{product.category}</p>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">{fmt(price)}</span>
                    {product.is_new && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
