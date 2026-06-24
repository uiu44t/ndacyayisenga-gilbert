import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Star, ShoppingCart, ShieldCheck, Heart, ArrowRight, CheckCircle2,
  Compass, Video, Image as ImageIcon, Calculator, Calendar, Phone,
  MessageSquare, Mail, Award, Check, FileText, AlertCircle, MapPin, Truck
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
  onUpdateProduct?: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onUpdateProduct,
  isFavorite,
  onToggleFavorite
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Media Tab state
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | '360' | 'video'>('photos');
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Review Form States
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Financing Calculator States
  const [downPaymentPct, setDownPaymentPct] = useState(20); // 20% by default
  const [interestRate, setInterestRate] = useState(5.5); // 5.5% annual
  const [loanTerm, setLoanTerm] = useState(48); // 48 months
  const [financeApplied, setFinanceApplied] = useState(false);

  // Test Drive Scheduling States
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('10:00');
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Email Inquiry States
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Inspection Report Panel Collapse
  const [isInspectionExpanded, setIsInspectionExpanded] = useState(false);

  // Drag-to-Spin state refs
  const dragStartRef = useRef<number | null>(null);

  // Determine if it is a vehicle listing
  const isVehicle = product ? (product.category === 'car' || product.category === 'motorcycle') : false;

  // Reset variables when opening modal for a new product
  useEffect(() => {
    setQuantity(1);
    setAddedSuccess(false);
    setActivePhotoIndex(0);
    setActiveAngleIndex(0);
    setFinanceApplied(false);
    setScheduleSuccess(false);
    setInquirySuccess(false);
    setIsInspectionExpanded(false);
    
    // Set default media tab depending on asset features
    if (product) {
      if (isVehicle && product.gallery360 && product.gallery360.length > 0) {
        setActiveMediaTab('360');
      } else {
        setActiveMediaTab('photos');
      }
    }
  }, [product, isVehicle]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddClick = () => {
    onAddToCart(quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  // Financing Calculation
  const vehiclePrice = product.price;
  const downPaymentVal = Math.round((downPaymentPct / 100) * vehiclePrice);
  const principalAmount = vehiclePrice - downPaymentVal;
  const monthlyInterestRate = (interestRate / 100) / 12;
  
  let estimatedMonthly = 0;
  if (principalAmount > 0) {
    if (monthlyInterestRate === 0) {
      estimatedMonthly = principalAmount / loanTerm;
    } else {
      estimatedMonthly = (principalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) / 
                         (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    }
  }

  // 360 Spin Drag events
  const handleDragStart = (clientX: number) => {
    dragStartRef.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (dragStartRef.current === null || !product.gallery360 || product.gallery360.length === 0) return;
    const deltaX = clientX - dragStartRef.current;
    
    // Sensitivity: 15 pixels move changes 1 frame
    if (Math.abs(deltaX) > 15) {
      const direction = deltaX > 0 ? -1 : 1;
      const totalFrames = product.gallery360.length;
      let newIndex = activeAngleIndex + direction;
      
      if (newIndex < 0) newIndex = totalFrames - 1;
      if (newIndex >= totalFrames) newIndex = 0;
      
      setActiveAngleIndex(newIndex);
      dragStartRef.current = clientX;
    }
  };

  const handleDragEnd = () => {
    dragStartRef.current = null;
  };

  // Pre-filled WhatsApp link generator (Bruce Rii number: +250795591037)
  const getWhatsAppLink = () => {
    const defaultMsg = `Hello Bruce Rii Motors! I am highly interested in inquiring about the ${product.name} (ID: ${product.id}) priced at ${formatPrice(product.price)}. Please let me know how I can schedule a viewing!`;
    return `https://wa.me/250795591037?text=${encodeURIComponent(defaultMsg)}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-10">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-6xl h-[92vh] sm:h-[88vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
        >
          {/* Close Trigger Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header for title or brand representation */}
          <div className="bg-slate-950/40 border-b border-slate-850 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono text-slate-400 font-semibold tracking-wider uppercase">
                {isVehicle ? 'Certified Bruce Rii Motors Asset' : 'Premium Electronic Inventory'}
              </span>
            </div>
            {isVehicle && (
              <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                ★ Inspection Board Cleared
              </span>
            )}
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              
              {/* LEFT COLUMN: VISUAL MEDIA ENGINE & TRUST DECK (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                
                {/* Media Presentation Display Box */}
                <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden border border-slate-850 flex flex-col justify-between group">
                  
                  {/* Media Content renderer */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {activeMediaTab === '360' && product.gallery360 && product.gallery360.length > 0 ? (
                      <div 
                        className="w-full h-full relative cursor-ew-resize flex items-center justify-center select-none"
                        onMouseDown={(e) => handleDragStart(e.clientX)}
                        onMouseMove={(e) => handleDragMove(e.clientX)}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                        onTouchEnd={handleDragEnd}
                      >
                        <img
                          src={product.gallery360[activeAngleIndex]}
                          alt={`${product.name} 360 degree frame ${activeAngleIndex}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                        
                        {/* 360 Overlay badge */}
                        <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-mono text-amber-400">
                          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                          <span>Interactive 360° Spin (Drag/Swipe)</span>
                        </div>
                        
                        {/* Angle selector left/right controls */}
                        <div className="absolute bottom-4 inset-x-4 flex justify-between items-center pointer-events-none">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const prev = activeAngleIndex === 0 ? product.gallery360!.length - 1 : activeAngleIndex - 1;
                              setActiveAngleIndex(prev);
                            }}
                            className="p-2 rounded-full bg-slate-950/90 text-white border border-slate-800 hover:bg-slate-900 pointer-events-auto cursor-pointer transition-colors"
                          >
                            ◀ Rotate
                          </button>
                          <span className="px-2.5 py-1 rounded bg-slate-950/95 font-mono text-[10px] text-slate-400 border border-slate-850 pointer-events-none">
                            Frame {activeAngleIndex + 1} / {product.gallery360.length}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const next = activeAngleIndex === product.gallery360!.length - 1 ? 0 : activeAngleIndex + 1;
                              setActiveAngleIndex(next);
                            }}
                            className="p-2 rounded-full bg-slate-950/90 text-white border border-slate-800 hover:bg-slate-900 pointer-events-auto cursor-pointer transition-colors"
                          >
                            Rotate ▶
                          </button>
                        </div>
                      </div>
                    ) : activeMediaTab === 'video' && product.videoUrl ? (
                      <div className="w-full h-full bg-slate-950 relative">
                        <video
                          src={product.videoUrl}
                          autoPlay
                          loop
                          muted
                          controls
                          playsInline
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-mono text-rose-500">
                          <Video className="w-3.5 h-3.5" />
                          <span>Virtual Walkaround Tour</span>
                        </div>
                      </div>
                    ) : (
                      /* Standard Photos Selector mode */
                      <div className="w-full h-full relative">
                        <img
                          src={product.images && product.images.length > 0 ? product.images[activePhotoIndex] : product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-mono text-slate-300">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Gallery Photo {activePhotoIndex + 1} / {(product.images && product.images.length) || 1}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Media Selection Tab Buttons */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {isVehicle && product.gallery360 && product.gallery360.length > 0 && (
                    <button
                      onClick={() => setActiveMediaTab('360')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                        activeMediaTab === '360'
                          ? 'bg-amber-500 border-amber-500 text-slate-950'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Compass className="w-4 h-4" />
                      360° Spin View
                    </button>
                  )}
                  
                  <button
                    onClick={() => setActiveMediaTab('photos')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                      activeMediaTab === 'photos'
                        ? 'bg-amber-500 border-amber-500 text-slate-950'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    High-Res Photos
                  </button>

                  {product.videoUrl && (
                    <button
                      onClick={() => setActiveMediaTab('video')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer border ${
                        activeMediaTab === 'video'
                          ? 'bg-amber-500 border-amber-500 text-slate-950'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Video Tour
                    </button>
                  )}
                </div>

                {/* Sub-gallery Thumbnails Strip for high-res photos */}
                {activeMediaTab === 'photos' && product.images && product.images.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {product.images.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-20 aspect-video rounded-lg overflow-hidden border cursor-pointer transition-all shrink-0 ${
                          activePhotoIndex === idx
                            ? 'border-amber-500 scale-95 shadow-md shadow-amber-500/15'
                            : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-700'
                        }`}
                      >
                        <img src={imgUrl} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* BRAND ASSURANCE & VERIFIED INSPECTION DECK */}
                <div className="bg-slate-950/40 border border-slate-850 rounded-2xl p-5 text-left space-y-4">
                  
                  {/* Verified Badge Header */}
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="block text-xs font-bold text-white font-mono uppercase tracking-wide">
                          {product.isVerifiedVehicle ? 'BRUCE RII AUTHENTICITY ASSURED' : 'GENUINE MANUFACTURE GUARANTEE'}
                        </span>
                        <span className="block text-[10px] text-slate-500 font-light">
                          Full title checks, VIN/Serial audits, and mechanic clearances completed.
                        </span>
                      </div>
                    </div>
                    {product.isVerifiedVehicle && (
                      <span className="text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 rounded-full">
                        VERIFIED MATCH
                      </span>
                    )}
                  </div>

                  {/* Certified Inspection Report Section (Collapsible) */}
                  {isVehicle && product.inspectionReport ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => setIsInspectionExpanded(!isInspectionExpanded)}
                        className="w-full flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-900/60 transition-colors cursor-pointer text-slate-300 hover:text-white"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                          <FileText className="w-4 h-4 text-amber-500" />
                          <span>Technical Inspection Audit Report</span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">
                          {isInspectionExpanded ? 'Hide Details ▲' : 'Expand Details ▼'}
                        </span>
                      </button>

                      {/* Score Dial and Breakdown Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-4 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Audit Score</span>
                          <span className="text-4xl font-black font-mono text-emerald-400 tracking-tight mt-1.5">
                            {product.inspectionReport.overallScore}<span className="text-sm font-light text-slate-500">/100</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-medium mt-1">Excellent State</span>
                        </div>
                        <div className="sm:col-span-8 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Engine & Power Output</span>
                            <span className="font-mono text-emerald-400 font-semibold">✓ Nominal Passed</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Braking Deceleration Force</span>
                            <span className="font-mono text-emerald-400 font-semibold">✓ Nominal Passed</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Electrical Diagnostic Sweep</span>
                            <span className="font-mono text-emerald-400 font-semibold">✓ 0 DTC Codes</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Tires & Traction Grip</span>
                            <span className="font-mono text-amber-400 font-semibold">✓ High Tread</span>
                          </div>
                        </div>
                      </div>

                      {/* Collapsible details pane */}
                      {isInspectionExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-3.5 text-xs text-left"
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-850 pb-2">
                            <span>Auditor: {product.inspectionReport.inspector}</span>
                            <span>Date: {product.inspectionReport.date}</span>
                          </div>
                          <div className="space-y-3 leading-relaxed">
                            <div>
                              <strong className="text-slate-300 block mb-0.5">⚙ Engine & Gearbox Performance:</strong>
                              <p className="text-slate-400 font-light text-xs">{product.inspectionReport.engine}</p>
                            </div>
                            <div>
                              <strong className="text-slate-300 block mb-0.5">🛑 Braking Apparatus & Safety Fluid:</strong>
                              <p className="text-slate-400 font-light text-xs">{product.inspectionReport.brakes}</p>
                            </div>
                            <div>
                              <strong className="text-slate-300 block mb-0.5">⚡ Electrical & Sensor Diagnostics:</strong>
                              <p className="text-slate-400 font-light text-xs">{product.inspectionReport.electrical}</p>
                            </div>
                            <div>
                              <strong className="text-slate-300 block mb-0.5">🚗 Chassis Frame & Body Alignment:</strong>
                              <p className="text-slate-400 font-light text-xs">{product.inspectionReport.body}</p>
                            </div>
                            {product.inspectionReport.details && (
                              <div className="border-t border-slate-850 pt-2 text-slate-300 italic font-light text-xs">
                                "{product.inspectionReport.details}"
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    /* Simple Electronics authenticity details */
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Genuine Manufacturer Boxed</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Certified serial code barcode</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Insured transit protection</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>12-Month Global Warranty</span>
                      </div>
                    </div>
                  )}

                  {/* Warranty and coverage card */}
                  <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center gap-3">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-xs">
                      <span className="block font-bold text-white font-mono">
                        {product.warrantyInfo || '1-Year Certified Bruce Rii Warranty'}
                      </span>
                      <span className="block text-slate-400 font-light">
                        Includes mechanical component replacements, electrical diagnostic support, and priority service scheduling.
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* RIGHT COLUMN: SPECS, PRICING, CALCULATORS & CONTACT OPTIONS (lg:col-span-5) */}
              <div className="lg:col-span-5 text-left flex flex-col space-y-6">
                
                {/* Brand & Name Title Info Card */}
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-mono text-amber-400 tracking-widest uppercase font-bold">{product.brand}</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">{product.name}</h2>
                    {isVehicle && product.model && (
                      <span className="text-xs font-mono text-slate-400">
                        {product.year} Model • {product.condition === 'New' ? 'Brand New Import' : 'Certified Pre-Owned'}
                      </span>
                    )}
                  </div>

                  {/* Ratings and reviews indicators */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 fill-current ${
                            i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-200">{product.rating}</span>
                    <span className="text-xs text-slate-500">|</span>
                    <span className="text-xs text-slate-400">{product.reviewsCount} verified audits</span>
                  </div>

                  {/* Price display with stock limits */}
                  <div className="flex items-baseline gap-4 pt-1.5">
                    <span className="text-3xl font-black font-mono text-amber-400 tracking-tight">
                      {formatPrice(product.price)}
                    </span>
                    {product.stock <= 3 ? (
                      <span className="px-2.5 py-1 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-mono font-medium animate-pulse">
                        Slight Reserve ({product.stock} left)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
                        Immediate Showroom Allocation
                      </span>
                    )}
                  </div>

                  {/* Description Overview text */}
                  <p className="text-sm text-slate-300 font-light leading-relaxed pt-1">
                    {product.description}
                  </p>
                </div>

                {/* Primary Physical Specs Metrics */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest font-bold">Physical Specifications</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="bg-slate-950/60 p-3 border border-slate-850 rounded-xl flex flex-col justify-center">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{spec.label}</span>
                        <span className="text-xs font-bold text-slate-200 font-mono mt-0.5 truncate">{spec.value}</span>
                      </div>
                    ))}
                    {isVehicle && (
                      <>
                        <div className="bg-slate-950/60 p-3 border border-slate-850 rounded-xl flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Mileage</span>
                          <span className="text-xs font-bold text-slate-200 font-mono mt-0.5">
                            {product.mileage !== undefined ? `${product.mileage.toLocaleString()} km` : '0 km'}
                          </span>
                        </div>
                        <div className="bg-slate-950/60 p-3 border border-slate-850 rounded-xl flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Transmission</span>
                          <span className="text-xs font-bold text-slate-200 font-mono mt-0.5">{product.transmission || 'Automatic'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* INTERACTIVE FINANCING & LOAN ESTIMATOR CALCULATOR */}
                {isVehicle && (
                  <div className="bg-slate-950/60 p-5 border border-slate-850 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                      <Calculator className="w-4 h-4 text-amber-500" />
                      <span>Bruce Rii Financing Estimator</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Down Payment pct slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-slate-400">
                          <span>Down Payment ({downPaymentPct}%)</span>
                          <span className="font-mono text-white font-semibold">{formatPrice(downPaymentVal)}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          step="5"
                          value={downPaymentPct}
                          onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>

                      {/* Interest Rate slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-slate-400">
                          <span>Annual Interest Rate</span>
                          <span className="font-mono text-white font-semibold">{interestRate}% APR</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>

                      {/* Loan Duration Term picker */}
                      <div className="space-y-1.5">
                        <label className="block text-slate-400">Amortization Term Limit</label>
                        <select
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none cursor-pointer"
                        >
                          <option value="24">24 Months (2-Year Financing)</option>
                          <option value="36">36 Months (3-Year Financing)</option>
                          <option value="48">48 Months (4-Year Financing)</option>
                          <option value="60">60 Months (5-Year Financing)</option>
                        </select>
                      </div>

                      {/* Estimated Rate Box Display */}
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Principal Amount</span>
                          <span className="block text-sm font-bold font-mono text-slate-300">{formatPrice(principalAmount)}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] text-amber-400 uppercase tracking-wider font-bold">Estimated Monthly Payment</span>
                          <span className="block text-xl font-black font-mono text-amber-400">
                            {formatPrice(estimatedMonthly)}<span className="text-xs font-light text-slate-400">/mo</span>
                          </span>
                        </div>
                      </div>

                      {/* Apply trigger */}
                      {financeApplied ? (
                        <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl text-[11px] font-mono text-center">
                          ✓ Pre-approval request dispatched to Bruce Rii financing agents! We will review on your profile phone: {product.location ? '+250795591037' : '+250795591037'}.
                        </div>
                      ) : (
                        <button
                          onClick={() => setFinanceApplied(true)}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                        >
                          Submit Financial Pre-Approval Application
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* SHOWROOM PICKUP & TEST DRIVE SCHEDULER */}
                <div className="bg-slate-950/60 p-5 border border-slate-850 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>{isVehicle ? 'Schedule Showroom Test Drive' : 'Schedule In-Store pickup'}</span>
                  </div>

                  <div className="space-y-3.5 text-xs text-left">
                    <div className="flex items-start gap-2.5 text-slate-400">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-300 block">Showroom Location:</strong>
                        <span>{product.location || 'Kiyovu Showroom, Kigali, Rwanda'}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-400">
                      <Truck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-300 block">Delivery Methods:</strong>
                        <span>{product.deliveryOptions ? product.deliveryOptions.join(', ') : 'Showroom Pickup, Kigali Delivery'}</span>
                      </div>
                    </div>

                    {/* Booking Form Inputs */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">Date Selection</label>
                        <input
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">Time Slot</label>
                        <select
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none cursor-pointer"
                        >
                          <option value="09:00">09:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>

                    {scheduleSuccess ? (
                      <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl text-[11px] font-mono text-center">
                        ✓ Booking confirmed for {scheduleDate} at {scheduleTime}! An SMS itinerary has been pre-scheduled to +250795591037.
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          if (!scheduleDate) return;
                          setScheduleSuccess(true);
                        }}
                        disabled={!scheduleDate}
                        className={`w-full py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                          scheduleDate 
                            ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                            : 'bg-slate-800 text-slate-500 border border-slate-850 cursor-not-allowed'
                        }`}
                      >
                        Confirm Booking Slot
                      </button>
                    )}
                  </div>
                </div>

                {/* SHOPPING PORTFOLIO & CART ACTION PANEL */}
                <div className="bg-slate-950/40 p-5 border border-slate-850 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                    <span>Direct Purchase</span>
                    <span className="text-[10px] text-slate-500 font-light">Stock: {product.stock} units</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Adjustment Controls */}
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">Quantity</span>
                      <div className="flex items-center bg-slate-900 border border-slate-850 rounded-xl p-1 h-[48px]">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-bold font-mono text-white">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                          disabled={quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Primary Buy Action Button */}
                    <div className="flex-1 flex flex-col">
                      <span className="text-[9px] text-transparent select-none uppercase mb-1.5">Action</span>
                      <button
                        onClick={handleAddClick}
                        className={`h-[48px] px-6 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 cursor-pointer shadow-lg ${
                          addedSuccess
                            ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30'
                        }`}
                      >
                        {addedSuccess ? (
                          <>
                            <CheckCircle2 className="w-4.5 h-4.5 animate-bounce" />
                            <span>Added to Order Portfolio!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4.5 h-4.5" />
                            <span>Add to Order Portfolio</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Secondary Wishlist / Favorite Action */}
                    <div className="flex flex-col">
                      <span className="text-[9px] text-transparent select-none uppercase mb-1.5">Fav</span>
                      <button
                        onClick={onToggleFavorite}
                        className={`h-[48px] w-[48px] flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                          isFavorite
                            ? 'bg-rose-500/10 border-rose-500/40 text-rose-500'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                        title={isFavorite ? 'Remove from Portfolio' : 'Bookmark to Portfolio'}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* BRAND SELLER INQUIRY CONCIERGE & WHATSAPP DECK */}
                <div className="bg-slate-950/40 p-5 border border-slate-850 rounded-2xl space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                    <span>Direct Dealership Inquiries</span>
                  </div>

                  {/* Hot Buttons Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+250795591037"
                      className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 py-2.5 rounded-xl text-xs text-white transition-all font-bold cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>Call Showroom</span>
                    </a>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 py-2.5 rounded-xl text-xs text-emerald-400 transition-all font-bold cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Line</span>
                    </a>
                  </div>

                  {/* Quick Custom Email Inquiry Form */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!inquiryName || !inquiryEmail || !inquiryMessage) return;
                      setInquirySuccess(true);
                      setTimeout(() => {
                        setInquirySuccess(false);
                        setInquiryName('');
                        setInquiryEmail('');
                        setInquiryPhone('');
                        setInquiryMessage('');
                      }, 4000);
                    }}
                    className="space-y-2.5 border-t border-slate-850 pt-3 text-xs"
                  >
                    <span className="block font-bold text-slate-400 font-mono text-[10px] uppercase tracking-wider">Send Electronic Inquiry</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        required
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-[11px] text-white outline-none focus:border-amber-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        required
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-[11px] text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Phone Number (Optional)"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[11px] text-white outline-none focus:border-amber-500"
                    />
                    <textarea
                      placeholder={`I would like to inquire about pricing, delivery parameters, and documentation checks for the ${product.name}...`}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      required
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[11px] text-white outline-none focus:border-amber-500 resize-none"
                    />
                    
                    {inquirySuccess ? (
                      <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl text-[10px] font-mono text-center">
                        ✓ Inquiry dispatched! A Bruce Rii representative will correspond shortly via: {inquiryEmail}.
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg cursor-pointer transition-all"
                      >
                        Submit Digital Inquiry
                      </button>
                    )}
                  </form>
                </div>

                {/* --- CUSTOMER RATINGS & REVIEWS MODULE --- */}
                <div className="pt-6 border-t border-slate-850 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                    <span>Asset Reviews ({product.reviewsCount})</span>
                    <span className="text-[10px] text-amber-500">Verified Network</span>
                  </div>

                  {/* Reviews List Scroll Box */}
                  <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                    {!product.reviews || product.reviews.length === 0 ? (
                      <p className="text-xs text-slate-500 font-light italic">No public reviews yet. Be the first to audit this asset.</p>
                    ) : (
                      product.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 space-y-1.5 text-xs text-left">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{rev.userName}</span>
                              {rev.isVerified && (
                                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase tracking-wider font-bold">Verified Buyer</span>
                              )}
                            </div>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 fill-current ${
                                    i < rev.rating ? 'text-amber-400' : 'text-slate-800'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-300 font-light leading-relaxed">{rev.comment}</p>
                          <span className="block text-[9px] text-slate-650 font-mono text-right">{rev.date}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Submit Feedback Form */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!reviewName || !reviewComment) return;
                    const newReview = {
                      id: 'rev-' + Date.now(),
                      userName: reviewName,
                      rating: reviewRating,
                      comment: reviewComment,
                      date: new Date().toISOString().split('T')[0],
                      isVerified: true
                    };
                    const currentReviews = product.reviews || [];
                    const updatedReviews = [newReview, ...currentReviews];
                    const totalRatingSum = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
                    const newAverageRating = Number((totalRatingSum / updatedReviews.length).toFixed(2));
                    const updatedProduct = {
                      ...product,
                      reviews: updatedReviews,
                      rating: newAverageRating,
                      reviewsCount: updatedReviews.length
                    };
                    if (onUpdateProduct) {
                      onUpdateProduct(updatedProduct);
                    }
                    setReviewName('');
                    setReviewComment('');
                    setReviewSuccess(true);
                    setTimeout(() => setReviewSuccess(false), 3000);
                  }} className="bg-slate-950/60 p-4 border border-slate-850 rounded-2xl space-y-3">
                    <span className="block font-bold text-slate-300 text-[10px] font-mono uppercase tracking-widest">Share Your Customer Experience</span>
                    
                    {reviewSuccess && (
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded-lg">
                        ✓ Your review has been processed successfully!
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                        className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-500">Rating:</span>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-xs text-amber-400 font-bold outline-none cursor-pointer"
                        >
                          <option value="5">★★★★★ (5)</option>
                          <option value="4">★★★★☆ (4)</option>
                          <option value="3">★★★☆☆ (3)</option>
                          <option value="2">★★☆☆☆ (2)</option>
                          <option value="1">★☆☆☆☆ (1)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write your customer review here..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        required
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white outline-none focus:border-amber-500"
                      />
                      <button type="submit" className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer transition-all">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
