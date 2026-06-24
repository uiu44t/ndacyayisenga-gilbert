import { useState } from 'react';
import { Bike, Car, Plane, Cpu, ShieldCheck, CreditCard, Send, Sparkles, Truck, HelpCircle, ArrowRight } from 'lucide-react';

export default function ServiceDetails() {
  const [activeTab, setActiveTab] = useState<'delivery' | 'payment'>('delivery');

  return (
    <section id="service-methods" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading and Interactive Toggles */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase font-mono">
                <Sparkles className="w-3 h-3" />
                <span>BRUCE RII STANDARD OPERATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Logistics & Financial Settlement
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Review our comprehensive delivery transport protocols and secure financial channels tailored for luxury acquisitions.
              </p>
            </div>

            {/* Tab Switches */}
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab('delivery')}
                className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'bg-slate-950 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-950/40 border-slate-805 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeTab === 'delivery' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-semibold">Delivery & Transport</span>
                  <span className="block text-[11px] text-slate-500 font-light">Custom vehicle transport & ferry pilots</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                  activeTab === 'payment'
                    ? 'bg-slate-950 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-950/40 border-slate-805 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${activeTab === 'payment' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-semibold">Payment Settlement</span>
                  <span className="block text-[11px] text-slate-500 font-light">Encrypted credit, wire transfers & crypto</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-8 bg-slate-950/40 rounded-2xl border border-slate-800/60 p-6 sm:p-8">
            
            {/* DELIVERY CONTENT */}
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <div className="border-b border-slate-850 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-amber-400" />
                    Specialized Delivery Protocols
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Every asset from Bruce Rii Shop is prepared, wrapped, and delivered via optimized logistics vectors.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Delivery Mode 1 */}
                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">Insured Freight</h4>
                      <h5 className="text-sm font-bold text-white">Freight Courier</h5>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        Securely packaged, sealed, and dispatched with overnight express courier tracking. Perfect for ultra-precise electronics.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Tariff:</span>
                      <span className="font-mono text-amber-400 font-bold">$15 flat-rate</span>
                    </div>
                  </div>

                  {/* Delivery Mode 2 */}
                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Car className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">Premium Transport</h4>
                      <h5 className="text-sm font-bold text-white font-sans">Hydraulic Flatbed</h5>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        Enclosed climate-controlled flatbeds guard motorcycles and luxury cars against paint scratches, dust, or road debris.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Tariff:</span>
                      <span className="font-mono text-amber-400 font-bold">$450 total</span>
                    </div>
                  </div>

                  {/* Delivery Mode 3 */}
                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Plane className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">Executive Ferry</h4>
                      <h5 className="text-sm font-bold text-white">Pilot Ferry Service</h5>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        For private jet purchases. A fully certified pilot will fly the aircraft directly into your nearest executive air strip hanger.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Tariff:</span>
                      <span className="font-mono text-amber-400 font-bold">$2,500 total</span>
                    </div>
                  </div>
                </div>

                {/* Secure Seal */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 flex items-center gap-3 text-xs text-slate-400 font-light">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Transit Insurance Cover:</strong> Every delivery method is fully insured up to its retail valuation through our partnership with premium Lloyd's of London underwriters.
                  </span>
                </div>
              </div>
            )}

            {/* PAYMENT CONTENT */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="border-b border-slate-850 pb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    Secure Financial Settlement
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Transactions are fully encrypted. We accommodate both immediate authorizations and discreet escrow settlements.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Payment Option 1 */}
                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">Gateway</h4>
                      <h5 className="text-sm font-bold text-white">Secure Cards</h5>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        Settle your purchase instantly via major credit card networks. Features 256-bit TLS hardware-grade encryption.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Security:</span>
                      <span className="font-mono text-amber-400 font-semibold">PCI-DSS Compliant</span>
                    </div>
                  </div>

                  {/* Payment Option 2 */}
                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <Send className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">Escrow</h4>
                      <h5 className="text-sm font-bold text-white">Bank Wire Transfer</h5>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        Recommended for large-scale acquisitions (exceeding $100,000). Full Swift routing coordinates issued upon order confirmation.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Speed:</span>
                      <span className="font-mono text-amber-400 font-semibold">1-2 Business Days</span>
                    </div>
                  </div>

                  {/* Payment Option 3 */}
                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-widest">Decentralized</h4>
                      <h5 className="text-sm font-bold text-white">Crypto Assets</h5>
                      <p className="text-xs text-slate-400 font-light leading-relaxed">
                        Complete your portfolio payment instantly utilizing BTC, ETH, or premium stablecoins like USDC through multi-sig custody.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-xs">
                      <span className="text-slate-500">Confirmation:</span>
                      <span className="font-mono text-amber-400 font-semibold">Instant On-Chain</span>
                    </div>
                  </div>
                </div>

                {/* Secure Seal */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 flex items-center gap-3 text-xs text-slate-400 font-light">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Anti-Fraud Verification:</strong> All wire and crypto transfers are automatically audited under international compliance standards to guarantee legitimate custody transition.
                  </span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
