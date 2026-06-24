import { useState } from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}: WishlistDrawerProps) {
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  if (!isOpen) return null;

  const handleToggleCompare = (product: Product) => {
    if (compareList.some(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 products simultaneously.");
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans text-left">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 bg-slate-950 border-b border-slate-850 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-500 fill-amber-500/10" />
              <h3 className="text-sm font-mono font-bold tracking-wider uppercase text-white">Your Saved Portfolio</h3>
              <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full text-[10px] font-mono">
                {wishlist.length}
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* COMPARISON QUICK BAR */}
            {compareList.length > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                    <ArrowRightLeft className="w-4 h-4 text-amber-500" />
                    Compare Queue ({compareList.length}/3)
                  </span>
                  <button
                    onClick={() => setShowCompare(!showCompare)}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    {showCompare ? "Hide Details" : "Compare Specs"}
                  </button>
                </div>
                
                {/* Micro products slots */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400">
                  {compareList.map(p => (
                    <div key={p.id} className="p-1.5 bg-slate-950 border border-slate-850 rounded-lg flex items-center gap-1 justify-between truncate">
                      <span className="truncate text-slate-300">{p.name}</span>
                      <button onClick={() => handleToggleCompare(p)} className="text-rose-400 hover:text-rose-300 cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* EXPANDED SPECS TABLE COMPARISON */}
                {showCompare && (
                  <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-3.5 text-[10px] font-mono">
                    <div className="grid grid-cols-4 gap-2 font-bold border-b border-slate-850 pb-1.5 uppercase text-[9px] text-slate-500">
                      <div>SPEC</div>
                      {compareList.map(p => (
                        <div key={p.id} className="truncate text-slate-300">{p.name}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-1 border-b border-slate-900">
                      <div className="text-slate-500">PRICE</div>
                      {compareList.map(p => (
                        <div key={p.id} className="text-amber-400 font-bold">${p.price}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-1 border-b border-slate-900">
                      <div className="text-slate-500">BRAND</div>
                      {compareList.map(p => (
                        <div key={p.id} className="text-slate-300 truncate">{p.brand}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 py-1">
                      <div className="text-slate-500">RATING</div>
                      {compareList.map(p => (
                        <div key={p.id} className="text-emerald-400 font-bold">★ {p.rating}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST PRODUCTS LIST */}
            {wishlist.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-3 font-light">
                <Heart className="w-12 h-12 text-slate-800 mx-auto stroke-1" />
                <p className="text-sm">Your saved items list is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((product) => {
                  const isInCompare = compareList.some(p => p.id === product.id);
                  return (
                    <div key={product.id} className="p-4 bg-slate-950/50 border border-slate-850 rounded-2xl flex gap-3.5 justify-between items-center hover:border-slate-800 transition-colors">
                      <img src={product.image} className="w-16 h-16 object-cover rounded-xl border border-slate-800 bg-slate-950 shrink-0" alt={product.name} />
                      
                      <div className="flex-1 min-w-0 text-xs">
                        <span className="block font-bold text-white truncate text-sm">{product.name}</span>
                        <span className="block font-mono text-amber-400 font-semibold mt-0.5">${product.price.toLocaleString()}</span>
                        
                        <div className="flex gap-3.5 mt-2 font-mono text-[10px]">
                          <button
                            onClick={() => handleToggleCompare(product)}
                            className={`flex items-center gap-1 cursor-pointer transition-colors ${
                              isInCompare ? 'text-amber-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                            <span>{isInCompare ? "Comparing" : "Compare"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white rounded-xl cursor-pointer transition-colors"
                          title="Add to cart"
                        >
                          <ShoppingCart className="w-4 h-4 text-amber-500" />
                        </button>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="p-2 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 rounded-xl cursor-pointer transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Secure details footer */}
          <div className="p-6 bg-slate-950 border-t border-slate-850/80 text-[10px] font-mono text-slate-500 text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Items are preserved dynamically in secure cookie-encrypted stores.</span>
          </div>

        </div>
      </div>
    </div>
  );
}
