import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Shield, Star, Award } from 'lucide-react';
import { CategoryType } from '../types';

interface HeroProps {
  setCategory: (cat: CategoryType) => void;
  onExploreAll: () => void;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: CategoryType;
  image: string;
  badge: string;
  stat: string;
  statLabel: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Ultimate Precision Private Jet Cruisers',
    subtitle: 'THE AVIATION COLLECTION',
    description: 'Fly in luxury with our collection of light business aircraft and performance sailplanes. Designed for executive single-pilot travel and pure soaring comfort.',
    category: 'airplane',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1200',
    badge: 'Aviation Masterpieces',
    stat: '1,450 nm',
    statLabel: 'Interstate Range'
  },
  {
    id: 2,
    title: 'Electric Hypercars & Restomod Roadsters',
    subtitle: 'THE AUTOMOTIVE DEPARTMENT',
    description: 'Experience physics-defying 0-60 acceleration in custom electric monocoques, or enjoy raw analog Flat-6 nostalgia with hand-built vintage roadsters.',
    category: 'car',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
    badge: 'Exclusive Hypercars',
    stat: '1,250 hp',
    statLabel: 'Peak Output'
  },
  {
    id: 3,
    title: 'Track-Tuned Carbon Superbikes',
    subtitle: 'THE MOTORCYCLE SUITE',
    description: 'Aggressive aerodynamics, semi-active Ohlins suspensions, and ultra-lightweight carbon fairings crafted for high-performance track execution.',
    category: 'motorcycle',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200',
    badge: 'High-Velocity Bikes',
    stat: '186 mph',
    statLabel: 'Electronically Limited'
  },
  {
    id: 4,
    title: 'State-of-the-Art Intelligent Gear',
    subtitle: 'THE ELECTRONICS DEPOT',
    description: 'Medium format cinema sensors, foldable multi-display tablets, and high-performance titanium laptops equipped with localized neural cores.',
    category: 'electronic',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200',
    badge: 'Quantum Hardware',
    stat: '45 TOPS',
    statLabel: 'Local NPU Power'
  }
];

export default function Hero({ setCategory, onExploreAll }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero-carousel" className="relative h-[85vh] sm:h-[75vh] md:h-[80vh] min-h-[550px] lg:h-[85vh] bg-slate-950 overflow-hidden flex items-center">
      
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeSlide.image})` }}
          />
        </AnimatePresence>
        {/* Ambient Gradients for dark cinema effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-1" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-4 md:space-y-6 text-left">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeSlide.badge}
                </div>

                {/* Subtitle */}
                <p className="text-sm font-mono text-slate-400 tracking-widest uppercase">
                  {activeSlide.subtitle}
                </p>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                  {activeSlide.title}
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
                  {activeSlide.description}
                </p>

                {/* Highlights and Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => setCategory(activeSlide.category)}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-sm transition-all duration-200 transform active:scale-95 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer"
                  >
                    View Collection
                  </button>
                  <button
                    onClick={onExploreAll}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-sm border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer"
                  >
                    Explore All Assets
                  </button>

                  {/* Spec Quick Indicator */}
                  <div className="flex items-center gap-2 pl-4 border-l border-slate-800 ml-2 hidden sm:flex">
                    <div>
                      <p className="text-xl font-bold font-mono text-white">{activeSlide.stat}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{activeSlide.statLabel}</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Side Features List */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-4">
              <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest font-mono">Bruce Rii Standard</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Full Pedigree Inspection</h4>
                    <p className="text-xs text-slate-400">All vehicles and aviation systems come with full title, service history and logbook audits.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Curated Authenticity</h4>
                    <p className="text-xs text-slate-400">Hand-selected devices and custom restomods that reflect fine craftsmanship.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Bespoke Delivery</h4>
                    <p className="text-xs text-slate-400">Insured hangar delivery for private aircraft, enclosed flatbed delivery for vehicles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Slides Navigation & Indicators */}
        <div className="flex items-center justify-between mt-8 sm:mt-12 pt-6 border-t border-slate-900">
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
