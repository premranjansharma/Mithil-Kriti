'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8922A" strokeWidth="2" strokeLinecap="round"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);


// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'What are your shipping options?',       a: 'We offer standard shipping (3–5 business days) and express shipping (1–2 business days) throughout India. Free shipping on orders above ₹1,499.' },
  { q: 'Do you ship internationally?',          a: 'Currently we ship within India only. International shipping is in the works — follow us for updates.' },
  { q: 'What is your return policy?',           a: 'Returns accepted within 7 days of delivery if the product is unused and in original packaging. Contact us to initiate.' },
  { q: 'How do I track my order?',              a: 'A tracking number is sent to your email once your order ships. You can also check order status in your account.' },
];



// ─── Sub-components ───────────────────────────────────────────────────────────
function GoldRule() {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#B8922A] opacity-20" />
      <div className="w-1 h-1 rounded-full bg-[#B8922A] opacity-50" />
      <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#B8922A] opacity-20" />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1e1e1e]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-transparent border-none py-4 flex justify-between items-center
                   text-[13px] font-medium text-[#c8bfa8] hover:text-[#E8D5A0] transition-colors duration-200"
      >
        {q}
        <IconChevron open={open} />
      </button>
      <div
        className="text-[12px] text-[#5a5040] leading-relaxed overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? 200 : 0, paddingBottom: open ? '1rem' : 0 }}
      >
        {a}
      </div>
    </div>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm]   = useState<FormState>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [toast, setToast] = useState(false);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert('Please fill in all required fields.');
      return;
    }
    setToast(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setToast(false), 3500);
  };

  const inputCls = `w-full px-3.5 py-2.5 bg-[#141414] border border-[#252525] rounded-sm
                    text-[13px] text-[#c8bfa8] placeholder-[#3a3428] outline-none
                    focus:border-[#B8922A] transition-colors duration-200`;
  const labelCls = `block text-[10px] font-medium text-[#4a4438] tracking-[0.15em] uppercase mb-1.5`;

  return (
    <main
      className="bg-[#f0eaea] text-[#0d0d08] min-h-screen"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="border border-[#1e1e1e] rounded-sm px-8 py-12 mb-8 relative overflow-hidden">
          {/* gold corner accents */}
          <span className="absolute top-0 left-0 w-12 h-px bg-[#B8922A] opacity-60" />
          <span className="absolute top-0 left-0 h-12 w-px bg-[#B8922A] opacity-60" />
          <span className="absolute bottom-0 right-0 w-12 h-px bg-[#B8922A] opacity-60" />
          <span className="absolute bottom-0 right-0 h-12 w-px bg-[#B8922A] opacity-60" />

          <p className="text-[#B8922A] text-[10px] tracking-[0.28em] uppercase font-semibold mb-4">
            Mithila Kriti — Get in Touch
          </p>
          <h1
            className="text-[#d3c08d] text-4xl md:text-5xl mb-4 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            Questions?<br />
            <span className="text-[#B8922A]">We're listening.</span>
          </h1>
          <p className="text-[#4a4438] text-[13px] leading-relaxed max-w-md">
            Reach out to our team for anything — orders, custom requests, artisan collaborations, or just to say hello.
          </p>
        </div>

        {/* ── Grid: Form + Info ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* FORM */}
          <div className="border border-[#1a1a1a] rounded-sm p-7">
            <h2
              className="text-[#E8D5A0] text-[17px] mb-6 pb-4 border-b border-[#1a1a1a]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
            >
              Send Us a Message
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={inputCls} placeholder="Your name" value={form.name} onChange={update('name')} />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input className={inputCls} type="email" placeholder="you@email.com" value={form.email} onChange={update('email')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>Phone</label>
                <input className={inputCls} type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={update('phone')} />
              </div>
              <div>
                <label className={labelCls}>Subject *</label>
                <select className={inputCls} value={form.subject} onChange={update('subject')} style={{ appearance: 'none' }}>
                  <option value="">Select subject</option>
                  <option>Order Inquiry</option>
                  <option>Shipping &amp; Delivery</option>
                  <option>Returns &amp; Refunds</option>
                  <option>Custom / Bulk Order</option>
                  <option>Artisan Collaboration</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className={labelCls}>Message *</label>
              <textarea className={`${inputCls} min-h-27.5 resize-y`} placeholder="Write your message…" value={form.message} onChange={update('message')} />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 border border-[#B8922A] text-[#B8922A] text-[11px] tracking-[0.18em]
                         uppercase font-semibold rounded-sm hover:bg-[#B8922A] hover:text-[#0C0C0C]
                         transition-colors duration-200"
            >
              Send Message →
            </button>
          </div>

          {/* INFO */}
          <div className="border border-[#1a1a1a] rounded-sm p-7">
            <h2
              className="text-[#E8D5A0] text-[17px] mb-6 pb-4 border-b border-[#1a1a1a]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
            >
              Contact Mithila Kriti
            </h2>

            {/* Address */}
            <div className="flex gap-3 items-start mb-5">
              <div className="w-8 h-8 rounded-sm bg-[#161206] border border-[#2a2010] flex items-center justify-center flex-shrink-0 text-[#B8922A]">
                <IconLocation />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#4a4438] font-medium mb-1">Office</p>
                <p className="text-[13px] text-[#7a7060] leading-relaxed">Darbhanga, Bihar 846004<br />India</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3 items-start mb-5">
              <div className="w-8 h-8 rounded-sm bg-[#161206] border border-[#2a2010] flex items-center justify-center flex-shrink-0 text-[#B8922A]">
                <IconMail />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#4a4438] font-medium mb-1">Email</p>
                <a href="mailto:hello@mithilakriti.com" className="text-[13px] text-[#B8922A] hover:text-[#E8D5A0] transition-colors block">hello@mithilakriti.com</a>
                <a href="mailto:orders@mithilakriti.com" className="text-[13px] text-[#B8922A] hover:text-[#E8D5A0] transition-colors block">orders@mithilakriti.com</a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3 items-start mb-6">
              <div className="w-8 h-8 rounded-sm bg-[#161206] border border-[#2a2010] flex items-center justify-center flex-shrink-0 text-[#B8922A]">
                <IconPhone />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#4a4438] font-medium mb-1">Phone</p>
                <a href="tel:+917739412888" className="text-[13px] text-[#B8922A] hover:text-[#E8D5A0] transition-colors block">+91 77394 12888</a>
                <a href="tel:+917739740853" className="text-[13px] text-[#B8922A] hover:text-[#E8D5A0] transition-colors block">+91 77397 40853</a>
              </div>
            </div>

            {/* Hours */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#4a4438] font-medium mb-3">Business Hours</p>
              {[['Monday – Friday', '9:00 AM – 6:00 PM'], ['Saturday', '10:00 AM – 4:00 PM'], ['Sunday', null]].map(([day, time]) => (
                <div key={day} className="flex justify-between text-[12px] py-1.5 border-b border-[#141414] last:border-0">
                  <span className="text-[#4a4438]">{day}</span>
                  {time ? <span className="text-[#c8bfa8] font-medium">{time}</span> : <span className="text-[#8B3A3A] font-medium">Closed</span>}
                </div>
              ))}
            </div>

          

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <div className="border border-[#1a1a1a] rounded-sm p-7 mb-6">
          <h2
            className="text-[#E8D5A0] text-[17px] mb-6 pb-4 border-b border-[#1a1a1a]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
          >
            Frequently Asked Questions
          </h2>
          {FAQS.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="border border-[#B8922A] rounded-sm px-8 py-8 flex flex-col sm:flex-row
                        items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-20 h-px bg-[#B8922A]" />
          <span className="absolute bottom-0 right-0 w-20 h-px bg-[#B8922A]" />
          <div>
            <h3
              className="text-[#E8D5A0] text-[22px] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
            >
              Ready to bring Mithila home?
            </h3>
            <p className="text-[#4a4438] text-[12px]">
              Explore our collection of handpainted art, silk, and handcrafted gifts.
            </p>
          </div>
          <Link
            href="/shop"
            className="flex-shrink-0 px-7 py-3 border border-[#B8922A] text-[#B8922A]
                       text-[10.5px] tracking-[0.18em] uppercase font-semibold rounded-sm
                       hover:bg-[#B8922A] hover:text-[#0C0C0C] transition-colors duration-200 whitespace-nowrap"
          >
            Shop Now →
          </Link>
        </div>
      </div>

      {/* ── Toast ────────────────────────────────────────────────────────── */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#B8922A]
           text-[#B8922A] px-6 py-3 rounded-sm text-[12px] font-medium tracking-wide
           transition-all duration-300 z-50 pointer-events-none whitespace-nowrap"
        style={{ transform: `translateX(-50%) translateY(${toast ? 0 : 80}px)`, opacity: toast ? 1 : 0 }}
      >
        ✓ Message sent! We'll get back to you soon.
      </div>
    </main>
  );
}
