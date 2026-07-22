// components/ui/ProductImage.tsx
"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

type ProductImageProps = Omit<ImageProps, "src" | "onError"> & {
  src?: string;
  fallbackSrc?: string;
};

export default function ProductImage({
  src,
  fallbackSrc = "/placeholder-product.png",
  alt,
  ...rest
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = !src || hasError ? fallbackSrc : src;

  return (
    <Image
      {...rest}
      src={resolvedSrc}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}
