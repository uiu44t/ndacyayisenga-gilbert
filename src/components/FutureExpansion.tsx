import React, { useState, useEffect } from 'react';
import { Gavel, Building, ShoppingBag, Send, CheckCircle2, Clock, DollarSign, Award } from 'lucide-react';

interface AuctionItem {
  id: string;
  name: string;
  image: string;
  currentBid: number;
  highestBidder: string;
  timeLeft: number; // in seconds
}

export default function FutureExpansion() {
  const [activeTab, setActiveTab] = useState<'auction' | 'wholesale' | 'marketplace'>('auction');

  // Auction States
  const [auctions, setAuctions] = useState<AuctionItem[]>([
    {
      id: 'auc-1',
      name: 'Rii Vintage Custom Cafe Racer (1 of 3)',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
      currentBid: 19500,
      highestBidder: 'Gilbert N.',
      timeLeft: 1200 // 20 minutes
    },
    {
      id: 'auc-2',
      name: 'Workstation Extreme R9 Liquid-Cooled Prototype',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800',
      currentBid: 4200,
      highestBidder: 'Marcus V.',
      timeLeft: 480 // 8 minutes
    }
  ]);
  const [bidAmount, setBidAmount] = useState<{ [key: string]: string }>({});
  const [auctionMessage, setAuctionMessage] = useState<{ [key: string]: string }>({});

  // Countdown clock effect for Auctions
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions(prev =>
        prev.map(item => ({
          ...item,
          timeLeft: item.timeLeft > 0 ? item.timeLeft - 1 : 0
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlaceBid = (itemId: string) => {
    const entered = Number(bidAmount[itemId]);
    const item = auctions.find(a => a.id === itemId);
    if (!item) return;

    if (!entered || entered <= item.currentBid) {
      setAuctionMessage(prev => ({
        ...prev,
        [itemId]: `Bid must strictly exceed $${item.currentBid.toLocaleString()}`
      }));
      return;
    }

    setAuctions(prev =>
      prev.map(a => {
        if (a.id === itemId) {
          return {
            ...a,
            currentBid: entered,
            highestBidder: 'You (ndacyayisenga...)'
          };
        }
        return a;
      })
    );
    setBidAmount(prev => ({ ...prev, [itemId]: '' }));
    setAuctionMessage(prev => ({
      ...prev,
      [itemId]: `✓ High bid of $${entered.toLocaleString()} acknowledged!`
    }));
  };

  // Wholesale Form State
  const [bulkItem, setBulkItem] = useState('Laptops');
  const [bulkQty, setBulkQty] = useState(10);
  const [compName, setCompName] = useState('');
  const [wholesaleMsg, setWholesaleMsg] = useState('');
  const [isWholesaleSent, setIsWholesaleSent] = useState(false);

  // Seller App State
  const [sellerName, setSellerName] = useState('');
  const [sellerCat, setSellerCat] = useState('Electronics');
  const [sellerDesc, setSellerDesc] = useState('');
  const [isSellerSent, setIsSellerSent] = useState(false);

  const handleSendWholesale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName || bulkQty < 5) return;
    setIsWholesaleSent(true);
    setTimeout(() => {
      setIsWholesaleSent(false);
      setCompName('');
      setWholesaleMsg('');
    }, 4000);
  };

  const handleSendSellerApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerName || !sellerDesc) return;
    setIsSellerSent(true);
    setTimeout(() => {
      setIsSellerSent(false);
      setSellerName('');
      setSellerDesc('');
    }, 4000);
  };

  return (
    <section id="future-expansion" className="py-12 space-y-10 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-1">
            <Gavel className="w-3.5 h-3.5 text-secondary" />
            <span>Future Expansion Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Auctions, Wholesale & Marketplace Seller Portal
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
            Participate in active electronic biddings, register corporate bulk accounts, or apply to authorize custom storefronts.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 self-start md:self-auto shrink-0 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('auction')}
            className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'auction' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Live Auction
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'wholesale' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Wholesale Bulk
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'marketplace' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sellers Hub
          </button>
        </div>
      </div>

      {/* 1. AUCTIONS MODULE */}
      {activeTab === 'auction' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {auctions.map((auc) => (
            <div
              key={auc.id}
              className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row gap-5 items-start text-left"
            >
              <div className="w-full md:w-1/2 aspect-video md:aspect-square bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800">
                <img src={auc.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt={auc.name} />
              </div>

              <div className="flex-1 space-y-4 w-full">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 font-mono text-[9px] font-bold uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-rose-500 animate-pulse" />
                    <span>Time left: {formatTime(auc.timeLeft)}</span>
                  </div>
                  <h4 className="font-bold text-slate-950 dark:text-white text-sm sm:text-base leading-tight">
                    {auc.name}
                  </h4>
                </div>

                <div className="bg-white dark:bg-slate-950 p-3 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Standing:</span>
                    <strong className="text-secondary font-bold">${auc.currentBid.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">High Bidder:</span>
                    <span className="text-slate-900 dark:text-white font-medium">{auc.highestBidder}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={`Min: $${(auc.currentBid + 100).toLocaleString()}`}
                      value={bidAmount[auc.id] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBidAmount(prev => ({ ...prev, [auc.id]: val }));
                      }}
                      className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => handlePlaceBid(auc.id)}
                      className="px-4 py-2 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl cursor-pointer"
                    >
                      Bid
                    </button>
                  </div>

                  {auctionMessage[auc.id] && (
                    <span className={`block text-[10px] ${auctionMessage[auc.id].startsWith('✓') ? 'text-emerald-500 font-bold' : 'text-rose-500'}`}>
                      {auctionMessage[auc.id]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. WHOLESALE MODULE */}
      {activeTab === 'wholesale' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-850 pb-4">
              <h3 className="font-bold text-slate-950 dark:text-white text-base flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Wholesale Corporate Bulk Order Channel
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Register bulk requests for computers, screens, or specialized parts. We offer up to 35% margin relief on certified large volume contracts.
              </p>
            </div>

            <form onSubmit={handleSendWholesale} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Select Catalog Asset</label>
                  <select
                    value={bulkItem}
                    onChange={(e) => setBulkItem(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                  >
                    <option value="Laptops">Enterprise-Grade Laptops</option>
                    <option value="Monitors & Screens">Monitors & Screen Panels</option>
                    <option value="Smartphones">Flagship Smartphones</option>
                    <option value="Auto Spares">Custom Vehicle Spares</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Required Quantity (Min: 5)</label>
                  <input
                    type="number"
                    required
                    min={5}
                    value={bulkQty}
                    onChange={(e) => setBulkQty(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Company / Corporate Entity</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kigali Tech Labs Ltd"
                  value={compName}
                  onChange={(e) => setCompName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Wholesale Custom Specifications</label>
                <textarea
                  value={wholesaleMsg}
                  onChange={(e) => setWholesaleMsg(e.target.value)}
                  placeholder="Detail any custom processor setups, RAM upgrades, or bespoke logistics packaging..."
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary h-20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl cursor-pointer uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Bulk Query</span>
              </button>

              {isWholesaleSent && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>WHOLESALE ENVELOPE SEALED & QUEUED IN SYSTEM.</span>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/20 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Wholesale Terms & Escrow</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              We process commercial bulk volumes under strictly bonded tax escrow accounts. All hardware shipments are packaged inside sealed moisture-safe transport crates.
            </p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-850 text-[10px] text-slate-400 font-mono space-y-1">
              <div>✓ Direct OEM Pricing margins</div>
              <div>✓ Custom logo laser-etching on laptops</div>
              <div>✓ Dedicated key accounts manager support</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MARKETPLACE MODULE */}
      {activeTab === 'marketplace' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-850 pb-4">
              <h3 className="font-bold text-slate-950 dark:text-white text-base flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Marketplace Seller Application Hub
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Join our decentralized multi-seller grid. List your high-grade used smartphones, laptops, or automotive spare parts, and utilize Bruce Rii logistics for secure escrow transactions.
              </p>
            </div>

            <form onSubmit={handleSendSellerApp} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Your Shop Name / Alias</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kigali Tech Master"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Primary Inventory Focus</label>
                  <select
                    value={sellerCat}
                    onChange={(e) => setSellerCat(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                  >
                    <option value="Electronics">Workstation Laptops & Phones</option>
                    <option value="Automotive">Vehicle Spares & Cruisers</option>
                    <option value="Accessories">Cables, Chargers & Adaptors</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Describe Your Stocks & Origin</label>
                <textarea
                  required
                  value={sellerDesc}
                  onChange={(e) => setSellerDesc(e.target.value)}
                  placeholder="Detail your component sources, average inventory size, and quality control tests..."
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary h-20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl cursor-pointer uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Merchant Enrollment</span>
              </button>

              {isSellerSent && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>APPLICATION TRANSMITTED. QUALITY ASSURANCE TEAM WILL AUDIT YOUR SHOP.</span>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/20 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Merchant Escrow Security</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              To protect customers, our system holds buyer payments inside secure escrow balances. Funds are cleared for release only upon verification of delivery and status diagnostics check by the buyer.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
