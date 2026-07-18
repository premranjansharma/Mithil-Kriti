// components/SearchBar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type SearchBarProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void; // e.g. close mobile drawer after search
};

export default function SearchBar({ variant = "desktop", onNavigate }: SearchBarProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Debounced suggestions fetch ──
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search-suggestions?q=${encodeURIComponent(query.trim())}`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions ?? []);
        }
      } catch (err) {
        console.error("Failed to fetch search suggestions:", err);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const goToSearch = (term: string) => {
    router.push(`/shop?search=${encodeURIComponent(term)}`);
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    onNavigate?.();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) goToSearch(query.trim());
  };

  const isMobile = variant === "mobile";

  return (
    <div className={`relative ${isMobile ? "w-full" : "hidden md:block"}`}>
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 border border-[#2a2a2a] rounded-sm px-3 hover:border-[#B8922A] transition-colors duration-200 ${
          isMobile ? "py-2" : "py-[7px]"
        }`}
      >
        <button type="submit" aria-label="Search">
          <Search size={14} className="text-[#5a5040]" aria-hidden="true" />
        </button>
        <input
          type="text"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className={`bg-transparent outline-none text-[11px] text-[#9a9080] placeholder-[#4a4030] tracking-[0.06em] font-sans ${
            isMobile ? "w-full" : "w-32"
          }`}
          aria-label="Search products"
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          className={`absolute top-full mt-1 left-0 bg-[#141414] border border-[#2a2a2a] rounded-sm shadow-lg z-50 overflow-hidden ${
            isMobile ? "w-full" : "w-64"
          }`}
          role="listbox"
        >
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onMouseDown={() => goToSearch(s)}
                className="w-full text-left px-3 py-2 text-[11px] text-[#9a9080] hover:bg-[#1a1a1a] hover:text-[#E8D5A0] transition-colors duration-150"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
