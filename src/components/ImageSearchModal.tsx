import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Camera, Upload, Image as ImageIcon, Sparkles, Check, 
  ArrowRight, Loader2, Info, AlertTriangle, Cpu, Palette, 
  ShoppingCart, Eye, RefreshCw 
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface ImageSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

interface GeminiRecommendation {
  productId: string;
  confidence: number;
  matchReason: string;
  matchTitle: string;
}

interface AnalysisResult {
  detectedProductType: string;
  detectedColorPalette: string;
  recommendations: GeminiRecommendation[];
}

export default function ImageSearchModal({
  isOpen,
  onClose,
  onProductClick,
  onAddToCart
}: ImageSearchModalProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingStep, setLoadingStep] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Animated messages during loading step simulation
  const loadingMessages = [
    "Establishing encrypted connection to Bruce Rii mainframe...",
    "Scanning visual canvas grid nodes for key geometry...",
    "Extracting deep product aesthetic, chassis outline, and profile...",
    "Identifying chrome accents, color spectrum, and device contours...",
    "Correlating detected vector lines with store catalog asset listings...",
    "Formatting AI recommendation models & building similarities score..."
  ];

  useEffect(() => {
    let timer: any;
    if (isAnalyzing) {
      setLoadingStep(0);
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 2400);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [isAnalyzing]);

  if (!isOpen) return null;

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  // Convert file to Base64 and start API call
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setAnalysisError("Invalid file type. Please upload a valid image (PNG, JPG, JPEG).");
      return;
    }

    setAnalysisError(null);
    setResult(null);
    setImageMime(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      // Trigger Gemini Analysis automatically on upload for fluid UX
      analyzeImage(base64String, file.type);
    };
    reader.onerror = () => {
      setAnalysisError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Main API Call to backend
  const analyzeImage = async (base64DataUrl: string, mime: string) => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      // Extract clean raw base64 string without data:image/png;base64, prefix
      const cleanBase64 = base64DataUrl.split(',')[1];
      
      const response = await fetch('/api/recommend-by-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageBase64: cleanBase64,
          mimeType: mime
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status code ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("AI Catalog search error:", err);
      setAnalysisError(err.message || "Failed to analyze image. Please ensure your Gemini API key is valid and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Triggers manual browse
  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  // Triggers mobile camera if supported
  const triggerCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleReset = () => {
    setImagePreview(null);
    setResult(null);
    setAnalysisError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Camera className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <span className="block text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase">AI-Powered Search Engine</span>
              <h3 className="text-sm font-semibold text-white">Visual Catalog Identifier</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Error Banner */}
          {analysisError && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-rose-400 block font-mono">INTELLIGENCE SCAN ERROR</span>
                <p className="text-slate-300 mt-1">{analysisError}</p>
                <button
                  onClick={handleReset}
                  className="mt-3 px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer"
                >
                  Reset & Retry
                </button>
              </div>
            </div>
          )}

          {/* Initial Upload Screen */}
          {!imagePreview && !isAnalyzing && !analysisError && (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 flex flex-col items-center justify-center gap-6 ${
                isDragging 
                  ? 'border-amber-500 bg-amber-500/5' 
                  : 'border-slate-800 hover:border-slate-700 bg-slate-950/20'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-center shadow-lg">
                <Upload className="w-8 h-8 text-amber-500" />
              </div>
              
              <div className="space-y-2 max-w-md">
                <h4 className="text-base font-bold text-white">Upload similar product photo</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Drag and drop any picture of a high-end superbike, supercar, aircraft, or luxury gadget. Our Gemini Vision model will match it with exact matches or visual lookalikes in our catalog.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={triggerBrowse}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/10"
                >
                  <Upload className="w-4 h-4" />
                  Select Image File
                </button>

                <button
                  onClick={triggerCamera}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-amber-500" />
                  Capture Photo
                </button>
              </div>

              {/* Secret inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="text-[10px] text-slate-500 font-mono">
                Supports PNG, JPEG, WEBP files up to 10MB
              </div>
            </div>
          )}

          {/* AI Scanning / Analyzing View */}
          {isAnalyzing && (
            <div className="bg-slate-950 rounded-3xl p-8 border border-slate-850 flex flex-col md:flex-row gap-8 items-center justify-center min-h-[350px]">
              {/* Spinning preview thumbnail with visual overlay */}
              {imagePreview && (
                <div className="relative w-48 aspect-square rounded-2xl overflow-hidden border-2 border-amber-500/30 shrink-0 shadow-2xl">
                  <img 
                    src={imagePreview} 
                    alt="Analyzing..." 
                    className="w-full h-full object-cover opacity-60"
                  />
                  {/* Glowing Laser Scanline Animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-md shadow-amber-500 animate-[bounce_2.5s_infinite]" />
                  <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:8px_8px] opacity-20" />
                </div>
              )}

              {/* Progress Text */}
              <div className="flex-1 space-y-4 max-w-md text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest">AI VISION ENGINE ONLINE</span>
                </div>
                
                <div>
                  <h4 className="text-base font-bold text-white">Analyzing Aesthetic Fingerprints</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Our high-dimensional spatial model is mapping physical contours and body styles against Bruce Rii's stock database.
                  </p>
                </div>

                {/* Animated progress state bar */}
                <div className="space-y-1.5">
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="bg-amber-500 h-full rounded-full"
                      animate={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="block text-[10px] font-mono text-slate-500 text-right">
                    Step {loadingStep + 1} of {loadingMessages.length}
                  </span>
                </div>

                {/* Real-time scanning log snippet */}
                <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                  <p className="text-[10px] font-mono text-slate-300 line-clamp-1">{loadingMessages[loadingStep]}</p>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results Screen */}
          {result && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Uploaded Image Detail */}
              <div className="lg:col-span-4 bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
                  <img 
                    src={imagePreview || ''} 
                    alt="Analyzed source" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-slate-950/80 px-2 py-0.5 rounded-md text-[9px] font-mono text-amber-500 border border-amber-500/20 uppercase tracking-wider">
                    SOURCE IMAGE
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                    <Cpu className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">Aesthetic Diagnostics</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-0.5">Detected Type</span>
                      <span className="font-semibold text-slate-200 capitalize line-clamp-1">{result.detectedProductType}</span>
                    </div>
                    <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-0.5">Colors Spot</span>
                      <span className="font-semibold text-slate-200 capitalize line-clamp-1">{result.detectedColorPalette}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs text-slate-300 font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                    Upload Different Photo
                  </button>
                </div>
              </div>

              {/* Right Column: Catalog Recommendations */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Matched Catalog Treasures</h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Ordered by Similarity Match</span>
                </div>

                <div className="space-y-3">
                  {result.recommendations.map((rec, index) => {
                    // Match with actual catalog product in PRODUCTS
                    const product = PRODUCTS.find(p => p.id === rec.productId);
                    if (!product) return null;

                    return (
                      <div 
                        key={index}
                        className="bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 hover:border-amber-500/30 rounded-2xl p-4.5 flex flex-col md:flex-row gap-4 transition-all duration-300 text-left"
                      >
                        {/* Product Image */}
                        <div className="w-full md:w-32 aspect-video md:aspect-square rounded-xl overflow-hidden border border-slate-900 shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details & AI Match Rationale */}
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <span className="inline-block text-[8px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-widest">
                                {product.subcategory || product.category}
                              </span>
                              <h5 className="text-sm font-bold text-white mt-1 leading-tight">{product.name}</h5>
                            </div>
                            <div className="text-right">
                              <span className="block text-[9px] font-mono text-slate-500 uppercase">Match Strength</span>
                              <span className="text-xs font-mono font-bold text-amber-400">{rec.confidence}% Match</span>
                            </div>
                          </div>

                          {/* Matching progress indicator line */}
                          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" 
                              style={{ width: `${rec.confidence}%` }}
                            />
                          </div>

                          {/* Reason Explanation Box */}
                          <div className="p-2.5 bg-slate-900/60 border border-slate-900 rounded-xl text-xs space-y-1">
                            <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest block">AI Match: {rec.matchTitle}</span>
                            <p className="text-slate-300 font-light leading-relaxed">{rec.matchReason}</p>
                          </div>

                          {/* Price & Primary Actions */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-900/60 mt-3">
                            <div className="font-mono text-sm font-bold text-white">
                              ${product.price.toLocaleString()}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onProductClick(product)}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
                                title="View details & specs"
                              >
                                <Eye className="w-3.5 h-3.5 text-amber-500" />
                                Inspect
                              </button>

                              <button
                                onClick={() => {
                                  onAddToCart(product, 1);
                                }}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-amber-500/10"
                                title="Add matched product to cart"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-6 py-3.5 bg-slate-950/60 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-mono">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            <span>AI search runs server-side on Gemini 3.5-flash</span>
          </div>
          <span>Secure Sandbox Environment</span>
        </div>
      </motion.div>
    </div>
  );
}
