import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Bike, Car, Plane, Cpu, Menu, X, Globe, MessageSquare, Heart, User, ShieldAlert, Sun, Moon, Camera, Mic, MicOff } from 'lucide-react';
import { CategoryType } from '../types';

interface NavbarProps {
  category: CategoryType;
  setCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenConcierge: () => void;
  lang: 'en' | 'rw' | 'fr';
  setLang: (lang: 'en' | 'rw' | 'fr') => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenCustomerAccount: () => void;
  onOpenAdminDashboard: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenImageSearch: () => void;
}

const NAVBAR_LANGS = {
  en: { all: "All Collection", moto: "Motorcycles", car: "Cars", jet: "Airplanes", tech: "Electronics" },
  rw: { all: "Ibintu Byose", moto: "Amayikili", car: "Imodoka", jet: "Indege", tech: "Ibyuma" },
  fr: { all: "Collection", moto: "Motos", car: "Voitures", jet: "Avions", tech: "Électronique" }
};

export default function Navbar({
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCart,
  onOpenConcierge,
  lang,
  setLang,
  wishlistCount,
  onOpenWishlist,
  onOpenCustomerAccount,
  onOpenAdminDashboard,
  isDarkMode,
  onToggleDarkMode,
  onOpenImageSearch
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [voiceTooltip, setVoiceTooltip] = useState<string>('');

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = lang === 'rw' ? 'rw-RW' : lang === 'fr' ? 'fr-FR' : 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setVoiceTooltip('Listening...');
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const cleanedTranscript = transcript.endsWith('.') ? transcript.slice(0, -1) : transcript;
        setSearchQuery(cleanedTranscript);
        setVoiceTooltip(`Found: "${cleanedTranscript}"`);
        setTimeout(() => setVoiceTooltip(''), 3000);
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceTooltip('Mic blocked');
        } else {
          setVoiceTooltip(`Error: ${event.error}`);
        }
        setTimeout(() => setVoiceTooltip(''), 3000);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [lang, setSearchQuery]);

  const toggleVoiceSearch = () => {
    if (!voiceSupported) {
      setVoiceTooltip('Not supported');
      setTimeout(() => setVoiceTooltip(''), 3000);
      return;
    }

    if (isListening) {
      recognition?.stop();
    } else {
      try {
        recognition?.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories: { type: CategoryType; label: string; icon: any }[] = [
    { type: 'all', label: NAVBAR_LANGS[lang].all, icon: Globe },
    { type: 'motorcycle', label: NAVBAR_LANGS[lang].moto, icon: Bike },
    { type: 'car', label: NAVBAR_LANGS[lang].car, icon: Car },
    { type: 'airplane', label: NAVBAR_LANGS[lang].jet, icon: Plane },
    { type: 'electronic', label: NAVBAR_LANGS[lang].tech, icon: Cpu },
  ];

  return (
    <header
      id="store-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-slate-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setCategory('all'); setSearchQuery(''); }}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                <span className="font-bold text-white text-lg tracking-wider">BR</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight leading-tight">
                  Bruce Rii <span className="text-amber-400 font-medium">Shop</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Est. 2026</p>
              </div>
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.type;
              return (
                <button
                  key={cat.type}
                  id={`nav-cat-${cat.type}`}
                  onClick={() => {
                    setCategory(cat.type);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800 text-amber-400 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Search and Cart Action */}
          <div className="flex items-center gap-3 flex-1 md:flex-initial max-w-xs md:max-w-none justify-end">
            
            {/* Search Input */}
            <div className="relative w-full max-w-[180px] sm:max-w-[240px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={isListening ? 'Listening...' : searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isListening}
                placeholder={isListening ? 'Speak now...' : 'Search premium catalog...'}
                className={`w-full pl-9 pr-16 py-1.5 bg-slate-950/80 hover:bg-slate-950 border focus:border-amber-500 rounded-xl text-sm placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-amber-500/30 ${
                  isListening 
                    ? 'text-rose-400 border-rose-500/40 bg-rose-950/10' 
                    : 'text-white border-slate-800'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1.5">
                {searchQuery && !isListening ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer font-mono mr-1"
                    title="Clear query"
                  >
                    Clear
                  </button>
                ) : null}

                {/* Photo Search */}
                {!isListening && (
                  <button
                    onClick={onOpenImageSearch}
                    className="text-slate-400 hover:text-amber-500 transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-900"
                    title="Search catalog by photo (AI Powered)"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                )}

                {/* Voice Search */}
                <button
                  onClick={toggleVoiceSearch}
                  className={`p-1 rounded-lg transition-all cursor-pointer ${
                    isListening 
                      ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 shadow-md shadow-rose-500/10' 
                      : 'text-slate-400 hover:text-amber-500 hover:bg-slate-900'
                  }`}
                  title={isListening ? 'Stop listening' : 'Voice-activated search'}
                >
                  {isListening ? (
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <Mic className="relative h-3.5 w-3.5 text-rose-500" />
                    </span>
                  ) : (
                    <Mic className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {/* Float voice recognition feedback tooltip banner */}
              {voiceTooltip && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-slate-950 border border-slate-850 rounded-xl text-[10px] font-mono text-slate-300 text-left flex items-center gap-1.5 shadow-2xl z-50">
                  <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                  <span className="flex-1 truncate">{voiceTooltip}</span>
                </div>
              )}
            </div>

            {/* SMS Concierge Button */}
            <button
              id="sms-concierge-trigger"
              onClick={onOpenConcierge}
              className="relative px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-200 hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-mono"
              aria-label="SMS Concierge"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">SMS Portal</span>
            </button>

            {/* Wishlist/Compare Trigger */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-200 hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Open Wishlist"
            >
              <Heart className="w-5 h-5 text-amber-500 fill-amber-500/10" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-slate-950 font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Customer Account Trigger */}
            <button
              onClick={onOpenCustomerAccount}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-200 hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Customer Account"
              title="Customer Portal"
            >
              <User className="w-5 h-5 text-amber-500" />
            </button>

            {/* Admin Command Desk Trigger */}
            <button
              onClick={onOpenAdminDashboard}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-750 hover:border-amber-500/30 text-amber-500 hover:text-amber-400 transition-all duration-200 cursor-pointer"
              aria-label="Admin command desk"
              title="Admin Command Desk"
            >
              <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
            </button>

            {/* Multi-language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-200 hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-1 text-xs font-mono uppercase"
              >
                <Globe className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline">{lang}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50 text-xs font-mono">
                  <button
                    onClick={() => { setLang('en'); setLangMenuOpen(false); }}
                    className={`w-full px-4 py-2 text-left hover:bg-slate-900 transition-colors cursor-pointer ${lang === 'en' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLang('rw'); setLangMenuOpen(false); }}
                    className={`w-full px-4 py-2 text-left hover:bg-slate-900 transition-colors cursor-pointer ${lang === 'rw' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                  >
                    Kinyarwanda
                  </button>
                  <button
                    onClick={() => { setLang('fr'); setLangMenuOpen(false); }}
                    className={`w-full px-4 py-2 text-left hover:bg-slate-900 transition-colors cursor-pointer ${lang === 'fr' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
                  >
                    Français
                  </button>
                </div>
              )}
            </div>

            {/* Light/Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-200 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-trigger"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-slate-200 hover:text-white transition-all duration-200 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 md:hidden border border-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 shadow-2xl py-4 px-4 transition-all duration-300">
          <div className="text-xs font-mono text-slate-500 mb-3 tracking-widest uppercase">Select Department</div>
          <div className="flex flex-col space-y-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.type;
              return (
                <button
                  key={cat.type}
                  onClick={() => {
                    setCategory(cat.type);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
