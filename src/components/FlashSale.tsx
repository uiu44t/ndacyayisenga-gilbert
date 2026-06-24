import { useState, useEffect } from 'react';
import { Timer, Sparkles, Percent, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface FlashSaleProps {
  onProductClick: (product: Product) => void;
  products: Product[];
  lang: 'en' | 'rw' | 'fr';
}

const SALE_LABELS = {
  en: {
    title: "LIVE FLASH PORTFOLIO",
    subtitle: "High-yield acquisitions at temporary factory liquidation discounts.",
    hours: "hrs",
    minutes: "mins",
    seconds: "secs",
    claim: "Claim Offer"
  },
  rw: {
    title: "KUGABANUKA KUGUFURIKA",
    subtitle: "Ibikoresho bidasanzwe ku giciro cyagabanutse cyane cyane.",
    hours: "amasaha",
    minutes: "iminota",
    seconds: "amasegonda",
    claim: "Gura ubu"
  },
  fr: {
    title: "VENTE FLASH DIRECTE",
    subtitle: "Acquisitions de prestige à des prix de liquidation d'usine temporaires.",
    hours: "h",
    minutes: "m",
    seconds: "s",
    claim: "Saisir l'Offre"
  }
};

export default function FlashSale({ onProductClick, products, lang }: FlashSaleProps) {
  const t = SALE_LABELS[lang];

  // 12-hour ticking countdown state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter 3 premium products for flash sale
  const flashProducts = products.filter(p => p.price > 100).slice(1, 4);

  return (
    <div className="bg-slate-950 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
      
      {/* Background neon accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      {/* Header section with countdown timer */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5" />
              15% OFF LIQUIDATION
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{t.title}</h3>
          <p className="text-xs text-slate-400 font-light">{t.subtitle}</p>
        </div>

        {/* Dynamic ticking UI block */}
        <div className="flex items-center gap-2.5 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 shrink-0 font-mono">
          <Timer className="w-4 h-4 text-amber-500 ml-1.5" />
          
          <div className="flex gap-1.5 text-center text-xs text-slate-500">
            <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-850/80">
              <span className="block text-sm font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="text-[8px] uppercase tracking-wider">{t.hours}</span>
            </div>
            <span className="self-center font-bold text-amber-500 animate-pulse">:</span>
            <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-850/80">
              <span className="block text-sm font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="text-[8px] uppercase tracking-wider">{t.minutes}</span>
            </div>
            <span className="self-center font-bold text-amber-500 animate-pulse">:</span>
            <div className="bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-850/80">
              <span className="block text-sm font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="text-[8px] uppercase tracking-wider">{t.seconds}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sale products layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {flashProducts.map((p) => {
          const discountPrice = Math.round(p.price * 0.85);
          return (
            <div
              key={p.id}
              onClick={() => onProductClick(p)}
              className="group p-4 bg-slate-900/50 border border-slate-850 hover:border-amber-500/30 rounded-2xl flex flex-col justify-between transition-all cursor-pointer relative"
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl bg-slate-950 overflow-hidden border border-slate-800">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={p.name} />
                  <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white font-mono font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Save 15%
                  </span>
                </div>

                <div className="text-xs">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase">{p.brand}</span>
                  <span className="block font-bold text-white text-sm truncate group-hover:text-amber-400 transition-colors mt-0.5">{p.name}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-850/60 flex items-center justify-between">
                <div className="font-mono">
                  <span className="block text-[9px] text-slate-500 line-through">${p.price.toLocaleString()}</span>
                  <span className="block text-sm font-bold text-amber-400">${discountPrice.toLocaleString()}</span>
                </div>
                
                <span className="flex items-center gap-1 text-[10px] text-amber-400 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{t.claim}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
