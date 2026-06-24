import React, { useState } from 'react';
import { Sparkles, Share2, CreditCard, Bell, Scale, Gift, Trash2, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface SpecialFeaturesProps {
  products: Product[];
  isDarkMode: boolean;
}

export default function SpecialFeatures({ products, isDarkMode }: SpecialFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'rewards' | 'compare' | 'alerts'>('rewards');

  // Rewards States
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState('');
  const [giftCardValue, setGiftCardValue] = useState<number | null>(null);
  const [giftCardError, setGiftCardError] = useState('');

  // Compare States
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [selectedProductToCompare, setSelectedProductToCompare] = useState<string>('');

  // Alerts States
  const [alertProduct, setAlertProduct] = useState<string>('');
  const [alertPrice, setAlertPrice] = useState<number>(100);
  const [alerts, setAlerts] = useState<{ id: string; productName: string; targetPrice: number }[]>([
    { id: '1', productName: 'Rii Carbon Stealth-1000', targetPrice: 22000 },
    { id: '2', productName: 'Rii Veloce GT EV', targetPrice: 135000 },
  ]);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('BR-GILBERT-795');
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleRedeemGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = giftCardCode.trim().toUpperCase();
    if (clean === 'BR-GIFT-50') {
      setGiftCardValue(50);
      setGiftCardError('');
    } else if (clean === 'BR-GIFT-100') {
      setGiftCardValue(100);
      setGiftCardError('');
    } else {
      setGiftCardError('Invalid voucher certificate. Please verify your coordinate serial.');
      setGiftCardValue(null);
    }
  };

  const handleAddToCompare = () => {
    if (!selectedProductToCompare) return;
    if (compareList.length >= 3) {
      alert('You can compare a maximum of 3 products side-by-side.');
      return;
    }
    const found = products.find(p => p.id === selectedProductToCompare);
    if (found && !compareList.some(item => item.id === found.id)) {
      setCompareList([...compareList, found]);
    }
    setSelectedProductToCompare('');
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertProduct) return;
    const found = products.find(p => p.id === alertProduct);
    if (found) {
      setAlerts([
        ...alerts,
        {
          id: 'alert-' + Date.now(),
          productName: found.name,
          targetPrice: alertPrice,
        }
      ]);
      setAlertProduct('');
    }
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <section id="special-features" className="py-12 space-y-10 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Special Operations Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Client Perks, Comparison & Price Alerts
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
            Claim gift codes, compare vehicle specifications, and log price alerts on wishlist items.
          </p>
        </div>

        {/* Toggles */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 self-start md:self-auto shrink-0 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'rewards' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Loyalty Desk
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'compare' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Spec Comparison
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'alerts' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Price Alerts
          </button>
        </div>
      </div>

      {/* REWARDS & REFERRALS TAB */}
      {activeTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          
          {/* Card 1: Loyalty points */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/20">
              <Gift className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase block tracking-wider">Your Balance</span>
              <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white">1,420 <span className="text-sm font-light text-slate-400">Points</span></div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light pt-1">
                Earn 1 point for every $1 spent storewide. Points can be redeemed for free diagnostics or discount vouchers.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex justify-between text-xs font-mono">
              <span className="text-slate-400">Next tier at:</span>
              <strong className="text-primary">1,500 pts (VIP Gold)</strong>
            </div>
          </div>

          {/* Card 2: Referrals */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase block tracking-wider">Referral Code</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Earn bonus rewards</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                Distribute your custom referral token. For every sign-up, both of you secure 200 loyalty points instantly.
              </p>
            </div>
            <button
              onClick={handleCopyReferral}
              className="w-full py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50"
            >
              {copiedReferral ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">Code Copied!</span>
                </>
              ) : (
                <>
                  <span>BR-GILBERT-795</span>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                </>
              )}
            </button>
          </div>

          {/* Card 3: Gift Cards */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase block tracking-wider">Redemption desk</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Redeem gift card</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                Enter your alphanumeric voucher serial to deposit pre-loaded balance. (Try <strong>BR-GIFT-50</strong> or <strong>BR-GIFT-100</strong>!)
              </p>
            </div>
            
            <form onSubmit={handleRedeemGiftCard} className="space-y-2.5 text-xs font-mono">
              <input
                type="text"
                required
                placeholder="e.g. BR-GIFT-100"
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-850 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-100 dark:text-white border border-slate-300 dark:border-slate-800 rounded-xl cursor-pointer font-bold"
              >
                Validate Coupon
              </button>

              {giftCardError && (
                <span className="block text-[10px] text-rose-500 leading-tight">⚠ {giftCardError}</span>
              )}
              {giftCardValue !== null && (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 font-bold text-[11px] leading-relaxed">
                  ✓ SUCCESS: Added ${giftCardValue} to your checkout account balance!
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* COMPARISON TAB */}
      {activeTab === 'compare' && (
        <div className="bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-850 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-slate-950 dark:text-white text-base flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Side-by-Side Product Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Select up to 3 products from our motor and workstation catalogue to compare technical parameters side-by-side.
              </p>
            </div>

            {/* Selector drop */}
            <div className="flex gap-2 text-xs font-mono max-w-sm w-full sm:w-auto">
              <select
                value={selectedProductToCompare}
                onChange={(e) => setSelectedProductToCompare(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none cursor-pointer"
              >
                <option value="">-- Choose Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    [{p.category.toUpperCase()}] {p.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddToCompare}
                className="px-4 py-2 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl cursor-pointer flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {compareList.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 font-light text-xs space-y-2">
              <Scale className="w-10 h-10 text-slate-400 mx-auto" />
              <p>Add products above to display structural specifications in a side-by-side comparison matrix.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compareList.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-850 flex flex-col justify-between space-y-5 relative"
                >
                  <button
                    onClick={() => handleRemoveFromCompare(p.id)}
                    className="absolute top-3 right-3 p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg transition-colors cursor-pointer"
                    title="Remove from matrix"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    <img src={p.image} className="aspect-video w-full object-cover rounded-xl border border-slate-250 dark:border-slate-850" alt={p.name} />
                    <div className="text-left space-y-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-secondary">{p.brand}</span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</h4>
                      <p className="text-xs font-bold text-primary font-mono">${p.price.toLocaleString()}</p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-850/60 font-mono text-[11px] text-left">
                      <strong className="text-[10px] text-slate-400 block uppercase tracking-widest pb-1">Specifications</strong>
                      {p.specs.map((spec, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-900/40">
                          <span className="text-slate-400">{spec.label}:</span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PRICE ALERTS TAB */}
      {activeTab === 'alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
            <div>
              <h3 className="font-bold text-slate-950 dark:text-white text-base flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Activate Smart Price Alerts
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Let our AI watch pricing models. When a motor or electronics item falls below your target value, you will secure an instant SMS callback.
              </p>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Select Product</label>
                <select
                  required
                  value={alertProduct}
                  onChange={(e) => {
                    setAlertProduct(e.target.value);
                    const found = products.find(p => p.id === e.target.value);
                    if (found) setAlertPrice(Math.round(found.price * 0.9));
                  }}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  <option value="">-- Choose Product --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Target Alert Price ($)</label>
                <input
                  type="number"
                  required
                  value={alertPrice}
                  onChange={(e) => setAlertPrice(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl cursor-pointer uppercase font-mono tracking-wider text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Bell className="w-4 h-4" />
                <span>Initialize Alert Watch</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
            <h4 className="font-bold text-slate-950 dark:text-white text-xs font-mono uppercase tracking-widest border-b border-slate-200 dark:border-slate-850 pb-3">
              Active Telemetry Price Watches
            </h4>

            {alerts.length === 0 ? (
              <p className="text-xs text-slate-500 font-mono py-6 text-center">No active alert triggers logged.</p>
            ) : (
              <div className="space-y-3 font-mono text-xs">
                {alerts.map((al) => (
                  <div key={al.id} className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-850 flex items-center justify-between">
                    <div className="text-left space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block">{al.productName}</span>
                      <span className="text-[10px] text-slate-500">Alert threshold: <strong className="text-secondary font-bold">${al.targetPrice.toLocaleString()}</strong></span>
                    </div>
                    <button
                      onClick={() => handleDeleteAlert(al.id)}
                      className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg cursor-pointer transition-colors"
                      title="Deactivate Watch"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
