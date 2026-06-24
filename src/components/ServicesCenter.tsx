import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Monitor, Smartphone, Cpu, ShieldCheck, CheckCircle2, AlertCircle, DollarSign, RefreshCw, Send, ArrowRight } from 'lucide-react';

interface Booking {
  id: string;
  deviceType: string;
  brand: string;
  model: string;
  serviceType: string;
  preferredDate: string;
  issueDescription: string;
  deliveryOption: 'dropoff' | 'pickup_home';
  clientName: string;
  clientPhone: string;
}

export default function ServicesCenter() {
  const [activeTab, setActiveTab] = useState<'repair' | 'tradein'>('repair');

  // Repair Booking Form States
  const [deviceType, setDeviceType] = useState('phone');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serviceType, setServiceType] = useState('Screen Replacement');
  const [preferredDate, setPreferredDate] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'dropoff' | 'pickup_home'>('dropoff');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [recentBooking, setRecentBooking] = useState<Booking | null>(null);

  // Trade-In Calculator States
  const [tradeCategory, setTradeCategory] = useState('smartphone');
  const [tradeBrand, setTradeBrand] = useState('Apple');
  const [tradeCondition, setTradeCondition] = useState('Good');
  const [tradeStorage, setTradeStorage] = useState('128GB');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [tradeClaimed, setTradeClaimed] = useState(false);

  const handleBookService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !model || !clientName || !clientPhone) return;

    const booking: Booking = {
      id: 'BR-REP-' + Math.floor(100000 + Math.random() * 900000),
      deviceType,
      brand,
      model,
      serviceType,
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      issueDescription,
      deliveryOption,
      clientName,
      clientPhone,
    };

    setRecentBooking(booking);
    setIsBooked(true);

    // Reset fields
    setBrand('');
    setModel('');
    setIssueDescription('');
    setClientName('');
    setClientPhone('');
  };

  const handleCalculateTradeIn = () => {
    setIsCalculating(true);
    setTimeout(() => {
      let baseVal = 100;
      if (tradeCategory === 'smartphone') baseVal = 250;
      if (tradeCategory === 'laptop') baseVal = 450;
      if (tradeCategory === 'tablet') baseVal = 180;
      if (tradeCategory === 'smartwatch') baseVal = 90;

      // Brand multipliers
      let brandMultiplier = 1.0;
      if (tradeBrand === 'Apple') brandMultiplier = 1.25;
      if (tradeBrand === 'Samsung') brandMultiplier = 1.1;

      // Condition multipliers
      let condMultiplier = 0.8;
      if (tradeCondition === 'Like New') condMultiplier = 1.15;
      if (tradeCondition === 'Good') condMultiplier = 0.95;
      if (tradeCondition === 'Fair') condMultiplier = 0.6;
      if (tradeCondition === 'Damaged') condMultiplier = 0.25;

      // Storage multipliers
      let storageMultiplier = 1.0;
      if (tradeStorage === '256GB' || tradeStorage === '16GB RAM') storageMultiplier = 1.15;
      if (tradeStorage === '512GB' || tradeStorage === '32GB RAM') storageMultiplier = 1.3;

      const finalValue = Math.round(baseVal * brandMultiplier * condMultiplier * storageMultiplier);
      setCalculatedValue(finalValue);
      setIsCalculating(false);
      setTradeClaimed(false);
    }, 800);
  };

  return (
    <section id="services-center" className="py-12 space-y-10 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-1">
            <Cpu className="w-3.5 h-3.5 text-secondary" />
            <span>Certified Lab & Trade-In Desk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bruce Rii Diagnostics, Repairs & Trade-In Exchange
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
            Book professional workstation repairs, screen fits, software setups, or calculate the trade-in value of your old electronics.
          </p>
        </div>

        {/* Custom Tab Toggles */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('repair')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'repair'
                ? 'bg-primary text-white shadow-md'
                : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Repair Booking
          </button>
          <button
            onClick={() => setActiveTab('tradein')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'tradein'
                ? 'bg-primary text-white shadow-md'
                : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Trade-In Estimator
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* TAB 1: REPAIR BOOKING FORM */}
        {activeTab === 'repair' && (
          <>
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Computer & Phone Repair Booking Portal
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                  Fill in your hardware/software technical failure details. Our certified micro-soldering technicians will service your devices and issue full multi-point warranties.
                </p>
              </div>

              <form onSubmit={handleBookService} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Device Category</label>
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                    >
                      <option value="phone">Smartphone</option>
                      <option value="laptop">Laptop / Computer</option>
                      <option value="tablet">iPad / Tablet</option>
                      <option value="smartwatch">Smart Watch</option>
                      <option value="other">Exotic Electronics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Brand / Manufacturer</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apple, Dell, Lenovo"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Model Series</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. iPhone 15 Pro, XPS 15"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Required Service</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                    >
                      <option value="Screen Replacement">Screen / OLED Fitting</option>
                      <option value="Battery Calibration">Battery Calibration & Replacement</option>
                      <option value="Software Setup / Installation">Software Configuration & OS Install</option>
                      <option value="Device Setup / Backups">Safe System Setup & Backups</option>
                      <option value="Logic Board Repair">Micro-soldering Logic Board Repair</option>
                      <option value="Water Damage Restoration">Water Ingress Restoration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Preferred Appointment Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Symptom / Issue Details</label>
                  <textarea
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Provide a detailed log of the hardware faults, system error codes, or physical damage..."
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary h-20 resize-none"
                  />
                </div>

                {/* Logistics pickup / dropoff option */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-3">
                  <span className="block font-bold text-slate-800 dark:text-slate-300 uppercase text-[10px] tracking-widest">Courier Transport Liaison</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('dropoff')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        deliveryOption === 'dropoff'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="block text-[11px] font-bold">Client Dropoff</span>
                      <span className="block text-[9px] text-slate-400 font-light">Walk-in at Kigali Hangar Laboratory</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('pickup_home')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        deliveryOption === 'pickup_home'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className="block text-[11px] font-bold">Home Pickup & Return</span>
                      <span className="block text-[9px] text-slate-400 font-light">Liaison flatbed pickup in secure seal box ($10)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Client Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gilbert Ndacyayisenga"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Contact Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +250 795 591 037"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl cursor-pointer uppercase tracking-wider text-xs transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Diagnostics Reservation</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Service Assurance */}
              <div className="bg-slate-50 dark:bg-slate-900/20 p-6 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Bruce Rii Diagnostics Assurance</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  All micro-soldering, OLED installations, and device setups are handled directly inside state-of-the-art static-safe containment shields. Repairs include a comprehensive <strong>180-Day Guarantee Certificate</strong>.
                </p>
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-850 pt-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Labor Cost:</span>
                    <span className="font-bold text-slate-900 dark:text-white">Starts at $15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hardware Warranty:</span>
                    <span className="font-bold text-slate-900 dark:text-white">180 Days Covered</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Return:</span>
                    <span className="font-bold text-slate-900 dark:text-white">24-48 Hours</span>
                  </div>
                </div>
              </div>

              {/* Real-time booking response modal card */}
              <AnimatePresence>
                {isBooked && recentBooking && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs space-y-3 font-mono"
                  >
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>RESERVATION TRANSMITTED SUCCESSFULLY!</span>
                    </div>
                    <div className="space-y-1 text-slate-600 dark:text-slate-300">
                      <div>Booking Reference: <strong className="text-slate-900 dark:text-white font-bold">{recentBooking.id}</strong></div>
                      <div>Device Model: <span className="text-slate-800 dark:text-slate-200 uppercase">{recentBooking.brand} {recentBooking.model}</span></div>
                      <div>Service Ticket: <span className="text-slate-800 dark:text-slate-200">{recentBooking.serviceType}</span></div>
                      <div>Appointed Date: <span className="text-slate-800 dark:text-slate-200">{recentBooking.preferredDate}</span></div>
                      <div>Liaison Phone: <span className="text-slate-800 dark:text-slate-200">{recentBooking.clientPhone}</span></div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-light pt-2 border-t border-slate-200 dark:border-slate-800/60">
                      Our dispatch concierge has queued your ticket. A service box delivery code will be sent to your phone.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* TAB 2: TRADE-IN EXCHANGE */}
        {activeTab === 'tradein' && (
          <>
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-secondary animate-spin" style={{ animationDuration: '4s' }} />
                  Electronics Trade-In Valuation desk
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-light leading-relaxed">
                  Exchange your old workspace laptops, flagship iPhones, or smartwatches. Calculate instant credit values and apply them directly as voucher codes towards premium store acquisitions!
                </p>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Your Device Category</label>
                    <select
                      value={tradeCategory}
                      onChange={(e) => {
                        setTradeCategory(e.target.value);
                        setCalculatedValue(null);
                      }}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                    >
                      <option value="smartphone">Smartphones (iPhone, Galaxy)</option>
                      <option value="laptop">Laptops (MacBook, Dell XPS)</option>
                      <option value="tablet">Tablets (iPad, Galaxy Tab)</option>
                      <option value="smartwatch">Smart Watches & Trackers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Brand</label>
                    <select
                      value={tradeBrand}
                      onChange={(e) => {
                        setTradeBrand(e.target.value);
                        setCalculatedValue(null);
                      }}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                    >
                      <option value="Apple">Apple Inc.</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Dell">Dell / Microsoft / HP</option>
                      <option value="Other">Other Verified OEM</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Physical Condition</label>
                    <select
                      value={tradeCondition}
                      onChange={(e) => {
                        setTradeCondition(e.target.value);
                        setCalculatedValue(null);
                      }}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                    >
                      <option value="Like New">Like New (Flawless surface, original box)</option>
                      <option value="Good">Good (Minor microscratches, 100% operational)</option>
                      <option value="Fair">Fair (Scratch marks on frame, operational)</option>
                      <option value="Damaged">Damaged (Broken glass / cracked back panel)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Storage / RAM Capacity</label>
                    <select
                      value={tradeStorage}
                      onChange={(e) => {
                        setTradeStorage(e.target.value);
                        setCalculatedValue(null);
                      }}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white outline-none cursor-pointer focus:border-primary"
                    >
                      <option value="128GB">128GB Storage / 8GB RAM</option>
                      <option value="256GB">256GB Storage / 16GB RAM</option>
                      <option value="512GB">512GB Storage / 24GB RAM or higher</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCalculateTradeIn}
                  disabled={isCalculating}
                  className="w-full py-3 bg-secondary hover:bg-secondary/90 text-slate-950 font-bold rounded-xl cursor-pointer uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating Valuation Model...</span>
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4" />
                      <span>Calculate trade-in value</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Valuation Result display */}
              <AnimatePresence mode="wait">
                {calculatedValue !== null ? (
                  <motion.div
                    key="val-result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4"
                  >
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Estimated Exchange Credit</span>
                    <div className="text-4xl sm:text-5xl font-mono font-bold text-secondary">
                      ${calculatedValue.toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
                      Based on dynamic pricing logs for premium <strong>{tradeBrand} ({tradeStorage})</strong> devices in <strong>{tradeCondition}</strong> condition.
                    </p>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60">
                      {tradeClaimed ? (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                          ✓ EXCHANGE VOUCHER SECURED: RII-EXCH-{calculatedValue}
                        </div>
                      ) : (
                        <button
                          onClick={() => setTradeClaimed(true)}
                          className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all"
                        >
                          Claim Exchange Voucher
                        </button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="val-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-slate-50 dark:bg-slate-900/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center py-16 text-slate-500"
                  >
                    <AlertCircle className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                    <p className="text-xs font-light max-w-xs mx-auto">
                      Adjust your physical hardware parameters on the left and trigger valuation calculations to retrieve store escrow certificates.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
