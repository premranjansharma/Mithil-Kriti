"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingBag,
  User,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import SearchBar from "@/components/SearchBar";

type NavLink = { label: string; href: string };

// ─── Decorative Motif Border ──────────────────────────────────────────────────
function MotifBorder() {
  return (
    <div className="overflow-hidden h-2 bg-[#9a8282]">
      <svg
        viewBox="0 0 1100 8"
        preserveAspectRatio="none"
        className="w-full h-2"
        aria-hidden="true"
      >
        <defs>
          <pattern id="mk-motif" x="0" y="0" width="40" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="4" x2="40" y2="4" stroke="#2a2a2a" strokeWidth="0.5" />
            <rect x="17" y="2" width="6" height="4" fill="none" stroke="#B8922A" strokeWidth="0.5" opacity={0.6} />
            <rect x="19" y="3" width="2" height="2" fill="#B8922A" opacity={0.4} />
          </pattern>
        </defs>
        <rect width="1100" height="8" fill="url(#mk-motif)" />
      </svg>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems: cartCount } = useCart();

  const [navLinks, setNavLinks] = useState<NavLink[]>([]);

  // ── Fetch nav links on mount ──
  useEffect(() => {
    const controller = new AbortController();

    async function loadNavData() {
      try {
        const navRes = await fetch("/api/nav-links", { signal: controller.signal });
        if (navRes.ok) {
          const navData = await navRes.json();
          setNavLinks(navData.links ?? []);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Failed to load navbar data:", err);
        }
      }
    }

    loadNavData();
    return () => controller.abort();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D] font-sans">

      {/* Announcement Bar */}
      <div className="bg-[#B8922A] text-[#0D0D0D] text-center py-2 px-4 text-[10px] tracking-[0.18em] uppercase font-medium">
        Free shipping on orders above ₹1,499&nbsp;·&nbsp;New collection: Madhubani silk scarves
      </div>

      {/* Main Nav Row */}
      <div className="flex items-center justify-between px-6 lg:px-8 h-[76px] border-b border-[#2a2a2a] gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-w-0 group">
          <Image
            src="/logo.png"
            alt="Mithila Kriti Logo"
            width={40}
            height={40}
            style={{ width: 'auto', height: 'auto' }}
            className="object-contain"
          />
          <div className="flex flex-col gap-[2px]">
            <span
              className="text-[#E8D5A0] text-[11px] md:text-[10px] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              Mithila Kriti
            </span>
            <span className="text-[#7a6a4a] text-[4px] tracking-[0.22em] uppercase font-normal">
              Handpainted with love
            </span>
            <div className="h-px bg-[#B8922A] w-full mt-[3px]" />
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#9a9080] text-[11px] tracking-[0.15em] uppercase font-normal px-3 py-2 border-b border-transparent hover:text-[#E8D5A0] hover:border-[#B8922A] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">

          {/* Search — desktop only, handled by SearchBar component */}
          <SearchBar variant="desktop" />

          <div className="w-px h-5 bg-[#2a2a2a] mx-1 hidden md:block" aria-hidden="true" />

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="w-9 h-9 flex items-center justify-center rounded-sm text-[#7a6a4a] hover:text-[#E8D5A0] hover:bg-[#1a1a1a] transition-colors duration-200"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative w-9 h-9 flex items-center justify-center rounded-sm text-[#7a6a4a] hover:text-[#E8D5A0] hover:bg-[#1a1a1a] transition-colors duration-200"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#B8922A] text-[#0D0D0D] text-[8px] font-semibold rounded-full min-w-[14px] h-[14px] flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            href="/account"
            className="w-9 h-9 flex items-center justify-center rounded-sm text-[#7a6a4a] hover:text-[#E8D5A0] hover:bg-[#1a1a1a] transition-colors duration-200"
            aria-label="My account"
          >
            <User size={18} />
          </Link>

          {/* New In CTA — hidden on mobile */}
          <Link
            href="/new"
            className="hidden md:flex items-center gap-[6px] ml-1 px-4 py-2 border border-[#B8922A] rounded-sm text-[#B8922A] text-[10px] tracking-[0.16em] uppercase font-medium hover:bg-[#B8922A] hover:text-[#0D0D0D] transition-colors duration-200"
          >
            <Sparkles size={13} aria-hidden="true" />
            New In
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-sm text-[#7a6a4a] hover:text-[#E8D5A0] hover:bg-[#1a1a1a] transition-colors duration-200 ml-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden bg-[#0D0D0D] border-t border-[#2a2a2a] px-6 pb-6"
          aria-label="Mobile navigation"
        >
          {/* Mobile Search — handled by SearchBar component */}
          <div className="mt-4">
            <SearchBar variant="mobile" onNavigate={() => setMobileOpen(false)} />
          </div>

          {/* Mobile Nav Links */}
          <nav className="mt-4 flex flex-col gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#9a9080] text-[12px] tracking-[0.14em] uppercase py-3 border-b border-[#1e1e1e] hover:text-[#E8D5A0] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <Link
            href="/new"
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 border border-[#B8922A] rounded-sm text-[#B8922A] text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-[#B8922A] hover:text-[#0D0D0D] transition-colors duration-200"
          >
            <Sparkles size={13} aria-hidden="true" />
            New In
          </Link>
        </div>
      )}

      {/* Madhubani Motif Bottom Border */}
      <MotifBorder />
    </header>
  );
}
