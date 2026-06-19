"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoaderProps {
  fullPage?: boolean;
  text?: string;
}

export default function Loader({
  fullPage = true,
  text = "Mithila Kriti load ho rahi hai...",
}: LoaderProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={
        fullPage
          ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          : "flex flex-col items-center justify-center py-16"
      }
      role="status"
      aria-label="Loading"
    >
      {/* Spinner + Logo circle combined */}
      <div className="relative flex items-center justify-center mb-8" style={{ width: 120, height: 120 }}>

        {/* Outer spinning ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-red-100 border-t-red-700 animate-spin"
          style={{ animationDuration: "1s" }}
        />

        {/* Middle counter-spin ring */}
        <div
          className="absolute rounded-full border-4 border-amber-100 border-b-amber-500 animate-spin"
          style={{ inset: 8, animationDuration: "1.5s", animationDirection: "reverse" }}
        />

        {/* Inner white circle — logo background */}
        <div className="absolute rounded-full bg-white flex items-center justify-center" style={{ inset: 18 }}>
          <Image
            src="/logo.png"
            alt="Mithila Kriti"
            width={68}
            height={68}
            priority
            className="object-contain rounded-full"
          />
        </div>
      </div>

      {/* Loading text with animated dots */}
      <p className="text-red-400 text-sm">
        {text.replace(/\.+$/, "")}
        {".".repeat(dots)}
      </p>

      {/* Mithila-style decorative dots row */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-red-700 inline-block"
            style={{
              animation: "mithilaPulse 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.18}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes mithilaPulse {
          0%, 100% { transform: scale(0.7); opacity: 0.3; }
          50%       { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}