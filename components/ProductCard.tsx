'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Star } from 'lucide-react';

/**
 * ProductCard Props Interface
 * Self-contained type definitions (no external imports needed)
 */
interface ProductCardProps {
  /** Product image URL */
  image?: string;

  /** Product title/name */
  title?: string;

  /** Short product description */
  description?: string;

  /** Current selling price */
  price?: number;

  /** Original price (for showing discount) */
  originalPrice?: number;

  /** Star rating (0-5) */
  rating?: number;

  /** Number of customer reviews */
  reviewCount?: number;

  /** Whether product is in stock */
  inStock?: boolean;

  /** Callback when add to cart is clicked */
  onAddToCart?: () => void;

  /** Callback when wishlist heart is toggled */
  onToggleLike?: (liked: boolean) => void;
}

/**
 * ProductCard Component
 * Displays product information with image, price, rating, and actions
 * Uses Tailwind CSS for styling and responsive design
 */
export default function ProductCard({
  image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  title = 'Premium Wireless Headphones',
  description = 'High-quality sound with active noise cancellation',
  price = 129.99,
  originalPrice = 179.99,
  rating = 4.5,
  reviewCount = 328,
  inStock = true,
  onAddToCart = () => alert('Added to cart!'),
  onToggleLike = () => {},
}: ProductCardProps): React.ReactElement {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Calculate discount percentage once
  const discount = useMemo(
    () => (originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0),
    [price, originalPrice]
  );

  // Handle like/unlike with callback
  const handleLike = useCallback((): void => {
    setIsLiked((prev) => {
      const newState = !prev;
      onToggleLike(newState);
      return newState;
    });
  }, [onToggleLike]);

  // Render star rating component
  const StarRating = useMemo(
    () => (
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => {
            const fillPercentage = Math.min(Math.max(rating - i, 0), 1);
            const isFilled = fillPercentage === 1;
            const isPartial = fillPercentage > 0 && fillPercentage < 1;

            return (
              <div key={i} className="relative w-3.5 h-3.5">
                {/* Background star (empty) */}
                <Star size={14} className="text-gray-300 w-full h-full" />

                {/* Filled star (overlay) */}
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage * 100}%` }}
                >
                  <Star
                    size={14}
                    className="text-amber-400 fill-amber-400 w-3.5 h-3.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    ),
    [rating]
  );

  return (
    <div
      className="w-full max-w-xs bg-white border border-gray-200 rounded-xl overflow-hidden
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        {/* Product Image */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={false}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleLike}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm
            flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110
            transition-all duration-200 z-10 hover:bg-white group/btn"
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${
              isLiked
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 group-hover/btn:text-red-400'
            }`}
          />
        </button>

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
            <span className="text-white font-semibold text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="mb-3">{StarRating}</div>

        {/* Review Count */}
        <span className="text-xs text-gray-500 mb-3">
          {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
        </span>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-4 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-gray-900">₹{price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-medium text-green-600">
                Save ₹{(originalPrice - price).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          disabled={!inStock}
          aria-label={inStock ? 'Add to cart' : 'Out of stock'}
          className={`w-full py-2.5 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2
            transition-all duration-200 mt-auto
            ${
              inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-60'
            }`}
        >
          <ShoppingCart size={16} className="shrink-0" />
          <span>{inStock ? 'Add to Cart' : 'Unavailable'}</span>
        </button>
      </div>
    </div>
  );
}