"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (email === "admin@mithila.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Galat email ya password");
    }
  }

  return (
    <div className="max-w-sm mx-auto pt-16">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">🎨</div>
        <h1 className="text-xl font-medium text-gray-900">Admin Login</h1>
        <p className="text-sm text-gray-500 mt-1">Mithila Store Dashboard</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@mithila.com"
            className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        {error && <p className="text-xs text-red-600">✕ {error}</p>}
        <button
          onClick={handleLogin}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Login karo
        </button>
        <p className="text-xs text-center text-gray-400">
          Hint: admin@mithila.com / admin123
        </p>
      </div>
    </div>
  );
}
