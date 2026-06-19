'use client';

import Link from 'next/link';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CollectionLink {
  label: string;
  href: string;
  badge?: string;
}

interface CollectionGroup {
  id: string;
  title: string;
  emoji: string;
  accent: string; // tailwind bg color class for card accent
  links: CollectionLink[];
}

// ---------------------------------------------------------------------------
// Data — synced with categories[] from your constants file
// ---------------------------------------------------------------------------

// Matches your exported categories array (slug-compatible)
export const categories = [
  { name: 'Sarees', slug: 'sarees' },
  { name: 'Suit Sets', slug: 'suit-sets' },
  { name: 'Tops', slug: 'tops' },
  { name: 'T-Shirts', slug: 't-shirts' },
  { name: "Men's Kurta", slug: 'mens-kurta' },
  { name: "Men's Shirts", slug: 'mens-shirts' },
  { name: 'Bedsheets', slug: 'bedsheets' },
  { name: 'Wall Hangings', slug: 'wall-hangings' },
  { name: 'Madhubani Paintings', slug: 'madhubani-paintings' },
  { name: 'Handcrafted Bags', slug: 'handcrafted-bags' },
  { name: 'Home Decor', slug: 'home-decor' },
  { name: 'Custom Orders', slug: 'custom-orders' },
] as const;

export type CategorySlug = typeof categories[number]['slug'];

const COLLECTIONS: CollectionGroup[] = [
  {
    id: 'sarees',
    title: 'Sarees',
    emoji: '🪷',
    accent: 'bg-rose-700',
    links: [
      { label: 'All Sarees', href: '/collections/all-saree', badge: 'Popular' },
      { label: 'Chiffon Sarees', href: '/collections/chiffon-sarees' },
      { label: 'Chanderi Saree', href: '/collections/chanderi-saree' },
      { label: 'Cotton Saree', href: '/collections/cotton-saree' },
      { label: 'Tussar Silk Saree', href: '/collections/tussar-silk-saree' },
      { label: 'Saree Blouse Set', href: '/collections/saree-blouse-set' },
      { label: 'Tissue Linen', href: '/collections/tissue-linen' },
      { label: 'Mul Cotton', href: '/collections/mul-cotton' },
      { label: 'Linen Saree', href: '/collections/linen' },
      { label: 'Ready To Ship', href: '/collections/ready-to-ship', badge: 'Fast' },
    ],
  },
  {
    id: 'kurta-sets',
    title: 'Kurta Sets',
    emoji: '✂️',
    accent: 'bg-amber-700',
    links: [
      { label: 'Stitched Kurta', href: '/collections/kurtas' },
      { label: 'Unstitched Kurta', href: '/collections/unstitched-kurta' },
      { label: 'Cotton Kurta', href: '/collections/cotton-kurta' },
      { label: 'Silk Kurta', href: '/collections/silk-kurta' },
      { label: 'Bottom', href: '/collections/pants' },
      { label: 'Ready to Ship Unstitched', href: '/collections/ready-to-ship-unstitched-kurta', badge: 'Fast' },
    ],
  },
  {
    id: 'dupattas',
    title: 'Dupattas',
    emoji: '🌸',
    accent: 'bg-fuchsia-800',
    links: [
      { label: 'Silk Dupatta', href: '/collections/silk-dupatta' },
      { label: 'Cotton Dupatta', href: '/collections/cotton-dupatta' },
      { label: 'Stoles', href: '/collections/stoles' },
      { label: 'Ready to Ship Dupatta', href: '/collections/ready-to-ship-dupatta', badge: 'Fast' },
    ],
  },
  {
    id: 'blouses',
    title: 'Blouses',
    emoji: '🧵',
    accent: 'bg-red-800',
    links: [
      { label: 'All Blouses', href: '/collections/blouses' },
    ],
  },
  {
    id: 'lehnga',
    title: 'Lehnga',
    emoji: '👗',
    accent: 'bg-pink-800',
    links: [
      { label: 'All Lehngas', href: '/collections/lehnga' },
    ],
  },
  {
    id: 'men',
    title: "Men's Wear",
    emoji: '👔',
    accent: 'bg-stone-700',
    links: [
      { label: "Men's Tussar Silk Kurta", href: '/collections/mens-tussar-silk-kurta' },
      { label: "Men's Cotton Kurta", href: '/collections/mens-cotton-kurta' },
      { label: "All Kurta", href: '/collections/mens-kurta' },
      { label: "Men's Shirts", href: '/collections/mens-shirts' },
    ],
  },
  {
    id: 'home-decor',
    title: 'Home Decor',
    emoji: '🏮',
    accent: 'bg-orange-700',
    links: [
      { label: 'Cushion Cover', href: '/collections/cushion-cover' },
      { label: 'Wall Painting', href: '/collections/wall-painting' },
      { label: 'Bed Sheets', href: '/collections/bed-sheet' },
      { label: 'Bedsheets', href: '/collections/bedsheets' },
      { label: 'Wall Hangings', href: '/collections/wall-hangings' },
    ],
  },
  {
    id: 'art',
    title: 'Madhubani Paintings',
    emoji: '🎨',
    accent: 'bg-red-700',
    links: [
      { label: 'All Paintings', href: '/collections/madhubani-paintings', badge: 'Popular' },
    ],
  },
  {
    id: 'bags',
    title: 'Handcrafted Bags',
    emoji: '👜',
    accent: 'bg-teal-700',
    links: [
      { label: 'All Handcrafted Bags', href: '/collections/handcrafted-bags' },
      { label: 'Clutch', href: '/collections/clutch-1' },
      { label: 'Pouches', href: '/collections/pouches' },
    ],
  },
  {
    id: 'accessories',
    title: 'Accessories',
    emoji: '✨',
    accent: 'bg-amber-600',
    links: [
      { label: 'Diary', href: '/collections/diary' },
      { label: 'Rakhi', href: '/collections/rakhi' },
    ],
  },
  {
    id: 'custom-orders',
    title: 'Custom Orders',
    emoji: '🖌️',
    accent: 'bg-emerald-700',
    links: [
      { label: 'Place a Custom Order', href: '/collections/custom-orders', badge: 'New' },
    ],
  },
  {
    id: 'suit-sets',
    title: 'Suit Sets',
    emoji: '🪡',
    accent: 'bg-indigo-700',
    links: [
      { label: 'All Suit Sets', href: '/collections/suit-sets' },
    ],
  },
  {
    id: 'tops',
    title: 'Tops',
    emoji: '👚',
    accent: 'bg-violet-700',
    links: [
      { label: 'All Tops', href: '/collections/tops' },
    ],
  },
  {
    id: 't-shirts',
    title: 'T-Shirts',
    emoji: '👕',
    accent: 'bg-sky-700',
    links: [
      { label: 'All T-Shirts', href: '/collections/t-shirts' },
    ],
  },
  {
    id: 'collections',
    title: 'Special Collections',
    emoji: '✨',
    accent: 'bg-yellow-700',
    links: [
      { label: 'Bihari Bride', href: '/collections/mithila-bridal-saree', badge: 'Bridal' },
      { label: 'Chhath Puja', href: '/collections/chhath-puja' },
      { label: 'Durga', href: '/collections/durga-collection' },
      { label: 'Ram Sita', href: '/collections/ram-sita' },
      { label: 'Radha Krishna', href: '/collections/radha-krishna' },
      { label: 'Bandhini', href: '/collections/bandhani' },
      { label: 'Holi', href: '/collections/holi-collection' },
      { label: 'Wedding', href: '/collections/vivah', badge: 'Bridal' },
      { label: 'Office Wear', href: '/collections/office-wear' },
      { label: 'Nature', href: '/collections/nature' },
      { label: 'Ready to Ship', href: '/collections/ready-to-ship', badge: 'Fast' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BadgePill({ text }: { text: string }) {
  const colors: Record<string, string> = {
    Popular: 'bg-rose-100 text-rose-700',
    Fast: 'bg-green-100 text-green-700',
    Bridal: 'bg-fuchsia-100 text-fuchsia-700',
    New: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${colors[text] ?? 'bg-gray-100 text-gray-600'}`}>
      {text}
    </span>
  );
}

function CollectionCard({ group }: { group: CollectionGroup }) {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
      {/* Card header */}
      <div className={`${group.accent} px-5 py-4 flex items-center gap-3`}>
        <span className="text-2xl">{group.emoji}</span>
        <h2 className="text-lg font-serif font-semibold text-white tracking-wide">
          {group.title}
        </h2>
      </div>

      {/* Links */}
      <ul className="flex flex-col divide-y divide-stone-100 flex-1">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-between px-5 py-3 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-800 transition-colors group"
            >
              <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                {link.label}
              </span>
              <span className="flex items-center gap-1">
                {link.badge && <BadgePill text={link.badge} />}
                <svg className="h-3.5 w-3.5 text-stone-300 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero header */}
      <div className="bg-stone-900 px-6 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium mb-3">
          Madhubani Paints
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
          Our Collections
        </h1>
        <p className="mt-3 text-stone-400 text-sm max-w-md mx-auto">
          Handpainted with the art of Mithila — explore sarees, kurtas, dupattas and more
        </p>

        {/* Decorative Madhubani border motif */}
        <div className="mt-6 flex items-center justify-center gap-2 text-amber-500 text-lg select-none">
          {'🌿 ◆ ✦ ◆ 🌿'.split(' ').map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.map((group) => (
            <CollectionCard key={group.id} group={group} />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center pb-12 text-xs text-stone-400 tracking-wide">
        ✦ Handcrafted with love from Mithila ✦
      </div>
    </main>
  );
}