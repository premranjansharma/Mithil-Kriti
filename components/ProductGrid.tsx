"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";

// Matches ProductCard's props exactly
interface Product {
  id: string | number;
  title?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  onAddToCart?: () => void;
  onToggleLike?: (liked: boolean) => void;
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  loading?: boolean;
  cols?: 2 | 3 | 4;
  emptyMessage?: string;
}

const FILTERS = ["Sab", "Paintings", "Home Decor", "Fabric", "Gifts"];

const CATEGORY_MAP: Record<string, string> = {
  Paintings: "painting",
  "Home Decor": "decor",
  Fabric: "fabric",
  Gifts: "gift",
};

export default function ProductGrid({
  products = [],
  title,
  subtitle,
  showFilters = true,
  loading = false,
  cols = 4,
  emptyMessage = "Koi product nahi mila",
}: ProductGridProps) {
  const [activeFilter, setActiveFilter] = useState("Sab");
  const [filtered, setFiltered] = useState<Product[]>(products);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    setIsFiltering(true);
    setTimeout(() => {
      setFiltered(
        filter === "Sab"
          ? products
          : products.filter((p) => p.category === CATEGORY_MAP[filter])
      );
      setIsFiltering(false);
    }, 500);
  };

  const colClass =
    cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : cols === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  return (
    <section className="w-full py-8 px-4">

      {/* Section heading */}
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl font-semibold text-red-900 tracking-wide mb-1">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-red-400">{subtitle}</p>
          )}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-px w-16 bg-red-200 block" />
            <span className="text-red-400 text-lg">🪷</span>
            <span className="h-px w-16 bg-red-200 block" />
          </div>
        </div>
      )}

      {/* Filter pills */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150
                ${
                  activeFilter === f
                    ? "bg-red-700 text-white border-red-700 shadow-sm"
                    : "bg-white text-red-700 border-red-200 hover:border-red-400"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Loading / empty / grid */}
      {loading || isFiltering ? (
        <Loader fullPage={false} text="Products load ho rahe hain" />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🎨</span>
          <p className="text-red-800 font-medium text-lg mb-1">{emptyMessage}</p>
          <p className="text-red-300 text-sm">Doosra filter try karein</p>
        </div>
      ) : (
        <div className={`grid ${colClass} gap-5`}>
          {filtered.map(({ id, ...rest }) => (
            <ProductCard key={id} {...rest} />
          ))}
        </div>
      )}

      {/* Count */}
      {!loading && !isFiltering && filtered.length > 0 && (
        <p className="text-center text-xs text-red-300 mt-6">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} mil{filtered.length !== 1 ? "e" : "a"}
        </p>
      )}
    </section>
  );
}