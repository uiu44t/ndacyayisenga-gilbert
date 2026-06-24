import { useState, useEffect } from 'react';
import { Timer, Tag, Percent, Copy, Check, Gift, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface DealsHubProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isDarkMode: boolean;
}

interface Coupon {
  code: string;
  discount: string;
  description: string;
  minSpend: number;
}

export default function DealsHub({ products, onProductClick, onAddToCart, isDarkMode }: DealsHubProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter 4 products for deals/clearance
  const discountProducts = products.slice(0, 8).map((p, idx) => ({
    ...p,
    discountPercent: idx % 2 === 0 ? 15 : 25,
    isClearance: idx > 4,
  }));

  const coupons: Coupon[] = [
    { code: 'BRUCERII10', discount: '10% OFF', description: 'Applicable storewide on any electronics purchase.', minSpend: 100 },
    { code: 'MOMODEAL', discount: '15% OFF', description: 'Exclusive discount when settling via MTN/Airtel Mobile Money.', minSpend: 50 },
    { code: 'VIPAUTOPARTS', discount: '$200 OFF', description: 'Discount on certified spare parts or professional tuning.', minSpend: 1000 },
    { code: 'FREEINSTALL', discount: '100% FREE', description: 'Free computer/phone screen setup & diagnostics.', minSpend: 0 },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="deals-hub" className="py-12 space-y-10 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-1">
            <Percent className="w-3.5 h-3.5 text-secondary" />
            <span>Exclusive Promotional Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Today's Liquidations & Clearance Sale
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
            High-grade vehicle restomods and certified workspace electronics at direct factory-cleared rates.
          </p>
        </div>
      </div>

      {/* Coupon Codes Bento Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="p-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl relative overflow-hidden flex flex-col justify-between space-y-4"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-secondary flex items-center gap-1 font-mono uppercase">
                <Gift className="w-3.5 h-3.5" />
                {coupon.discount}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-1">
                {coupon.description}
              </p>
              {coupon.minSpend > 0 && (
                <span className="block text-[10px] text-slate-400 font-mono">
                  Min spend: ${coupon.minSpend}
                </span>
              )}
            </div>

            <button
              onClick={() => handleCopy(coupon.code)}
              className="w-full py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono font-bold cursor-pointer transition-all"
            >
              {copiedCode === coupon.code ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>{coupon.code}</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Grid of Deal Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {discountProducts.map((p) => {
          const discountAmt = Math.round(p.price * (p.discountPercent / 100));
          const promoPrice = p.price - discountAmt;
          return (
            <div
              key={p.id}
              className="group flex flex-col justify-between bg-slate-50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/80 border border-slate-200 dark:border-slate-850 hover:border-primary/30 rounded-2xl p-4 transition-all duration-300 shadow-sm relative"
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img
                    src={p.image}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={p.name}
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                    <span className="bg-rose-500 text-white font-mono font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      {p.discountPercent}% OFF
                    </span>
                    {p.isClearance && (
                      <span className="bg-secondary text-slate-950 font-mono font-bold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                        CLEARANCE
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <span className="block text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">{p.brand}</span>
                  <button
                    onClick={() => onProductClick(p)}
                    className="block font-bold text-slate-950 dark:text-white text-sm text-left truncate group-hover:text-primary transition-colors cursor-pointer w-full"
                  >
                    {p.name}
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-150 dark:border-slate-850/60 flex items-center justify-between">
                <div className="font-mono text-left">
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 line-through">${p.price.toLocaleString()}</span>
                  <span className="block text-sm font-bold text-rose-500">${promoPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => onAddToCart({ ...p, price: promoPrice })}
                  className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-xl cursor-pointer shadow-md shadow-primary/10 transition-all"
                >
                  Acquire Offer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
