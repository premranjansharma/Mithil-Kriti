'use client';

import { useState } from 'react';
import type { Product, CartItem, User } from "@/lib/types"; // Using your existing types!

/**
 * Address type (same as in your code)
 */
interface Address {
  id: string;
  label: string;
  name: string;
  line: string;
  city: string;
  pin: string;
  phone: string;
}

/**
 * Payment method type
 */
type PaymentMethod = 'upi' | 'card' | 'cod';

/**
 * Order summary calculation
 */
interface OrderSummary {
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  itemCount: number;
}

/**
 * Utility function for currency formatting
 */
function fmt(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

/**
 * Mock data - In a real app, this would come from:
 * - CartContext or Redux for cart items
 * - API call for addresses
 * - Props or URL params for order data
 */
const MOCK_CART_ITEMS: CartItem[] = [
  {
    product: {
      id: 1,
      name: 'Silk Saree — Banarasi',
      meta: 'Rang: Laal · Size: Free',
      emoji: '🧣',
      price: 1299,
      originalPrice: 1999,
      rating: 4.8,
      reviews: 156,
      stock: 5,
      tags: ['saree', 'silk', 'banarasi'],
      colors: ['Laal', 'Nila', 'Hara'],
      sizes: ['Free'],
    },
    qty: 1,
    selectedColor: 'Laal',
    selectedSize: 'Free',
  },
  {
    product: {
      id: 2,
      name: 'Mithila Painting Print',
      meta: 'Size: A3 · Frame: Wooden',
      emoji: '🖼️',
      price: 849,
      originalPrice: 1299,
      rating: 4.9,
      reviews: 89,
      stock: 10,
      tags: ['art', 'mithila', 'print'],
      colors: [],
      sizes: ['A3', 'A4'],
    },
    qty: 2,
    selectedColor: '',
    selectedSize: 'A3',
  },
  {
    product: {
      id: 3,
      name: 'Handmade Madhubani Bag',
      meta: 'Rang: Neela · Type: Tote',
      emoji: '👜',
      price: 499,
      originalPrice: 799,
      rating: 4.6,
      reviews: 234,
      stock: 8,
      tags: ['bag', 'madhubani', 'handmade'],
      colors: ['Neela', 'Kala', 'Peela'],
      sizes: ['Tote', 'Sling'],
    },
    qty: 1,
    selectedColor: 'Neela',
    selectedSize: 'Tote',
  },
];

const MOCK_ADDRESSES: Address[] = [
  {
    id: 'home',
    label: 'Ghar',
    name: 'Aditi Sharma',
    line: 'B-12, Patliputra Colony, Near SBI Bank',
    city: 'Patna, Bihar',
    pin: '800013',
    phone: '+91 98765 43210',
  },
  {
    id: 'work',
    label: 'Office',
    name: 'Aditi Sharma',
    line: '3rd Floor, Tech Park, Bailey Road',
    city: 'Patna, Bihar',
    pin: '800014',
    phone: '+91 98765 43210',
  },
];

const CONFIG = {
  couponCode: 'MITHILA50',
  couponDiscountPercent: 50,
  deliveryCharge: 49,
  estimatedDeliveryDays: { min: 4, max: 6 },
};

/**
 * Custom hook for calculating order summary
 */
function useOrderSummary(cartItems: CartItem[], discountPercent: number, deliveryCharge: number): OrderSummary {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal + deliveryCharge - discount;
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return {
    subtotal,
    delivery: deliveryCharge,
    discount,
    total,
    itemCount,
  };
}

/**
 * Success Screen Component
 */
interface SuccessScreenProps {
  address: Address;
}

function SuccessScreen({ address }: SuccessScreenProps) {
  const orderId = `ORD${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 font-sans">
      <div className="text-center py-16">
        {/* Success Icon */}
        <div className="text-5xl mb-4 animate-bounce">✅</div>

        {/* Message */}
        <p className="text-lg font-medium text-gray-900 mb-1">Order ho gaya confirm!</p>
        <p className="text-sm text-gray-500 mb-6">
          {address.name} ko {address.city} mein {CONFIG.estimatedDeliveryDays.min}–{CONFIG.estimatedDeliveryDays.max} din mein deliver hoga
        </p>

        {/* Order ID */}
        <div className="bg-gray-50 rounded-xl p-4 inline-block text-left">
          <p className="text-xs text-gray-500 mb-1">Order ID</p>
          <p className="text-sm font-mono font-medium text-gray-900">{orderId}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3 justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            🏠 Home jaao
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
            📱 Order track karo
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Address Selection Component
 */
interface AddressSectionProps {
  addresses: Address[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function AddressSection({ addresses, selectedId, onSelect }: AddressSectionProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
        📍 Delivery address
      </p>
      <div className="flex flex-col gap-2">
        {addresses.map((addr) => (
          <button
            key={addr.id}
            onClick={() => onSelect(addr.id)}
            className={`text-left rounded-xl p-4 border transition-colors flex items-start gap-3
              ${
                selectedId === addr.id
                  ? 'border-blue-400 bg-blue-50/50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            aria-pressed={selectedId === addr.id}
          >
            {/* Radio Button */}
            <div
              className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center
                ${selectedId === addr.id ? 'border-blue-500' : 'border-gray-300'}`}
            >
              {selectedId === addr.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
            </div>

            {/* Address Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-gray-900">{addr.name}</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {addr.label}
                </span>
              </div>
              <p className="text-xs text-gray-500">{addr.line}</p>
              <p className="text-xs text-gray-500">
                {addr.city} · {addr.pin}
              </p>
              <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
            </div>
          </button>
        ))}

        {/* Add New Address Button */}
        <button className="text-left rounded-xl p-4 border border-dashed border-gray-300 text-sm text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-2">
          <span className="text-base">+</span> Naya address jodo
        </button>
      </div>
    </div>
  );
}

/**
 * Payment Method Component
 */
interface PaymentSectionProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  label: string;
  sub: string;
  icon: string;
}> = [
  { id: 'upi', label: 'UPI', sub: 'Google Pay, PhonePe, Paytm', icon: '📱' },
  { id: 'card', label: 'Card', sub: 'Debit ya Credit card', icon: '💳' },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Delivery par cash dena', icon: '💵' },
];

function PaymentSection({ selectedMethod, onSelect }: PaymentSectionProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
        💳 Payment method
      </p>
      <div className="flex flex-col gap-2">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`text-left rounded-xl p-4 border transition-colors flex items-center gap-3
              ${
                selectedMethod === method.id
                  ? 'border-blue-400 bg-blue-50/50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            aria-pressed={selectedMethod === method.id}
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-lg shrink-0">
              {method.icon}
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{method.label}</p>
              <p className="text-xs text-gray-500">{method.sub}</p>
            </div>

            {/* Radio Button */}
            <div
              className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center
                ${selectedMethod === method.id ? 'border-blue-500' : 'border-gray-300'}`}
            >
              {selectedMethod === method.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Order Items Summary Component
 */
interface OrderItemsSectionProps {
  cartItems: CartItem[];
}

function OrderItemsSection({ cartItems }: OrderItemsSectionProps) {
  return (
    <div className="mb-6">
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
        🛍️ Order items ({cartItems.reduce((sum, item) => sum + item.qty, 0)})
      </p>
      <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
        {cartItems.map((item) => (
          <div key={item.product.id} className="p-3 flex items-center gap-3">
            {/* Product Icon */}
            <div className="w-11 h-11 rounded-lg bg-gray-50 flex items-center justify-center text-xl shrink-0">
              {item.product.emoji}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
              <p className="text-xs text-gray-400">
                Qty: {item.qty} · {item.selectedColor && `Rang: ${item.selectedColor}`}
              </p>
            </div>

            {/* Price */}
            <span className="text-sm font-medium text-gray-900 shrink-0">
              {fmt(item.product.price * item.qty)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Order Summary Component
 */
interface OrderSummaryProps {
  summary: OrderSummary;
  isProcessing: boolean;
  onPlaceOrder: () => void;
}

function OrderSummarySection({ summary, isProcessing, onPlaceOrder }: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-5">
      {/* Summary Lines */}
      <div className="flex justify-between text-sm text-gray-600 py-1.5">
        <span>Subtotal</span>
        <span>{fmt(summary.subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 py-1.5">
        <span>Delivery</span>
        <span>{fmt(summary.delivery)}</span>
      </div>
      <div className="flex justify-between text-sm py-1.5 text-green-700">
        <span className="flex items-center gap-2">
          Coupon discount
          <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            {CONFIG.couponCode}
          </span>
        </span>
        <span>−{fmt(summary.discount)}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between text-base font-medium text-gray-900 border-t border-gray-200 mt-2 pt-3">
        <span>Total</span>
        <span>{fmt(summary.total)}</span>
      </div>

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={isProcessing}
        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed
          text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        aria-busy={isProcessing}
      >
        {isProcessing ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Order ho raha hai...
          </>
        ) : (
          <>🔒 {fmt(summary.total)} ka order place karo</>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Order place karte hi aapko confirmation mil jaayega
      </p>
    </div>
  );
}

/**
 * Main Checkout Page Component
 */
export default function CheckoutPage() {
  // State
  const [selectedAddressId, setSelectedAddressId] = useState<string>('home');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isPlacing, setIsPlacing] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);

  // Calculate order summary
  const summary = useOrderSummary(
    MOCK_CART_ITEMS,
    CONFIG.couponDiscountPercent,
    CONFIG.deliveryCharge
  );

  // Get selected address
  const selectedAddress = MOCK_ADDRESSES.find((a) => a.id === selectedAddressId)!;

  // Handle order placement
 const handlePlaceOrder = async () => {
  try {
    setIsPlacing(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "test123",
        items: MOCK_CART_ITEMS,
        total: summary.total,
      }),
    });

    if (!res.ok) {
      throw new Error("Order save failed");
    }

    setIsPlaced(true);
  } catch (error) {
    console.error("Order Error:", error);
  } finally {
    setIsPlacing(false);
  }
};

  // Show success screen
  if (isPlaced) {
    return <SuccessScreen address={selectedAddress} />;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-xl font-medium text-gray-900">Checkout</h1>
        <span className="bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {summary.itemCount} items
        </span>
      </div>

      {/* Address Selection */}
      <AddressSection
        addresses={MOCK_ADDRESSES}
        selectedId={selectedAddressId}
        onSelect={setSelectedAddressId}
      />

      {/* Order Items */}
      <OrderItemsSection cartItems={MOCK_CART_ITEMS} />

      {/* Payment Method */}
      <PaymentSection selectedMethod={paymentMethod} onSelect={setPaymentMethod} />

      {/* Order Summary */}
      <OrderSummarySection summary={summary} isProcessing={isPlacing} onPlaceOrder={handlePlaceOrder} />
    </div>
  );
}