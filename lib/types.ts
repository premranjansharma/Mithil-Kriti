export interface Product {
  id: string;
  name: string;
  meta: string;
  emoji: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  tags: string[];
  colors: string[];
  sizes: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
  selectedColor: string;
  selectedSize: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// MongoDB types
export interface IVariant {
  id: string;
  title: string;
  price_in_cents: number;
  inventory_quantity: number;
  sku?: string;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  variants: IVariant[];
  images: string[];
  currency: string;
  is_new: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  data: IProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
