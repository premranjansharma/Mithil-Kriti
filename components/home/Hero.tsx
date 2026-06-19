'use client';

import { useEffect, useState } from 'react';

const images = [
'/hero1.jpg',
'/hero2.jpg',
'/hero3.jpg',
];

export default function Hero() {
const [current, setCurrent] = useState(0);

useEffect(() => {
const timer = setInterval(() => {
setCurrent((prev) => (prev + 1) % images.length);
}, 4000);


return () => clearInterval(timer);


}, []);

return ( <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
{/* Background Images */}
{images.map((img, index) => (
<div
key={img}
className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            current === index ? 'opacity-100' : 'opacity-0'
          }`}
style={{ backgroundImage: `url(${img})` }}
/>
))}


  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Content */}
  <div className="relative z-10 text-center max-w-3xl px-4 text-white">
    <h1 className="text-5xl md:text-7xl font-bold mb-6">
      Mithila Kriti
    </h1>

    <p className="text-lg md:text-xl mb-8">
      Authentic Mithila Art, Handcrafted Products & Cultural Heritage
    </p>

    <button className="px-8 py-3 bg-yellow-600 rounded-lg hover:bg-yellow-700">
      Shop Now
    </button>
  </div>
</section>


);
}
