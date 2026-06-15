// components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-orange-400">
              Mithila Kriti
            </h2>

            <p className="mt-4 text-gray-400 text-sm leading-6">
              Authentic Mithila Art, Handmade Paintings, Traditional
              Crafts and Cultural Products from Bihar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-400">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>

            <ul className="space-y-2 text-gray-400">
              <li>Madhubani Paintings</li>
              <li>Wall Decor</li>
              <li>Handmade Gifts</li>
              <li>Traditional Art</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Darbhanga, Bihar, India</li>
              <li>info@mithilakriti.com</li>
              <li>+91 XXXXX XXXXX</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mithila Kriti. All Rights Reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0 text-gray-400 text-sm">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}