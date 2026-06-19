'use client';

import Link from 'next/link';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import NewArrivals from '@/components/home/NewArrivals';
import BestSellers from '@/components/home/BestSellers';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import { PRODUCTS, fmt, discountPercent } from '@/lib/data';




export default function HomePage() {
  const featured = PRODUCTS.slice(0, 3);

  return (
<> <Hero />
  <FeaturedProducts />

  <NewArrivals />

  <BestSellers />

  <section className="container mx-auto px-4 py-12">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold">
        Featured Products
      </h2>

      <Link
        href="/products"
        className="text-blue-600 hover:text-blue-700"
      >
        View All →
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="border rounded-xl p-4 hover:shadow-lg transition"
        >
          <div className="text-6xl text-center mb-4">
            {product.emoji}
          </div>

          <h3 className="font-semibold">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            {product.meta}
          </p>

          <div className="flex items-center gap-2">
            <span className="font-bold">
              {fmt(product.price)}
            </span>

            <span className="line-through text-gray-400 text-sm">
              {fmt(product.originalPrice)}
            </span>

            <span className="text-green-600 text-xs">
              {discountPercent(
                product.price,
                product.originalPrice
              )}
              % OFF
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>

  <Testimonials />

  <Newsletter />
</>


);
}
