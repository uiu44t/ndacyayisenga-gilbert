import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  MapPin, Navigation, Truck, Plane, Bike, Compass, Gauge, 
  Clock, Play, Pause, RotateCcw, AlertCircle, Info, Radio, RefreshCw 
} from 'lucide-react';
import { Order } from '../types';
import { PRODUCTS } from '../data/products';

interface TrackingMapProps {
  order: Order;
}

// Landmark positions on our 400x240 SVG coordinate grid
const LANDMARKS = [
  { name: 'Bruce Rii Hangar Hub', x: 60, y: 180, desc: 'Central Dispatch Facility', type: 'warehouse' },
  { name: 'Nyabugogo Junction', x: 140, y: 130, desc: 'Transit Interchange', type: 'checkpoint' },
  { name: 'Kimihurura Expressway', x: 240, y: 100, desc: 'Eco-Corridor Gateway', type: 'checkpoint' },
  { name: 'Kigali Heights Sector', x: 300, y: 70, desc: 'Local Area Node', type: 'checkpoint' },
  { name: 'User Destination', x: 340, y: 50, desc: 'Secure Drop Location', type: 'destination' }
];

// Generate bezier curve points for smooth transit mapping
function getBezierPoint(t: number, p0: {x: number, y: number}, p1: {x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}) {
  const cX = 3 * (p1.x - p0.x);
  const bX = 3 * (p2.x - p1.x) - cX;
  const aX = p3.x - p0.x - cX - bX;

  const cY = 3 * (p1.y - p0.y);
  const bY = 3 * (p2.y - p1.y) - cY;
  const aY = p3.y - p0.y - cY - bY;

  const x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
  const y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

  return { x, y };
}

export default function TrackingMap({ order }: TrackingMapProps) {
  // Try to determine product category to render correct delivery asset icon
  const productCategory = useMemo(() => {
    const itemName = order.items[0]?.productName || '';
    const foundProduct = PRODUCTS.find(p => p.name === itemName || p.id === order.items[0]?.productId);
    if (foundProduct) return foundProduct.category;
    
    // Fallback classification based on keyword matching
    const nameLower = itemName.toLowerCase();
    if (nameLower.includes('plane') || nameLower.includes('jet') || nameLower.includes('aircraft')) return 'airplane';
    if (nameLower.includes('bike') || nameLower.includes('motorcycle') || nameLower.includes('scooter')) return 'motorcycle';
    if (nameLower.includes('car') || nameLower.includes('auto') || nameLower.includes('truck')) return 'car';
    return 'gear'; // tech gear or miscellaneous items
  }, [order]);

  // Simulation controls state
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1); // multiplier
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);

  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Bezier control points for the dispatch path route
  const startPt = { x: 60, y: 180 };
  const ctrlPt1 = { x: 120, y: 140 };
  const ctrlPt2 = { x: 220, y: 120 };
  const endPt = { x: 340, y: 50 };

  // Set initial default progress based on order status to align with real life
  useEffect(() => {
    if (order.status === 'processing') {
      setProgress(15);
    } else if (order.status === 'shipped') {
      setProgress(55);
    } else if (order.status === 'delivered') {
      setProgress(100);
      setIsPlaying(false);
    }
  }, [order.status]);

  // Animation frame handler
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== null && isPlaying) {
        const deltaTime = (time - previousTimeRef.current) / 1000;
        setProgress((prev) => {
          // Slowly increment, loop back if reached 100
          const increment = (2.5 * simSpeed * deltaTime);
          const next = prev + increment;
          if (next >= 100) {
            return 0; // seamless loop for tracking simulation
          }
          return next;
        });
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, simSpeed]);

  // Calculate current asset coordinates based on bezier route
  const vehiclePos = useMemo(() => {
    return getBezierPoint(progress / 100, startPt, ctrlPt1, ctrlPt2, endPt);
  }, [progress]);

  // Calculate coordinates mock text based on Kigali central grids
  const mockCoordinates = useMemo(() => {
    // Kigali coordinates around -1.9441S, 30.0619E
    const baseLat = -1.9441;
    const baseLng = 30.0619;
    
    // Scale coordinates slightly as vehicle travels
    const deltaLat = (progress / 100) * 0.0382;
    const deltaLng = (progress / 100) * 0.0512;

    return {
      lat: (baseLat + deltaLat).toFixed(5),
      lng: (baseLng + deltaLng).toFixed(5)
    };
  }, [progress]);

  // Estimated arrival calculation
  const minutesRemaining = useMemo(() => {
    if (progress >= 100) return 0;
    const minutes = Math.max(1, Math.floor((100 - progress) * 0.6));
    return minutes;
  }, [progress]);

  // Real-time custom status logging text
  const currentLog = useMemo(() => {
    if (progress < 5) return 'Logistics: Sealed cargo queue approved. System diagnostic OK.';
    if (progress < 25) return 'Logistics: Dispatching via Bruce Rii Premium Cargo Express.';
    if (progress < 45) return 'Logistics: Cleared Nyabugogo Expressway bypass. Velocity stable.';
    if (progress < 70) return 'Logistics: Entering Kimihurura telemetry airspace sector.';
    if (progress < 92) return 'Logistics: Proximity warning triggered. Descending to destination node.';
    if (progress < 100) return 'Logistics: Cargo arrived in zone. Settle validation awaiting signature.';
    return 'Logistics: Touchdown and cargo payload delivered successfully.';
  }, [progress]);

  // Render fitting delivery icon based on product category
  const renderVehicleIcon = () => {
    const iconClass = "w-4 h-4 text-slate-950";
    if (productCategory === 'airplane') return <Plane className={iconClass} />;
    if (productCategory === 'motorcycle') return <Bike className={iconClass} />;
    return <Truck className={iconClass} />; // default to secure armored truck cargo
  };

  return (
    <div className="bg-slate-950/80 border border-slate-850 rounded-2xl p-5 space-y-4 text-left">
      {/* Title & Status Indicator */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </div>
          <div>
            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500">Bruce Rii Air & Ground Geofencing</span>
            <h4 className="text-xs font-semibold text-slate-200 mt-0.5">Live Delivery Route Simulation</h4>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[9px] font-mono text-slate-500 uppercase">Est. Arrival</span>
          <span className="text-xs font-mono font-bold text-amber-400">
            {minutesRemaining > 0 ? `${minutesRemaining} min` : 'ARRIVED'}
          </span>
        </div>
      </div>

      {/* SVG Canvas Map Graphic */}
      <div className="relative w-full aspect-[5/3] md:aspect-[5/2.5] bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        {/* Dynamic Holographic Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />
        
        {/* Radar Scanner Ping Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
          <div className="w-96 h-96 rounded-full border border-amber-500 animate-[ping_3s_infinite]" />
          <div className="absolute inset-0 w-96 h-96 rounded-full border border-amber-500/50 scale-75 animate-[ping_4s_infinite]" />
        </div>

        {/* SVG Path Render */}
        <svg className="w-full h-full absolute inset-0 z-0 p-2" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          <line x1="0" y1="40" x2="400" y2="40" stroke="#0f172a" strokeWidth="0.5" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#0f172a" strokeWidth="0.5" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="#0f172a" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="240" stroke="#0f172a" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="200" y2="240" stroke="#0f172a" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="300" y2="240" stroke="#0f172a" strokeWidth="0.5" />

          {/* Theoretical Topography Terrain Rings */}
          <circle cx="240" cy="100" r="40" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
          <circle cx="240" cy="100" r="80" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.15" />
          <circle cx="60" cy="180" r="25" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2" />

          {/* Dotted Delivery Route Line */}
          <path
            d={`M ${startPt.x} ${startPt.y} C ${ctrlPt1.x} ${ctrlPt1.y}, ${ctrlPt2.x} ${ctrlPt2.y}, ${endPt.x} ${endPt.y}`}
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={`M ${startPt.x} ${startPt.y} C ${ctrlPt1.x} ${ctrlPt1.y}, ${ctrlPt2.x} ${ctrlPt2.y}, ${endPt.x} ${endPt.y}`}
            stroke="url(#route-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />

          {/* Interactive Landmark Pins */}
          {LANDMARKS.map((landmark, idx) => {
            const isDestination = landmark.type === 'destination';
            const isWarehouse = landmark.type === 'warehouse';
            const isSelected = selectedLandmark === landmark.name;

            return (
              <g 
                key={idx} 
                className="cursor-pointer group"
                onClick={() => setSelectedLandmark(isSelected ? null : landmark.name)}
              >
                {/* Ping ring for destinations / hubs */}
                {(isDestination || isWarehouse) && (
                  <circle
                    cx={landmark.x}
                    cy={landmark.y}
                    r="8"
                    fill="none"
                    stroke={isDestination ? '#f43f5e' : '#f59e0b'}
                    strokeWidth="1.5"
                    className="animate-pulse"
                    opacity="0.4"
                  />
                )}

                {/* Point dot */}
                <circle
                  cx={landmark.x}
                  cy={landmark.y}
                  r={isSelected ? "5" : "3.5"}
                  fill={isDestination ? '#f43f5e' : isWarehouse ? '#f59e0b' : '#64748b'}
                  className="transition-all group-hover:scale-125"
                />

                {/* Micro Label */}
                <text
                  x={landmark.x}
                  y={landmark.y - 10}
                  textAnchor="middle"
                  fill={isSelected ? '#f59e0b' : '#94a3b8'}
                  fontSize="7.5"
                  fontWeight={isDestination || isWarehouse || isSelected ? 'bold' : 'normal'}
                  fontFamily="monospace"
                  className="transition-colors pointer-events-none"
                >
                  {landmark.name}
                </text>
              </g>
            );
          })}

          {/* Pulsing Highlight at Current Vehicle Pos */}
          <circle
            cx={vehiclePos.x}
            cy={vehiclePos.y}
            r="12"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            opacity="0.5"
            className="animate-ping"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic moving vehicle node (truck/aircraft) */}
        <div 
          className="absolute z-10 w-7 h-7 bg-amber-500 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 hover:scale-110"
          style={{
            left: `${(vehiclePos.x / 400) * 100}%`,
            top: `${(vehiclePos.y / 240) * 100}%`
          }}
        >
          <div className="animate-spin absolute inset-0 rounded-full border border-dashed border-slate-950/20" />
          {renderVehicleIcon()}
        </div>

        {/* Floating details box for clicked landmark */}
        {selectedLandmark && (
          <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-slate-800 p-2 rounded-lg backdrop-blur-md flex items-start gap-2 text-[10px]">
            <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-left space-y-0.5">
              <span className="font-bold text-slate-200 block font-mono uppercase tracking-wider">{selectedLandmark}</span>
              <p className="text-slate-400 font-light">
                {LANDMARKS.find(l => l.name === selectedLandmark)?.desc || 'Bruce Rii secure transit checkpoint routing system.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Control Scrubber & Interactive Sim Speeds */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-950/40 border border-slate-900 rounded-xl p-3.5">
        
        {/* Play/Pause buttons */}
        <div className="md:col-span-3 flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-amber-500 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Tracker' : 'Play Tracker'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          
          <button
            onClick={() => { setProgress(0); setIsPlaying(true); }}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Restart Route"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed selectors */}
          <div className="flex bg-slate-900/80 rounded-lg p-0.5 border border-slate-850 text-[9px] font-mono">
            {[1, 2, 5].map(speed => (
              <button
                key={speed}
                onClick={() => setSimSpeed(speed)}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${simSpeed === speed ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Scrubber slider bar */}
        <div className="md:col-span-6 flex items-center gap-2.5 w-full">
          <span className="text-[9px] font-mono text-slate-500">0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(progress)}
            onChange={(e) => {
              setIsPlaying(false);
              setProgress(Number(e.target.value));
            }}
            className="flex-1 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-[9px] font-mono text-slate-300">{Math.round(progress)}%</span>
        </div>

        {/* Dynamic coordinate readout */}
        <div className="md:col-span-3 text-right">
          <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">Kigali Grid Node</span>
          <span className="block font-mono text-[10px] text-slate-300 font-semibold tracking-tighter">
            {mockCoordinates.lat}°S, {mockCoordinates.lng}°E
          </span>
        </div>

      </div>

      {/* Cyber Ticker Log message */}
      <div className="p-3 bg-slate-900/40 border border-slate-900/80 rounded-xl flex items-start gap-2.5 text-[10px] text-slate-400 font-mono leading-relaxed">
        <Radio className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
        <p className="flex-1">{currentLog}</p>
      </div>
    </div>
  );
}
