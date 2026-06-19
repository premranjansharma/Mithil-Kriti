"use client";

import Link from "next/link";

const MENU = [
  { icon: "📦", label: "Mere Orders", href: "#", desc: "Track aur manage karo" },
  { icon: "🤍", label: "Wishlist", href: "/wishlist", desc: "Saved products" },
  { icon: "📍", label: "Delivery Address", href: "#", desc: "Address manage karo" },
  { icon: "💳", label: "Payment Methods", href: "#", desc: "Cards aur UPI" },
  { icon: "🎁", label: "Coupons", href: "#", desc: "Available offers" },
  { icon: "⚙️", label: "Settings", href: "#", desc: "Account settings" },
];

export default function AccountPage() {
  return (
    <div className="max-w-md mx-auto">
      {/* Profile */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-2xl">
          👤
        </div>
        <div>
          <p className="font-medium text-gray-900">Kriti Devi</p>
          <p className="text-sm text-gray-500">kriti@mithila.com</p>
          <span className="inline-block mt-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium">Premium Member</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{ n: "12", l: "Orders" }, { n: "3", l: "Wishlist" }, { n: "₹200", l: "Savings" }].map((s) => (
          <div key={s.l} className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-lg font-medium text-gray-900">{s.n}</p>
            <p className="text-xs text-gray-500">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {MENU.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${i < MENU.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
            <span className="text-gray-300 text-sm">›</span>
          </Link>
        ))}
      </div>

      <button className="w-full mt-4 py-3 border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors">
        Logout
      </button>
    </div>
  );
}