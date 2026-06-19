import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Banarasi Silk Saree — Pure Zari Weave",
    meta: "Handwoven · Pure Silk · Zari Work",
    emoji: "🧣",
    price: 1299,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 312,
    stock: 4,
    tags: ["Handwoven", "Pure Silk", "Zari Work", "Wedding", "Gift Box"],
    colors: ["#C0392B", "#1A5276", "#27AE60", "#F39C12", "#6C3483"],
    sizes: ["5m", "5.5m", "6m"],
  },
  {
    id: 2,
    name: "Mithila Painting Print — A3",
    meta: "Handmade · Madhubani Art · Framed",
    emoji: "🖼️",
    price: 849,
    originalPrice: 1299,
    rating: 4.6,
    reviews: 178,
    stock: 12,
    tags: ["Madhubani", "Handmade", "Wall Art", "Gift"],
    colors: ["#F39C12", "#C0392B", "#27AE60"],
    sizes: ["A4", "A3", "A2"],
  },
  {
    id: 3,
    name: "Handmade Madhubani Bag",
    meta: "Handcrafted · Canvas · Tote Style",
    emoji: "👜",
    price: 499,
    originalPrice: 799,
    rating: 4.7,
    reviews: 94,
    stock: 8,
    tags: ["Handmade", "Canvas", "Tote", "Eco-Friendly"],
    colors: ["#1A5276", "#C0392B", "#27AE60"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    name: "Terracotta Jewellery Set",
    meta: "Handcrafted · Clay · Necklace + Earrings",
    emoji: "💍",
    price: 349,
    originalPrice: 599,
    rating: 4.5,
    reviews: 203,
    stock: 15,
    tags: ["Terracotta", "Handcrafted", "Clay", "Jewellery"],
    colors: ["#CD6155", "#D4AC0D", "#1A5276"],
    sizes: ["One Size"],
  },
  {
    id: 5,
    name: "Bamboo Craft Lamp",
    meta: "Eco-Friendly · Bamboo · Table Lamp",
    emoji: "🏮",
    price: 699,
    originalPrice: 1099,
    rating: 4.4,
    reviews: 67,
    stock: 6,
    tags: ["Bamboo", "Eco-Friendly", "Lamp", "Home Decor"],
    colors: ["#D4AC0D", "#6E2F1A"],
    sizes: ["Small", "Large"],
  },
  {
    id: 6,
    name: "Madhubani Print Cushion Cover",
    meta: "Cotton · Hand-painted · 16×16 inch",
    emoji: "🛋️",
    price: 299,
    originalPrice: 499,
    rating: 4.3,
    reviews: 145,
    stock: 20,
    tags: ["Cotton", "Hand-painted", "Home Decor", "Cushion"],
    colors: ["#C0392B", "#F39C12", "#1A5276"],
    sizes: ["16×16", "18×18"],
  },
];

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function fmt(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function discountPercent(price: number, original: number): number {
  return Math.round(((original - price) / original) * 100);
}
