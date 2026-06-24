import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ShieldCheck, Check, Truck, Zap, ShoppingBag, Landmark, PhoneCall } from 'lucide-react';
import { Product, Order } from '../types';

interface QuickBuyModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onCheckoutSuccess: (order: Order) => void;
}

type CheckoutStep = 'checkout' | 'success';

export default function QuickBuyModal({
  product,
  isOpen,
  onClose,
  onCheckoutSuccess
}: QuickBuyModalProps) {
  const [step, setStep] = useState<CheckoutStep>('checkout');
  
  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.1 for 10%
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Shipping Form State
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'hangar' | 'flatbed' | 'courier'>(
    product.category === 'airplane' ? 'hangar' : product.category === 'car' || product.category === 'motorcycle' ? 'flatbed' : 'courier'
  );

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'momo' | 'cod'>('momo');
  const [momoNumber, setMomoNumber] = useState('+250795591037');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  // Generated Order Receipt Details
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Formatting helpers
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Subtotal calculations
  const subtotal = product.price;
  const discountAmount = subtotal * appliedDiscount;

  // Delivery Fee calculation
  const getDeliveryFee = () => {
    if (deliveryType === 'hangar') return 2500; // Airplane executive delivery
    if (deliveryType === 'flatbed') return 450;  // Car/Motorcycle enclosed flatbed
    return 15;                                  // Courier electronics
  };
  const deliveryFee = getDeliveryFee();
  const total = subtotal - discountAmount + deliveryFee;

  // Loyalty Points calculation (10 points per $1000 spent)
  const loyaltyPointsEarned = Math.max(10, Math.floor(total / 100));

  // Handle promo code application
  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'BRUCERII' || code === 'BRUCE10') {
      setAppliedDiscount(0.10);
      setPromoSuccess('Promo code applied! 10% discount subtracted.');
    } else if (code === 'EXOTIC20' && subtotal > 50000) {
      setAppliedDiscount(0.20);
      setPromoSuccess('Exotic Portfolio promo applied! 20% discount subtracted.');
    } else {
      setPromoError('Invalid promo code. Try "BRUCERII" or "EXOTIC20".');
    }
  };

  // Process checkout submission
  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingName || !shippingEmail || !shippingAddress) {
      alert('Please fill in all shipping logistics information.');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVC)) {
      alert('Please complete Visa/Mastercard payment details.');
      return;
    }

    if (paymentMethod === 'momo' && !momoNumber) {
      alert('Please complete your MoMo phone number.');
      return;
    }

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `RII-${randomNum}`;
    const trackingNumber = `BR-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      total: total,
      status: 'processing',
      paymentMethod: paymentMethod === 'wire' ? 'momo' : paymentMethod,
      trackingNumber: trackingNumber,
      items: [
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          price: product.price,
          image: product.image
        }
      ],
      shippingAddress: {
        fullName: shippingName,
        street: shippingAddress,
        city: 'Kigali',
        phone: momoNumber || '+250795591037'
      }
    };

    setGeneratedOrder(newOrder);
    setStep('success');
    onCheckoutSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-[85vh]"
      >
        {/* Left Side: Product Snapshot / Purchase summary */}
        <div className="w-full md:w-5/12 bg-slate-950 p-6 border-b md:border-b-0 md:border-r border-slate-800/80 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Zap className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Instant Purchase Gateway</span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-4">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider uppercase bg-slate-950/90 text-amber-400 border border-slate-800">
                {product.category}
              </span>
            </div>

            <div className="text-left space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{product.brand}</span>
              <h2 className="text-lg font-bold text-white tracking-tight">{product.name}</h2>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{product.description}</p>
            </div>

            {/* Micro specifications list */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-900">
              {product.specs.slice(0, 2).map((s, idx) => (
                <div key={idx} className="bg-slate-900/40 p-2 rounded-lg border border-slate-850">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">{s.label}</span>
                  <span className="block text-[11px] font-semibold text-slate-300 font-mono truncate">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing settlement info box */}
          <div className="mt-6 pt-4 border-t border-slate-900 space-y-2.5 text-xs font-mono text-left">
            <div className="flex justify-between text-slate-400">
              <span>Item Value</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount Applied</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Logistics Transit</span>
              <span className="text-white">{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2.5 border-t border-slate-850">
              <span className="text-slate-300">ESTIMATED TOTAL</span>
              <span className="text-amber-400 font-bold">{formatPrice(total)}</span>
            </div>
            {step === 'success' && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-center gap-2 mt-2">
                <Check className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[10px] text-slate-300 font-sans leading-tight">
                  You earned <strong className="text-amber-400 font-mono">+{loyaltyPointsEarned}</strong> Bruce Rii points!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Form inputs or Success Details */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-950/40 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-850 transition-colors cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <AnimatePresence mode="wait">
            {step === 'checkout' ? (
              <form onSubmit={handleCompleteOrder} className="space-y-6 text-left">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Express Checkout</h3>
                  <p className="text-xs text-slate-400 mt-1">Complete your secure logistics and checkout details instantly.</p>
                </div>

                {/* Shipping Form Block */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">1. Shipping Logistics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="Bruce Wayne"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={shippingEmail}
                        onChange={(e) => setShippingEmail(e.target.value)}
                        placeholder="bruce@waynecorp.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Destination Street Address</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="1007 Mountain Drive, Gotham City"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>

                  {/* Delivery type selectors based on product */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">Transport Protocol</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('courier')}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          deliveryType === 'courier'
                            ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                            : 'bg-slate-950/40 border-slate-850 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-mono uppercase tracking-wider">Courier ($15)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryType('flatbed')}
                        disabled={product.category === 'airplane'}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed ${
                          deliveryType === 'flatbed'
                            ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                            : 'bg-slate-950/40 border-slate-850 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-mono uppercase tracking-wider">Flatbed ($450)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryType('hangar')}
                        disabled={product.category !== 'airplane'}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed ${
                          deliveryType === 'hangar'
                            ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                            : 'bg-slate-950/40 border-slate-850 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-mono uppercase tracking-wider">Aviation ($2,500)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment Option Selector and Form */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">2. Secure Payment Settlement</h4>
                  <div className="grid grid-cols-4 gap-1.5 text-[10px] font-mono">
                    {[
                      { id: 'momo', label: 'MoMo' },
                      { id: 'card', label: 'Card' },
                      { id: 'wire', label: 'Bank Wire' },
                      { id: 'cod', label: 'Cash On Del' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentMethod === m.id
                            ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                            : 'bg-slate-950/40 border-slate-850 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-850">
                    {paymentMethod === 'momo' && (
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-bold">Rwandan MoMo USSD Gateway</span>
                        <div>
                          <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Mobile Money Number</label>
                          <input
                            type="text"
                            value={momoNumber}
                            onChange={(e) => setMomoNumber(e.target.value)}
                            placeholder="+250795591037"
                            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Secure Card Allocation</span>
                        <div>
                          <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Card Number</label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Expiry</label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">CVC</label>
                            <input
                              type="password"
                              required
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value)}
                              placeholder="***"
                              maxLength={4}
                              className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'wire' && (
                      <div className="space-y-1.5 text-[10px] font-mono text-slate-400 text-left">
                        <div className="flex items-center gap-1.5 text-amber-400">
                          <Landmark className="w-3.5 h-3.5" />
                          <span className="font-bold uppercase tracking-wider">Bruce Rii Bank Details</span>
                        </div>
                        <p>Bank: BK (Bank of Kigali) / I&M Bank Rwanda</p>
                        <p>Account Name: BRUCE RII LTD</p>
                        <p>Account Number: 00192-3392415-09</p>
                        <p className="text-[9px] text-slate-500">Please attach your Order ID (RII-xxxxxx) to your wire transfer memo.</p>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="space-y-1 text-[10px] font-mono text-slate-400 text-left">
                        <span className="text-amber-400 font-bold uppercase tracking-wider">Settlement On Cargo Delivery</span>
                        <p>Receive your package, check its compliance and certified seals, and settle directly with our delivery personnel via Cash or MoMo on arrival.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Promo Code Fields */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon (e.g. BRUCERII)"
                      className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-700 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] text-rose-400 font-mono">{promoError}</p>}
                  {promoSuccess && <p className="text-[10px] text-emerald-400 font-mono">{promoSuccess}</p>}
                </div>

                {/* Order trigger action buttons */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-850">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 text-xs font-semibold bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-2xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl shadow-xl shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Complete Instant Purchase
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-6"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">Purchase Successful!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your escrow transaction is complete. We've initiated the courier / cargo transit procedure.
                  </p>
                </div>

                {generatedOrder && (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 max-w-md mx-auto text-left font-mono space-y-3 text-xs">
                    <div className="flex justify-between border-b border-slate-900 pb-2 text-[10px] text-slate-500">
                      <span>INVOICE RECORD</span>
                      <span className="text-amber-400 font-bold">ONLINE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Order ID:</span>
                      <span className="text-white font-bold">{generatedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Logistics Track:</span>
                      <span className="text-white hover:underline cursor-pointer flex items-center gap-1">
                        {generatedOrder.trackingNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Settle Method:</span>
                      <span className="text-white uppercase font-bold">{generatedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Destination:</span>
                      <span className="text-white truncate max-w-[200px]">{generatedOrder.shippingAddress.street}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-900 pt-2 font-sans font-semibold text-sm">
                      <span className="text-slate-400 font-mono text-xs">Total Settle:</span>
                      <span className="text-amber-400 font-mono">{formatPrice(generatedOrder.total)}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 max-w-xs mx-auto space-y-2">
                  <button
                    onClick={onClose}
                    className="w-full py-3 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl transition-all cursor-pointer"
                  >
                    Return to Shop
                  </button>
                  <p className="text-[10px] text-slate-500 font-mono">
                    A confirmation of logistics and digital signature has been dispatched to your safe contact email.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
