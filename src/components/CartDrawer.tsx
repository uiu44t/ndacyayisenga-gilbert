import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check, Sparkles, CreditCard, Send, MapPin, QrCode, Loader2 } from 'lucide-react';
import { CartItem } from '../types';
import QRPayment from './QRPayment';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess?: (order: any) => void;
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'success';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess
}: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal discount (e.g. 0.1 for 10%)
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Shipping Form State
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'hangar' | 'flatbed' | 'courier'>('courier');

  // Payment Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'momo' | 'cod' | 'qr'>('qr');
  const [momoNumber, setMomoNumber] = useState('+250795591037');

  // Generated Invoice State
  const [invoiceId, setInvoiceId] = useState('');

  if (!isOpen) return null;

  // Format monetary sums
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Subtotal calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * appliedDiscount;
  
  // Delivery Fee
  const getDeliveryFee = () => {
    if (subtotal === 0) return 0;
    if (deliveryType === 'hangar') return 2500; // Airplane executive delivery
    if (deliveryType === 'flatbed') return 450;  // Car/Motorcycle enclosed flatbed
    return 15;                                  // Courier electronics
  };
  const deliveryFee = getDeliveryFee();
  const total = subtotal - discountAmount + deliveryFee;

  // Promo Code Validation
  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'BRUCERII' || code === 'BRUCE10') {
      setAppliedDiscount(0.10);
      setPromoSuccess('Promo code BRUCERII applied! 10% discount subtracted.');
    } else if (code === 'EXOTIC20' && subtotal > 50000) {
      setAppliedDiscount(0.20);
      setPromoSuccess('Exotic Portfolio promo applied! 20% discount subtracted.');
    } else {
      setPromoError('Invalid promo code. Try "BRUCERII" or "EXOTIC20" (for luxury orders).');
    }
  };

  // Process Checkout Steps
  const handleProceedToShipping = () => {
    if (cartItems.length === 0) return;
    setStep('shipping');
  };

  const handleProceedToPayment = () => {
    if (!shippingName || !shippingEmail || !shippingAddress) {
      alert('Please complete all shipping coordinator fields before proceeding.');
      return;
    }
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCVC)) {
      alert('Please fill out card details to authorize transactions.');
      return;
    }
    if (paymentMethod === 'momo' && !momoNumber) {
      alert('Please provide a valid MoMo Phone Number for USSD verification.');
      return;
    }
    
    // Generate simulated invoice id
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `RII-${randomNum}`;
    setInvoiceId(orderId);
    setStep('success');

    if (onCheckoutSuccess) {
      onCheckoutSuccess({
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        total: total,
        status: 'pending',
        paymentMethod: paymentMethod,
        trackingNumber: `BR-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
        items: cartItems.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress: {
          fullName: shippingName || 'Bruce Rii Guest Customer',
          street: shippingAddress || 'Kigali, Rwanda',
          city: 'Kigali',
          phone: '+250795591037'
        }
      });
    }
  };

  const handleResetCart = () => {
    onClearCart();
    setStep('cart');
    setPromoCode('');
    setAppliedDiscount(0);
    setShippingName('');
    setShippingEmail('');
    setShippingAddress('');
    setCardNumber('');
    setCardExpiry('');
    setCardCVC('');
    setPromoSuccess('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Drawer Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel Sliding from Right */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35 }}
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl h-full"
        >
          {/* Header Block */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Order Portfolio</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-950/40 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Checkout Stage Progress Bar (if not completed) */}
          {step !== 'success' && cartItems.length > 0 && (
            <div className="bg-slate-950 px-6 py-2 border-b border-slate-800/50 flex items-center justify-between text-[10px] font-mono">
              <span className={step === 'cart' ? 'text-amber-400 font-bold' : 'text-slate-500'}>1. PORTFOLIO</span>
              <span className="text-slate-700">➔</span>
              <span className={step === 'shipping' ? 'text-amber-400 font-bold' : 'text-slate-500'}>2. LOGISTICS</span>
              <span className="text-slate-700">➔</span>
              <span className={step === 'payment' ? 'text-amber-400 font-bold' : 'text-slate-500'}>3. SETTLEMENT</span>
            </div>
          )}

          {/* Drawer Body - Variable Content Based on Step */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* --- STEP 1: CART VIEW --- */}
            {step === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">Your portfolio is empty</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-[240px]">Browse our high-performance vehicles, aviation models, and tech devices to build your catalog.</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 cursor-pointer"
                    >
                      Browse Inventory
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Items List */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-4 bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 text-left"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-12 object-cover rounded-lg bg-slate-950 shrink-0 border border-slate-800"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate">{item.product.name}</h4>
                            <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">{item.product.brand}</span>
                            <span className="text-xs font-semibold font-mono text-amber-400 mt-1 block">
                              {formatPrice(item.product.price)}
                            </span>
                          </div>

                          {/* Quantities & Delete Column */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-white rounded text-xs cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                                className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-white rounded text-xs cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="p-1 text-slate-600 hover:text-rose-500 rounded transition-colors cursor-pointer"
                              title="Remove asset"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Codes Block */}
                    <div className="bg-slate-950/40 p-4 border border-slate-800/80 rounded-xl space-y-3">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Promotion Codes</div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="e.g. BRUCERII"
                          className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 outline-none"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg border border-slate-700 cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && <p className="text-[10px] text-rose-400 font-mono text-left">{promoError}</p>}
                      {promoSuccess && <p className="text-[10px] text-emerald-400 font-mono text-left">{promoSuccess}</p>}
                      <div className="text-[9px] text-slate-500 leading-tight">
                        💡 Use coupon <span className="font-mono text-slate-400">BRUCERII</span> for 10% off any premium purchase.
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* --- STEP 2: LOGISTICS & SHIPPING --- */}
            {step === 'shipping' && (
              <div className="space-y-4 text-left">
                <h3 className="text-sm font-semibold text-white">Logistics & Delivery Coordinator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">Please state the delivery details for your luxury portfolio acquisition. Bruce Rii offers tailored transport solutions.</p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Receiver Name</label>
                    <input
                      type="text"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      placeholder="Bruce Wayne"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none placeholder-slate-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Secure Contact Email</label>
                    <input
                      type="email"
                      value={shippingEmail}
                      onChange={(e) => setShippingEmail(e.target.value)}
                      placeholder="bruce@waynecorp.com"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none placeholder-slate-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Destination Address</label>
                    <textarea
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="1007 Mountain Drive, Gotham City"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none placeholder-slate-700 resize-none"
                      required
                    />
                  </div>

                  {/* Delivery Transport Method */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Transport Protocol</label>
                    
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        deliveryType === 'courier' ? 'bg-slate-950 border-amber-500/55' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}>
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryType === 'courier'}
                          onChange={() => setDeliveryType('courier')}
                          className="text-amber-500 focus:ring-0"
                        />
                        <div className="text-left">
                          <span className="block text-xs font-semibold text-white">Insured Freight Express (Courier)</span>
                          <span className="block text-[10px] text-slate-500">Fast secure transport for smart gear. ($15)</span>
                        </div>
                      </label>

                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        deliveryType === 'flatbed' ? 'bg-slate-950 border-amber-500/55' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}>
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryType === 'flatbed'}
                          onChange={() => setDeliveryType('flatbed')}
                          className="text-amber-500 focus:ring-0"
                        />
                        <div className="text-left">
                          <span className="block text-xs font-semibold text-white">Enclosed Hydraulic Flatbed (Vehicular)</span>
                          <span className="block text-[10px] text-slate-500">Safe, clean flatbed transport for cars and motorcycles. ($450)</span>
                        </div>
                      </label>

                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        deliveryType === 'hangar' ? 'bg-slate-950 border-amber-500/55' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}>
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryType === 'hangar'}
                          onChange={() => setDeliveryType('hangar')}
                          className="text-amber-500 focus:ring-0"
                        />
                        <div className="text-left">
                          <span className="block text-xs font-semibold text-white">Pilot Ferry & Hangar Delivery (Aviation)</span>
                          <span className="block text-[10px] text-slate-500">Certified pilot delivers airplane directly to your target hangar. ($2,500)</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-slate-500 hover:text-white underline block pt-2"
                >
                  ◀ Back to Inventory Check
                </button>
              </div>
            )}

            {/* --- STEP 3: BILLING & PAYMENT --- */}
            {step === 'payment' && (
              <div className="space-y-4 text-left">
                <h3 className="text-sm font-semibold text-white">Financial Settlement</h3>
                <p className="text-xs text-slate-400">Authorize secure funds allocation. Select from our verified payment gateways below.</p>

                {/* Method selector */}
                <div className="space-y-2">
                  <button
                    onClick={() => setPaymentMethod('qr')}
                    className={`w-full py-2.5 px-3.5 rounded-xl border uppercase transition-all cursor-pointer text-center flex items-center justify-center gap-2 text-xs font-mono tracking-wider ${
                      paymentMethod === 'qr'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold shadow-lg shadow-amber-500/5'
                        : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>QR Pay (Touch-Free & Instant)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <button
                      onClick={() => setPaymentMethod('momo')}
                      className={`py-2 px-2.5 rounded-xl border uppercase transition-all cursor-pointer text-center ${
                        paymentMethod === 'momo'
                          ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                          : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      Mobile Money
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 px-2.5 rounded-xl border uppercase transition-all cursor-pointer text-center ${
                        paymentMethod === 'card'
                          ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                          : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      Visa/Mastercard
                    </button>
                    <button
                      onClick={() => setPaymentMethod('wire')}
                      className={`py-2 px-2.5 rounded-xl border uppercase transition-all cursor-pointer text-center ${
                        paymentMethod === 'wire'
                          ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                          : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      Bank Transfer
                    </button>
                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`py-2 px-2.5 rounded-xl border uppercase transition-all cursor-pointer text-center ${
                        paymentMethod === 'cod'
                          ? 'bg-slate-950 border-amber-500 text-amber-400 font-bold'
                          : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      Cash On Delivery
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {paymentMethod === 'qr' && (
                    <QRPayment 
                      amount={total} 
                      onPaymentConfirmed={handleCompleteOrder} 
                    />
                  )}

                  {paymentMethod === 'momo' && (
                    <div className="bg-slate-950/80 p-4 border border-slate-800 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center text-amber-500 text-[10px] font-mono uppercase tracking-widest">
                        <span>MTN MoMo & Airtel Money</span>
                        <span className="bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full font-bold">RWA</span>
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Momo Phone Number</label>
                        <input
                          type="text"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          placeholder="+250795591037"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-sm text-white font-mono outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Upon clicking check out, an interactive USSD push prompt will appear on your mobile device to authorize transaction escrow.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="bg-slate-950/80 p-4 border border-slate-800 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono uppercase tracking-widest">
                        <span>Encrypted Card Gateway</span>
                        <CreditCard className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 8888 9999 1234"
                          maxLength={19}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-sm text-white font-mono outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            maxLength={5}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-sm text-white font-mono outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Security Code</label>
                          <input
                            type="password"
                            value={cardCVC}
                            onChange={(e) => setCardCVC(e.target.value)}
                            placeholder="***"
                            maxLength={4}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-1.5 text-sm text-white font-mono outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wire' && (
                    <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-400 leading-relaxed">
                      <p className="text-amber-400 font-semibold font-mono uppercase text-[10px] tracking-widest">Bank Wire Transfer coordinates</p>
                      <p>Settle your premium vehicle or workspace invoice via direct electronic bank wire transfer.</p>
                      <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-slate-300 space-y-1">
                        <div><span className="text-slate-500">Bank Name:</span> Bank of Kigali (BK) / I&M Bank</div>
                        <div><span className="text-slate-500">Swift Code:</span> BKIGRWKA</div>
                        <div><span className="text-slate-500">Account:</span> 00095-883902-12 (Bruce Rii LLC)</div>
                        <div><span className="text-slate-500">Reference:</span> Portfolio Checkout</div>
                      </div>
                      <p className="text-[10px] text-slate-500">Upload your receipt scan or transaction reference inside our Live Chat to expedite shipping clearance.</p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-400 leading-relaxed">
                      <p className="text-primary font-semibold font-mono uppercase text-[10px] tracking-widest">Cash On Delivery (COD)</p>
                      <p>Pay upon delivery at your designated provincial coordinates.</p>
                      <p className="text-[10px] text-slate-500">COD is authorized for certified products and diagnostics parts shipments under $500 total value. Vehicles and luxury jets require bank clearance.</p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-slate-500 hover:text-white underline block pt-2"
                >
                  ◀ Back to Logistics setup
                </button>
              </div>
            )}

            {/* --- STEP 4: CHECKOUT SUCCESS --- */}
            {step === 'success' && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative">
                  <Check className="w-10 h-10" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 rounded-full bg-amber-400 text-slate-900 items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5" />
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">Portfolio Acquired Successfully!</h3>
                  <p className="text-xs text-slate-400 px-4">
                    Bruce Rii Logistics is currently preparing dispatch. Confirmation dispatch emails have been generated.
                  </p>
                </div>

                {/* Simulated Invoice Display */}
                <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left font-mono space-y-3">
                  <div className="text-[10px] text-slate-500 border-b border-slate-800/80 pb-2 flex justify-between">
                    <span>INVOICE ID</span>
                    <span className="text-slate-300">{invoiceId}</span>
                  </div>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-slate-500">Recipient:</span> <span className="text-white truncate max-w-[180px]">{shippingName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Destination:</span> <span className="text-white truncate max-w-[180px]">{shippingAddress}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Logistics:</span> <span className="text-amber-400 capitalize">{deliveryType} delivery</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Settlement:</span> <span className="text-slate-300 capitalize">{paymentMethod} authorized</span></div>
                  </div>

                  <div className="border-t border-slate-800/80 pt-2.5 flex justify-between text-xs font-bold">
                    <span className="text-slate-400">GRAND TOTAL</span>
                    <span className="text-amber-400">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* SMS Instructions Callout */}
                <div className="w-full bg-slate-950/80 p-4 border border-amber-500/20 rounded-2xl text-left space-y-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">💬 SMS Real-time Dispatch Updates</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    To receive immediate tracking status notifications directly on your phone, send this exact text to our login/liaison number:
                  </p>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300 flex justify-between items-center select-all">
                    <span>STATUS {invoiceId}</span>
                    <span className="text-[9px] text-slate-500 font-sans font-normal">Send to +250795591037</span>
                  </div>
                </div>

                <div className="bg-slate-950/40 p-4 border border-slate-800/60 rounded-xl text-left text-[11px] text-slate-400 leading-relaxed max-w-xs">
                  🔒 <span className="text-slate-300 font-semibold">Security Vault Shield:</span> All transfers are insured up to $10,000,000 under Lloyd's of London syndicates via Bruce Rii.
                </div>

                <button
                  onClick={handleResetCart}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Conclude Acquisition
                </button>
              </div>
            )}

          </div>

          {/* Checkout Footer Column (if items exist & not in success) */}
          {step !== 'success' && cartItems.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800/80 space-y-4">
              
              {/* Financial calculations */}
              <div className="space-y-1.5 text-xs text-left">
                <div className="flex justify-between text-slate-400">
                  <span>Portfolio Subtotal:</span>
                  <span className="font-mono text-white">{formatPrice(subtotal)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Subtracted:</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Logistics/Transport Fee:</span>
                  {deliveryFee === 0 ? (
                    <span className="font-mono text-slate-500">Set in next step</span>
                  ) : (
                    <span className="font-mono text-white">{formatPrice(deliveryFee)}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-slate-800/60">
                  <span className="text-slate-300">Acquisition Total:</span>
                  <span className="font-mono text-amber-400 text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons based on current step */}
              {step === 'cart' && (
                <button
                  onClick={handleProceedToShipping}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
                >
                  <span>Appoint Logistics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 'shipping' && (
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Confirm Logistics & Settle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 'payment' && (
                <button
                  onClick={handleCompleteOrder}
                  disabled={paymentMethod === 'qr'}
                  className={`w-full py-3 font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg ${
                    paymentMethod === 'qr'
                      ? 'bg-slate-850 text-slate-500 cursor-not-allowed border border-slate-800'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-amber-500/20 hover:shadow-amber-500/30'
                  }`}
                >
                  <span>{paymentMethod === 'qr' ? 'Awaiting QR Code Scan...' : 'Authorize Financial Transfer'}</span>
                  {paymentMethod === 'qr' ? (
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Safety warning */}
              <p className="text-[9px] text-slate-500 text-center uppercase tracking-widest leading-none pt-1">
                🔒 Secured transaction powered by Bruce Rii Shop
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
