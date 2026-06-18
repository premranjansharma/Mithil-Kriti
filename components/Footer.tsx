import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

// SVG icons for social media (lucide-react older versions don't export these)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <span
              className="text-2xl font-bold text-primary block mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Mithila Kriti
            </span>
            <p className="text-sm leading-relaxed">
              Celebrating the rich heritage of Mithila art through authentic handcrafted treasures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="font-semibold text-foreground block mb-4">Quick links</span>
            <nav className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-sm hover:text-primary transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <span className="font-semibold text-foreground block mb-4">Contact us</span>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>hello@mithilakriti.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+91 79031 74691</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Darbhanga, Bihar, India</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <span className="font-semibold text-foreground block mb-4">Follow us</span>
            <div className="flex gap-3">
              {[
                { href: "https://www.facebook.com/share/17NSBECtCC/", Icon: FacebookIcon, label: 'Facebook' },
                { href: "https://www.instagram.com/mithila_kriti?igsh=cHUwajcxb2RyaTF1", Icon: InstagramIcon, label: 'Instagram' },
                { href: 'https://twitter.com', Icon: TwitterIcon, label: 'Twitter' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
      
<div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
  <div className="flex flex-col sm:flex-row items-center gap-2">
    <p>© {currentYear} Mithila Kriti. All rights reserved.</p>

    <span className="hidden sm:inline">|</span>

    <p>
      Powered by{" "}
      <a
        href="https://xtyletechnology.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary hover:underline"
      >
        XTYLE TECHNOLOGY
      </a>
    </p>
  </div>

  <div className="flex gap-6">
    <Link
      href="/privacy"
      className="hover:text-primary transition-colors duration-200"
    >
      Privacy Policy
    </Link>

    <Link
      href="/terms"
      className="hover:text-primary transition-colors duration-200"
    >
      Terms of Service
    </Link>
  </div>
</div>
      </div>
    </footer>
  );
};

export default Footer;