import { motion } from 'motion/react';
import { Star, Eye, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onViewDetails: () => void;
  onAddToCart: () => void;
  onQuickBuy: () => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart, onQuickBuy }: ProductCardProps) {
  // Format price beautifully
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Select primary spec to display on the card (first two specs)
  const previewSpecs = product.specs.slice(0, 2);

  // Category Colors
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'airplane':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'car':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'motorcycle':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'electronic':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700/80 hover:shadow-2xl hover:shadow-slate-950/40 transition-all duration-300"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* Category Overlay Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border ${getCategoryBadge(product.category)}`}>
            {product.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-950/80 text-slate-300 border border-slate-800 font-semibold tracking-wider uppercase">
            {product.subcategory}
          </span>
        </div>

        {/* Quick Quality Tag */}
        {product.isFeatured && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-semibold tracking-wide shadow-md">
            <ShieldCheck className="w-3 h-3" />
            <span>EXOTIC</span>
          </div>
        )}

        {/* Image Hover Quick Actions Panel */}
        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 backdrop-blur-xs">
          <button
            onClick={onViewDetails}
            className="p-3 bg-white text-slate-950 rounded-full hover:bg-amber-400 hover:text-slate-950 hover:scale-110 transition-all duration-200 cursor-pointer shadow-lg"
            title="View Specifications"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={onAddToCart}
            className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 hover:scale-110 transition-all duration-200 cursor-pointer shadow-lg"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={onQuickBuy}
            className="p-3 bg-amber-500 text-slate-950 rounded-full hover:bg-amber-400 hover:scale-110 transition-all duration-200 cursor-pointer shadow-lg animate-pulse"
            title="Instant Purchase"
          >
            <Zap className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 text-left space-y-3">
        <div>
          {/* Brand */}
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">{product.brand}</span>
          {/* Title */}
          <h3 className="text-base font-semibold text-white group-hover:text-amber-400 line-clamp-1 transition-colors mt-0.5">
            {product.name}
          </h3>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1">
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
          <span className="text-xs font-mono font-medium text-slate-300">{product.rating}</span>
          <span className="text-xs text-slate-500">({product.reviewsCount} reviews)</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Spec Pill Badges */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
          {previewSpecs.map((spec, index) => (
            <div key={index} className="bg-slate-950/60 rounded-lg p-2 border border-slate-800/40">
              <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider">{spec.label}</span>
              <span className="block text-[11px] font-medium text-slate-300 truncate font-mono">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Price and Add/Buy Action - Stretched to Bottom */}
        <div className="pt-3 border-t border-slate-800/60 mt-auto flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div>
            <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest">Pricing</span>
            <span className="text-base font-bold font-mono text-white tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex gap-2 w-full xl:w-auto">
            <button
              onClick={onAddToCart}
              className="flex-1 xl:flex-none px-2.5 py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 border border-slate-800"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              <span>Add</span>
            </button>
            <button
              onClick={onQuickBuy}
              className="flex-1 xl:flex-none px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-amber-500/10"
              title="Quick Buy"
            >
              <Zap className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
