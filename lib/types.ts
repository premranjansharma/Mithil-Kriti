export interface Product {
  id: number;
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
