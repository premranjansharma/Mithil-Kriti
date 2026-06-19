import { PRODUCTS } from "@/lib/data";
import Link from "next/link";

const STATS = [
  { label: "Total Products", value: "6", icon: "📦", color: "bg-blue-50 text-blue-700" },
  { label: "Orders Today", value: "24", icon: "🛒", color: "bg-green-50 text-green-700" },
  { label: "Revenue", value: "₹18,420", icon: "💰", color: "bg-amber-50 text-amber-700" },
  { label: "Customers", value: "142", icon: "👥", color: "bg-purple-50 text-purple-700" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Mithila Store — Overview</p>
        </div>
        <Link href="/admin/login" className="text-sm text-red-600 hover:underline">Logout</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className={`${s.color} rounded-xl p-4`}>
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-xl font-medium">{s.value}</p>
            <p className="text-xs opacity-75">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Products</h2>
          <button className="text-xs text-blue-600 font-medium hover:underline">+ Add Product</button>
        </div>
        <div className="divide-y divide-gray-100">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</p>
                <p className="text-xs text-gray-400">Stock: {p.stock} · ₹{p.price}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button className="px-2.5 py-1 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Edit</button>
                <button className="px-2.5 py-1 border border-red-200 rounded-lg text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
