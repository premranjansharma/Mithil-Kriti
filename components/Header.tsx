
"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ShieldAlert,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  quantity: number;
}

interface HeaderProps {
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ setIsCartOpen }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Demo data (replace with your hooks)
  const cartItems: CartItem[] = [];
  const isAuthenticated = false;

  const cartItemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Plans", path: "/plans" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string): boolean => pathname === path;

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(
        `/shop?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Mithila Kriti
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive(link.path)
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:block"
            >
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4" />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="w-64 rounded-lg border py-2 pl-10 pr-4 text-sm outline-none"
                />
              </div>
            </form>

            {/* User */}
            {isAuthenticated ? (
              <button className="rounded-full border p-2">
                <User className="h-5 w-5" />
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block text-sm font-medium"
              >
                Login
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />

              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t md:hidden"
          >
            <div className="space-y-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="block rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/admin/login"
                className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100"
              >
                <ShieldAlert className="h-4 w-4" />
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

