import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bike, Car, Plane, Cpu, ShieldCheck, Star, Sparkles, Filter,
  ArrowUpDown, CheckCircle, HelpCircle, Phone, Mail, MapPin, RefreshCw, Compass, SlidersHorizontal
} from 'lucide-react';

import { CategoryType, Product, CartItem, Order, UserProfile } from './types';
import { PRODUCTS } from './data/products';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import ServiceDetails from './components/ServiceDetails';
import SMSConciergeModal from './components/SMSConciergeModal';
import QuickBuyModal from './components/QuickBuyModal';

// Brand New Custom Components
import CustomerAccount from './components/CustomerAccount';
import AdminDashboard from './components/AdminDashboard';
import WishlistDrawer from './components/WishlistDrawer';
import LiveChat from './components/LiveChat';
import FlashSale from './components/FlashSale';
import ImageSearchModal from './components/ImageSearchModal';

// Future expansion and newly added departments
import DealsHub from './components/DealsHub';
import ServicesCenter from './components/ServicesCenter';
import BlogSection from './components/BlogSection';
import SupportHub from './components/SupportHub';
import SpecialFeatures from './components/SpecialFeatures';
import FutureExpansion from './components/FutureExpansion';

export default function App() {
  // Language & UI Options State
  const [lang, setLang] = useState<'en' | 'rw' | 'fr'>('en');

  // Dark/Light Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('brucerii_theme');
      return stored ? stored === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('brucerii_theme', isDarkMode ? 'dark' : 'light');
    if (!isDarkMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isDarkMode]);

  // Active Catalog State (loaded from raw file, but reactive to allow admin additions)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('brucerii_products');
      return stored ? JSON.parse(stored) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Save product catalog modifications
  useEffect(() => {
    localStorage.setItem('brucerii_products', JSON.stringify(productsList));
  }, [productsList]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('brucerii_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('brucerii_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Customer Profile State (with target variables configured)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('brucerii_user');
      return stored ? JSON.parse(stored) : {
        fullName: 'Bruce Rii VIP Client',
        email: 'ndacyayisengagilbert820@gmail.com',
        phone: '+250795591037',
        addresses: [
          { id: 'addr-default', street: 'KN 3 Rd, Kiyovu, Kigali', city: 'Kigali, Rwanda', isDefault: true }
        ]
      };
    } catch {
      return {
        fullName: 'Bruce Rii VIP Client',
        email: 'ndacyayisengagilbert820@gmail.com',
        phone: '+250795591037',
        addresses: [
          { id: 'addr-default', street: 'KN 3 Rd, Kiyovu, Kigali', city: 'Kigali, Rwanda', isDefault: true }
        ]
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('brucerii_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Active Orders Log State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('brucerii_orders');
      return stored ? JSON.parse(stored) : [
        {
          id: 'RII-77492',
          date: '2026-06-20',
          total: 1299,
          status: 'shipped',
          paymentMethod: 'momo',
          trackingNumber: 'BR-TRK-8854032',
          items: [
            { productId: 'prod-iphone16', productName: 'iPhone 16 Pro Max', quantity: 1, price: 1299 }
          ],
          shippingAddress: {
            fullName: 'Bruce Rii VIP Client',
            street: 'KN 3 Rd, Kiyovu, Kigali',
            city: 'Kigali, Rwanda',
            phone: '+250795591037'
          }
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('brucerii_orders', JSON.stringify(orders));
  }, [orders]);

  // Modal & Drawer visibility toggles
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Navigation & Search State
  const [category, setCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced Vehicle Search State
  const [vehicleBrand, setVehicleBrand] = useState<string>('all');
  const [vehicleSubcategory, setVehicleSubcategory] = useState<string>('all');
  const [vehicleYearMin, setVehicleYearMin] = useState<number>(0);
  const [vehicleFuel, setVehicleFuel] = useState<string>('all');
  const [vehicleTransmission, setVehicleTransmission] = useState<string>('all');
  const [vehicleMileageMax, setVehicleMileageMax] = useState<number>(150000);
  const [vehicleColor, setVehicleColor] = useState<string>('all');
  const [vehicleCondition, setVehicleCondition] = useState<string>('all');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);

  // Filtering & Sorting State
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Absolute price limits based on products list
  const absoluteMinPrice = useMemo(() => {
    if (productsList.length === 0) return 0;
    return Math.min(...productsList.map((p) => p.price));
  }, [productsList]);

  const absoluteMaxPrice = useMemo(() => {
    if (productsList.length === 0) return 2500000;
    return Math.max(...productsList.map((p) => p.price));
  }, [productsList]);

  // Selected price range constraints
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(2500000);

  // Sync with actual products list range when it loads or changes
  useEffect(() => {
    setPriceMin(absoluteMinPrice);
    setPriceMax(absoluteMaxPrice);
  }, [absoluteMinPrice, absoluteMaxPrice]);

  // Shopping Cart State (loaded from localStorage if possible)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('brucerii_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  // Selected Product Detail State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Quick Buy Product State
  const [quickBuyProduct, setQuickBuyProduct] = useState<Product | null>(null);

  // Save cart state changes to localStorage
  useEffect(() => {
    localStorage.setItem('brucerii_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        // Limit additions to remaining stock
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prevItems, { product, quantity: Math.min(product.stock, quantity) }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Filter and Sort implementation
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsList];

    // 1. Filter by Department / Category
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // 2.5. Advanced Vehicle Search Filters
    if (vehicleBrand !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === vehicleBrand.toLowerCase());
    }
    if (vehicleSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory?.toLowerCase() === vehicleSubcategory.toLowerCase());
    }
    if (vehicleYearMin > 0) {
      result = result.filter((p) => p.year === undefined || p.year >= vehicleYearMin);
    }
    if (vehicleFuel !== 'all') {
      result = result.filter((p) => p.fuelType?.toLowerCase() === vehicleFuel.toLowerCase());
    }
    if (vehicleTransmission !== 'all') {
      result = result.filter((p) => p.transmission?.toLowerCase() === vehicleTransmission.toLowerCase());
    }
    if (vehicleMileageMax < 150000) {
      result = result.filter((p) => p.mileage === undefined || p.mileage <= vehicleMileageMax);
    }
    if (vehicleColor !== 'all') {
      result = result.filter((p) => p.color?.toLowerCase().includes(vehicleColor.toLowerCase()));
    }
    if (vehicleCondition !== 'all') {
      result = result.filter((p) => p.condition?.toLowerCase() === vehicleCondition.toLowerCase());
    }

    // 3. Filter by Custom Price Range
    result = result.filter((p) => p.price >= priceMin && p.price <= priceMax);

    // 4. Sort results
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // 'featured'
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating - a.rating;
      });
    }

    return result;
  }, [
    category, searchQuery, priceMin, priceMax, sortBy, productsList,
    vehicleBrand, vehicleSubcategory, vehicleYearMin, vehicleFuel,
    vehicleTransmission, vehicleMileageMax, vehicleColor, vehicleCondition
  ]);

  // Quick helper to jump straight to filtered products view
  const handleScrollToProducts = () => {
    const section = document.getElementById('inventory-catalog');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetAllFilters = () => {
    setCategory('all');
    setSearchQuery('');
    setPriceMin(absoluteMinPrice);
    setPriceMax(absoluteMaxPrice);
    setSortBy('featured');
    setVehicleBrand('all');
    setVehicleSubcategory('all');
    setVehicleYearMin(0);
    setVehicleFuel('all');
    setVehicleTransmission('all');
    setVehicleMileageMax(150000);
    setVehicleColor('all');
    setVehicleCondition('all');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Dynamic Header */}
      <Navbar
        category={category}
        setCategory={(cat) => {
          setCategory(cat);
          handleScrollToProducts();
        }}
        searchQuery={searchQuery}
        setSearchQuery={(query) => {
          setSearchQuery(query);
          if (query) handleScrollToProducts();
        }}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        lang={lang}
        setLang={setLang}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCustomerAccount={() => setIsCustomerOpen(true)}
        onOpenAdminDashboard={() => setIsAdminOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenImageSearch={() => setIsImageSearchOpen(true)}
      />

      {/* Hero Carousel Banner */}
      <main className="flex-1 pt-20">
        
        <Hero
          setCategory={(cat) => {
            setCategory(cat);
            handleScrollToProducts();
          }}
          onExploreAll={() => {
            setCategory('all');
            handleScrollToProducts();
          }}
        />

        {/* --- MAIN CATALOG INVENTORY SECTION --- */}
        <section id="inventory-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          
          {/* Header Title Grid */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-900 pb-6 text-left">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXOTIC VEHICLES & GEAR</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {category === 'all' ? 'The Complete Portfolio' : `${category} Collection`}
              </h2>
              <p className="text-sm text-slate-400 mt-1.5 font-light">
                Hand-curated, flight-tested, track-ready, and certified by the Bruce Rii inspection board.
              </p>
            </div>

            {/* Total Results Counter */}
            <div className="text-right shrink-0">
              <span className="text-sm text-slate-500 font-mono">
                Showing {filteredAndSortedProducts.length} of {productsList.length} Available Asset Records
              </span>
            </div>
          </div>

          {/* Flash Liquidation Deals countdown banner */}
          <FlashSale
            products={productsList}
            onProductClick={setSelectedProduct}
            lang={lang}
          />

          {/* Deals, clearance items and active coupon codes */}
          <DealsHub 
            products={productsList} 
            onProductClick={setSelectedProduct}
            onAddToCart={handleAddToCart}
            isDarkMode={isDarkMode}
          />

          {/* Filtering Tools Deck */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-900 flex flex-col md:flex-row gap-6 md:items-center justify-between text-left">
            
            {/* Left side: Icon & Title */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Price Range Filter</h3>
                <p className="text-[10px] text-slate-400">Define custom budget boundaries</p>
              </div>
            </div>

            {/* Center: Range Slider Component */}
            <div className="flex-1 max-w-xl px-2">
              <div className="relative h-2 w-full bg-slate-950 rounded-full mt-1.5 mb-2">
                {/* Highlighted track */}
                <div
                  className="absolute h-2 bg-gradient-to-r from-amber-500 to-rose-600 rounded-full"
                  style={{
                    left: `${Math.max(0, Math.min(100, ((priceMin - absoluteMinPrice) / (absoluteMaxPrice - absoluteMinPrice || 1)) * 100))}%`,
                    right: `${Math.max(0, Math.min(100, 100 - ((priceMax - absoluteMinPrice) / (absoluteMaxPrice - absoluteMinPrice || 1)) * 100))}%`
                  }}
                />
                
                {/* Min Price Slider Handle */}
                <input
                  type="range"
                  min={absoluteMinPrice}
                  max={absoluteMaxPrice}
                  value={priceMin}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), priceMax - 1);
                    setPriceMin(val);
                  }}
                  className="absolute pointer-events-none appearance-none w-full h-2 bg-transparent top-0 left-0 outline-none select-none z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-amber-500/20 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg"
                />
                
                {/* Max Price Slider Handle */}
                <input
                  type="range"
                  min={absoluteMinPrice}
                  max={absoluteMaxPrice}
                  value={priceMax}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), priceMin + 1);
                    setPriceMax(val);
                  }}
                  className="absolute pointer-events-none appearance-none w-full h-2 bg-transparent top-0 left-0 outline-none select-none z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-amber-500/20 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg"
                />
              </div>
            </div>

            {/* Right side: Manual input fields */}
            <div className="flex flex-wrap items-center gap-3 justify-end shrink-0">
              <div className="flex items-center gap-1.5">
                {/* Min Input */}
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    min={absoluteMinPrice}
                    max={priceMax}
                    value={priceMin}
                    onChange={(e) => {
                      const val = Math.max(absoluteMinPrice, Math.min(priceMax - 1, Number(e.target.value)));
                      setPriceMin(val);
                    }}
                    className="w-24 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-1 pl-5 pr-2 text-xs outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <span className="text-slate-600 text-xs">—</span>

                {/* Max Input */}
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    min={priceMin}
                    max={absoluteMaxPrice}
                    value={priceMax}
                    onChange={(e) => {
                      const val = Math.min(absoluteMaxPrice, Math.max(priceMin + 1, Number(e.target.value)));
                      setPriceMax(val);
                    }}
                    className="w-28 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-1 pl-5 pr-2 text-xs outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Clear filters trigger */}
              {(category !== 'all' || searchQuery !== '' || priceMin !== absoluteMinPrice || priceMax !== absoluteMaxPrice) && (
                <button
                  onClick={resetAllFilters}
                  className="px-3 py-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer hover:underline border border-rose-500/20 bg-rose-500/5 rounded-lg"
                >
                  <RefreshCw className="w-3 h-3" />
                  Clear Filters
                </button>
              )}
            </div>

          </div>

          {/* Search/Filter Empty State Handler */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="py-20 rounded-2xl bg-slate-900/20 border border-slate-900 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">No matching assets identified</h3>
                <p className="text-xs text-slate-500 mt-1">Adjust search parameters or clear filters to view catalog items.</p>
              </div>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            /* Product Cards Responsive Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => setSelectedProduct(product)}
                    onAddToCart={() => handleAddToCart(product)}
                    onQuickBuy={() => setQuickBuyProduct(product)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

        </section>

        {/* --- PREMIUM BRAND ECOSYSTEM CHANNELS --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-900/80 space-y-24">
          
          {/* Services & Maintenance Booking / Trade-In Program */}
          <ServicesCenter />

          {/* Loyalty Points, Comparisons, Price Alerts */}
          <SpecialFeatures products={productsList} isDarkMode={isDarkMode} />

          {/* Live Auctions, Wholesale, Seller Marketplace */}
          <FutureExpansion />

          {/* Editorial & Tech News Blog */}
          <BlogSection />

          {/* Support Hub, Live Chat & Frequently Asked Questions */}
          <SupportHub />

        </section>

        {/* --- SERVICE METHODS (Payment & Delivery) --- */}
        <ServiceDetails />

        {/* --- BRAND ASSURANCE VALUES --- */}
        <section className="bg-slate-900/30 border-y border-slate-900/60 py-16 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Full Physical Registration</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Every motorcycle, supercar, and executive aircraft in our hangar is fully registered, title-cleared, flight-ready, and accompanied by exhaustive technical logbooks.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Bruce Rii Certified Servicing</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Prior to delivery, our mechanical engineers carry out full avionics and chassis multi-point tests. Smart electronics come with genuine global manufacturer warranties.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Discreet Escrow Settlement</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  We handle premium transactions via secure bank-to-bank wire transfer protocols or audited crypto custody pipelines to ensure privacy and transaction speed.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* --- PREMIUM FOOTER GRID --- */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
            
            {/* Branding Column */}
            <div className="md:col-span-3 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm">
                  BR
                </div>
                <span className="text-base font-bold text-white tracking-tight">Bruce Rii Shop</span>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                An elite catalog showcasing performance roadsters, customized track motorcycles, personal business aircraft, and premium electronic workspace devices.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                LAT/LONG: 40.7128° N, 74.0060° W • HANGAR 14B
              </div>
            </div>

            {/* Department Shortcuts Column */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Departments</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => { setCategory('motorcycle'); handleScrollToProducts(); }} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5">
                    <Bike className="w-3.5 h-3.5" /> Motorcycles
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCategory('car'); handleScrollToProducts(); }} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5" /> Luxury Vehicles
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCategory('airplane'); handleScrollToProducts(); }} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5" /> Aircraft
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCategory('electronic'); handleScrollToProducts(); }} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Electronics
                  </button>
                </li>
              </ul>
            </div>

            {/* Future Expansions Column */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                {lang === 'rw' ? 'Nyuma ushobora kongeramo' : 'Future Expansions'}
              </h4>
              <ul className="space-y-2 font-light">
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('services-center')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hover:text-amber-400 text-left transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    ✦ Computer & Phone Repair Booking
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('future-expansion')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hover:text-amber-400 text-left transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    ✦ Wholesale Bulk Orders
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('future-expansion')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hover:text-amber-400 text-left transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    ✦ Marketplace for Other Sellers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('future-expansion')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hover:text-amber-400 text-left transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    ✦ Electronics & Auto Auction
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('services-center')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hover:text-amber-400 text-left transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    ✦ Trade-In Program (exchange old devices for new)
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Support Columns */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Liaison Office</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Reach our sales concierge for private viewings or restomod options.
              </p>
              <div className="space-y-2 pt-1 font-mono text-[10px] text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>+1 (800) 555-0199</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>concierge@brucerii-shop.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">Kigali, Rwanda & Westchester Airport</span>
                </div>
              </div>
            </div>

          </div>

          {/* Lower Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            <div>
              © 2026 Bruce Rii Shop. All private assets registered.
            </div>
            <div className="flex gap-4">
              <span>Security Vault Active</span>
              <span>•</span>
              <span>FAA/DOT Compliance Checked</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- CART DRAWER COMPONENT --- */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onCheckoutSuccess={(newOrder) => setOrders([newOrder, ...orders])}
          />
        )}
      </AnimatePresence>

      {/* --- PRODUCT SPECIFICATION DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(qty) => handleAddToCart(selectedProduct, qty)}
            onUpdateProduct={(updatedP) => {
              setProductsList(productsList.map(p => p.id === updatedP.id ? updatedP : p));
              setSelectedProduct(updatedP);
            }}
            isFavorite={wishlist.some(w => w.id === selectedProduct.id)}
            onToggleFavorite={() => {
              if (wishlist.some(w => w.id === selectedProduct.id)) {
                setWishlist(wishlist.filter(w => w.id !== selectedProduct.id));
              } else {
                setWishlist([...wishlist, selectedProduct]);
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* --- AI PHOTO CATALOG SEARCH MODAL --- */}
      <AnimatePresence>
        {isImageSearchOpen && (
          <ImageSearchModal
            isOpen={isImageSearchOpen}
            onClose={() => setIsImageSearchOpen(false)}
            onProductClick={(product) => {
              setSelectedProduct(product);
              setIsImageSearchOpen(false);
            }}
            onAddToCart={(product, qty) => {
              handleAddToCart(product, qty);
              setIsImageSearchOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* --- QUICK BUY SECURE CHECKOUT MODAL --- */}
      <AnimatePresence>
        {quickBuyProduct && (
          <QuickBuyModal
            product={quickBuyProduct}
            isOpen={!!quickBuyProduct}
            onClose={() => setQuickBuyProduct(null)}
            onCheckoutSuccess={(newOrder) => setOrders([newOrder, ...orders])}
          />
        )}
      </AnimatePresence>

      {/* --- SMS CONCIERGE LIAISON MODAL --- */}
      <AnimatePresence>
        {isConciergeOpen && (
          <SMSConciergeModal
            isOpen={isConciergeOpen}
            onClose={() => setIsConciergeOpen(false)}
            userEmail="ndacyayisengagilbert820@gmail.com"
          />
        )}
      </AnimatePresence>

      {/* --- CUSTOMER ACCOUNT PORTAL --- */}
      <AnimatePresence>
        {isCustomerOpen && (
          <CustomerAccount
            isOpen={isCustomerOpen}
            onClose={() => setIsCustomerOpen(false)}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            orders={orders}
            setOrders={setOrders}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* --- ADMIN DASHBOARD --- */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            products={productsList}
            setProducts={setProductsList}
            orders={orders}
            setOrders={setOrders}
          />
        )}
      </AnimatePresence>

      {/* --- WISHLIST DRAWER --- */}
      <AnimatePresence>
        {isWishlistOpen && (
          <WishlistDrawer
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
            wishlist={wishlist}
            onRemoveFromWishlist={(id) => setWishlist(wishlist.filter(w => w.id !== id))}
            onAddToCart={(p) => {
              handleAddToCart(p, 1);
              setIsWishlistOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* --- FLOATING LIVE CHAT ASSISTANT --- */}
      <LiveChat
        products={productsList}
        userEmail="ndacyayisengagilbert820@gmail.com"
        lang={lang}
      />

    </div>
  );
}
