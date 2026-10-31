'use client';

export default function MarqueeStrip() {
  const items = ['LUXURY JEWELRY', 'XUPING', 'STAINLESS STEEL', 'CUSTOMISED JEWELRY', 'HANDCRAFTED', 'TIMELESS ELEGANCE'];
  
  return (
    <div className="bg-gold py-3 overflow-hidden border-y border-gold/50">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="mx-8 font-cinzel text-xs tracking-widest text-buttonText">
            {item} •
          </span>
        ))}
      </div>
      <style jsx>{
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      }</style>
    </div>
  );
}
