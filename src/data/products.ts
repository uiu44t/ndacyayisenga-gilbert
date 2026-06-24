import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- MOTORCYCLES ---
  {
    id: 'm1',
    name: 'Rii Carbon Stealth-1000',
    category: 'motorcycle',
    subcategory: 'Superbike',
    brand: 'Bruce Rii Motors',
    price: 24500,
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
    description: 'An aggressive, carbon-fiber-clad superbike built for the ultimate track experience and premium street riding. Equipped with custom aerodynamic winglets, adaptive electronic suspension, and a quick-shifter system.',
    specs: [
      { label: 'Engine', value: '998cc Inline-4' },
      { label: 'Top Speed', value: '186 mph (299 km/h)' },
      { label: 'Horsepower', value: '205 hp @ 13,500 RPM' },
      { label: 'Dry Weight', value: '381 lbs (173 kg)' },
      { label: 'Torque', value: '83 lb-ft @ 11,000 RPM' }
    ],
    highlights: [
      'Full ultra-light carbon fiber fairings',
      'Bosch 6-axis IMU with Cornering ABS and Traction Control',
      'Akrapovič titanium racing exhaust system pre-installed',
      'Ohlins Smart EC 2.0 semi-active suspension'
    ],
    stock: 5,
    isFeatured: true
  },
  {
    id: 'm2',
    name: 'Rii Heritage Cafe Racer',
    category: 'motorcycle',
    subcategory: 'Retro Cruiser',
    brand: 'Bruce Rii Motors',
    price: 18900,
    rating: 4.8,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
    description: 'A beautiful blend of mid-century British cafe racer heritage with state-of-the-art chassis engineering. Hand-finished leather seating and brushed aluminum accents deliver an unrivaled classic aesthetic.',
    specs: [
      { label: 'Engine', value: '1200cc Parallel Twin' },
      { label: 'Top Speed', value: '135 mph (217 km/h)' },
      { label: 'Horsepower', value: '98 hp @ 7,250 RPM' },
      { label: 'Seat Height', value: '31.1 in (790 mm)' },
      { label: 'Fuel Capacity', value: '3.8 gal (14.5 L)' }
    ],
    highlights: [
      'Hand-painted fuel tank with double coachlines',
      'Brembo dual-disc front brakes',
      'Custom spoke wheels with retro-profile Pirelli tires',
      'Modern LED headlights with integrated halo DRL'
    ],
    stock: 8,
    isFeatured: false
  },
  {
    id: 'm3',
    name: 'Rii TerraX Adventure 850',
    category: 'motorcycle',
    subcategory: 'Dual Sport / Adventure',
    brand: 'Bruce Rii Motors',
    price: 16200,
    rating: 4.7,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800',
    description: 'Engage in limitless exploration with the TerraX. Designed for cross-continental touring and rugged off-road single tracks, featuring protective crash bars, long-travel suspension, and integrated luggage mounts.',
    specs: [
      { label: 'Engine', value: '853cc Liquid-cooled Parallel Twin' },
      { label: 'Top Speed', value: '120 mph (193 km/h)' },
      { label: 'Horsepower', value: '95 hp @ 8,250 RPM' },
      { label: 'Ground Clearance', value: '9.4 in (240 mm)' },
      { label: 'Travel Front/Rear', value: '9.0 in / 8.6 in' }
    ],
    highlights: [
      'Rugged spoked wheels with tubeless tires',
      'Enduro Pro riding mode with dedicated off-road maps',
      'Heavy-duty aluminum skid plate and handguards',
      'Full-color 6.5-inch TFT display with mobile phone pairing'
    ],
    stock: 12,
    isFeatured: false
  },

  // --- CARS ---
  {
    id: 'c1',
    name: 'Rii Veloce GT EV',
    category: 'car',
    subcategory: 'Electric Hypercar',
    brand: 'Bruce Rii Automotive',
    price: 145000,
    rating: 4.95,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-in-the-night-40283-large.mp4',
    description: 'A breathtaking masterpiece of electrical engineering. The Veloce GT features quad electric motors yielding physics-defying acceleration, cocooned in an incredibly aerodynamic carbon chassis with active wing controls.',
    specs: [
      { label: 'Powertrain', value: 'Quad-Motor AWD (Electric)' },
      { label: 'Acceleration', value: '0-60 mph in 1.85s' },
      { label: 'Horsepower', value: '1,250 hp' },
      { label: 'Battery Range', value: '380 miles (611 km)' },
      { label: 'Charge Speed', value: '10% to 80% in 15 mins (DC Fast)' }
    ],
    highlights: [
      'Carbon-monocoque cell structure for Formula 1-grade safety',
      'Active torque vectoring with dynamic drift control',
      '18-speaker reference studio surround audio system',
      'Biometric driver scanning and smart drive telemetry'
    ],
    stock: 2,
    isFeatured: true,
    model: 'Veloce GT',
    year: 2025,
    fuelType: 'Electric',
    transmission: 'Direct Drive',
    mileage: 50,
    color: 'Hyper Silver',
    condition: 'New',
    engineSize: 'Quad-Motor 950kW',
    isVerifiedVehicle: true,
    warrantyInfo: '5-Year / 100,000 miles Factory Battery & Powertrain Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery Kigali', 'Regional Transport (Rwanda, Uganda)'],
    inspectionReport: {
      overallScore: 99,
      date: '2026-06-15',
      inspector: 'Jean-Claude Nshuti, Lead EV Technician',
      engine: 'Motors outputs perfectly balanced, thermal coolant loop holds optimal bar pressure.',
      brakes: 'Carbon ceramic composite brake calipers at 100% thickness.',
      electrical: 'Full diagnostic sweep complete. Zero faults on the 800V architecture.',
      tires: 'Michelin Pilot Sport EV: 100% tread depth.',
      body: 'Carbon fiber weaves inspected under UV light. 100% flawless structural cohesion.',
      details: 'This vehicle is a pristine factory-spec prototype. Fully street-legal and ready for dispatch in Kigali.'
    }
  },
  {
    id: 'c2',
    name: 'Rii Sovereign Overland V8',
    category: 'car',
    subcategory: 'Luxury SUV',
    brand: 'Bruce Rii Automotive',
    price: 89000,
    rating: 4.8,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-auto-in-the-highway-surrounded-by-nature-41551-large.mp4',
    description: 'The pinnacle of luxury off-roading. Impeccably finished walnut veneers and bespoke Nappa leather upholstery surround a state-of-the-art air suspension that glides over any terrain with absolute composure.',
    specs: [
      { label: 'Engine', value: '4.4L Twin-Turbo V8' },
      { label: 'Horsepower', value: '523 hp' },
      { label: 'Tow Capacity', value: '7,700 lbs (3,492 kg)' },
      { label: 'Transmission', value: '8-Speed Sport Automatic' },
      { label: 'Seating', value: '5 or 7 passengers' }
    ],
    highlights: [
      'Self-leveling electronic active roll-stabilization air suspension',
      'Panoramic sky lounge roof with thousands of LED light points',
      'All-wheel steering with variable low-speed counter-steer',
      'Rear-seat business theater entertainment screens'
    ],
    stock: 6,
    isFeatured: false,
    model: 'Sovereign V8',
    year: 2024,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: 4800,
    color: 'British Racing Green',
    condition: 'Used',
    engineSize: '4.4L V8 Twin-Turbo',
    isVerifiedVehicle: true,
    warrantyInfo: '3-Year / 60,000 miles Certified Pre-Owned Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery Kigali', 'Regional Transport (Rwanda, Uganda)'],
    inspectionReport: {
      overallScore: 96,
      date: '2026-06-18',
      inspector: 'Gilbert Kagabo, SUV Specialist',
      engine: 'Outstanding compression rates across all cylinders. Spark plug gaps within specification. Oil clean.',
      brakes: 'Hydraulic steel braided lines sealed, brake pads at 85% thickness front, 90% rear.',
      electrical: 'Infotainment and active suspension modules updated to latest firmware. All systems nominal.',
      tires: 'Pirelli Scorpion All-Season: 85% tread remaining.',
      body: 'Minor cosmetic paint correction performed on passenger rear quarter panel. Chassis structure 100% green.',
      details: 'A top-tier luxury vehicle in immaculate condition. Previously owned by a diplomatic convoy in Kigali.'
    }
  },
  {
    id: 'c3',
    name: 'Rii Classic Spyder 1965',
    category: 'car',
    subcategory: 'Restomod Roadster',
    brand: 'Bruce Rii Automotive',
    price: 110000,
    rating: 4.9,
    reviewsCount: 9,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vintage-car-driving-down-a-coastal-road-11881-large.mp4',
    description: 'The ultimate nostalgia machine. We have faithfully restored a 1965 classic roadster chassis, retrofitting it with highly reliable modern brakes, electric power steering, and a high-revving modern crate engine.',
    specs: [
      { label: 'Engine', value: '3.6L Naturally Aspirated Flat-6' },
      { label: 'Top Speed', value: '150 mph (241 km/h)' },
      { label: 'Horsepower', value: '320 hp @ 7,800 RPM' },
      { label: 'Transmission', value: '6-Speed Close-Ratio Manual' },
      { label: 'Weight', value: '2,250 lbs (1,020 kg)' }
    ],
    highlights: [
      'Individually serialized custom builder build plate',
      'Hand-stitched vintage tan leather cockpit and luggage straps',
      'Modern concealed Bluetooth audio system with retro dials',
      'Upgraded performance coilover suspension with adjustable damping'
    ],
    stock: 3,
    isFeatured: true,
    model: 'Classic Spyder',
    year: 1965,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: 1200,
    color: 'Guards Red',
    condition: 'Used',
    engineSize: '3.6L Flat-6',
    isVerifiedVehicle: true,
    warrantyInfo: '1-Year Powertrain Warranty from Bruce Rii Motors',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery Kigali'],
    inspectionReport: {
      overallScore: 94,
      date: '2026-05-29',
      inspector: 'Alex Ruhumuza, Restoration Lead',
      engine: 'Modern crate flat-6 operating in absolute harmony. High throttle response. Clean seals.',
      brakes: 'Upgraded modern Wilwood disc brakes: 95% pad thickness.',
      electrical: 'Fully custom rewired wiring harness. Modern reliability retrofitted. Zero errors.',
      tires: 'Continental Retro Classic: 90% tread.',
      body: 'Restored fiberglass panels showing immaculate deep luster finish. No micro-cracking.',
      details: 'An exquisite piece of drivable art. Combines the timeless aesthetics of the 1960s with robust 2026 electronics and power delivery.'
    }
  },

  // --- AIRPLANES ---
  {
    id: 'a1',
    name: 'Rii Stratus Cruiser Jet',
    category: 'airplane',
    subcategory: 'Light Business Jet',
    brand: 'Bruce Rii Aerospace',
    price: 4850000,
    rating: 5.0,
    reviewsCount: 3,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    description: 'A revolutionary personal light jet designed for executive speed, efficiency, and single-pilot operation. Features a gorgeous high-ceiling cabin, carbon-composite fuselage, and state-of-the-art synthetic vision flight decks.',
    specs: [
      { label: 'Engines', value: 'Dual Williams FJ44-1AP-21 Turbofans' },
      { label: 'Max Cruise Speed', value: '415 KTAS (478 mph / 769 km/h)' },
      { label: 'Max Range', value: '1,450 nm (1,668 miles)' },
      { label: 'Cabin Height', value: '4.9 ft (1.5 m)' },
      { label: 'Avionics', value: 'Garmin G3000 Touchscreen Suite' }
    ],
    highlights: [
      'Certified for single-pilot operations',
      'Whole-airframe parachute rescue system for maximum safety',
      'Ultra-efficient turbofans allowing short-field takeoffs',
      'Ergonomic club seating for up to 6 passengers with dynamic ambient lighting'
    ],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'a2',
    name: 'Rii SkyFarer Sport Cub',
    category: 'airplane',
    subcategory: 'Light Sport Aircraft',
    brand: 'Bruce Rii Aerospace',
    price: 135000,
    rating: 4.85,
    reviewsCount: 12,
    image: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate backcountry adventurer. Perfect for grass strips, lake landings (when equipped with optional floats), and weekend cross-country exploration. Built with rugged, light alloys and intuitive touch instruments.',
    specs: [
      { label: 'Engine', value: 'Rotax 912 iS Sport (100 hp)' },
      { label: 'Cruise Speed', value: '115 mph (185 km/h)' },
      { label: 'Useful Load', value: '550 lbs (249 kg)' },
      { label: 'Takeoff Roll', value: '300 ft (91 m) - STOL' },
      { label: 'Fuel Burn Rate', value: '4.8 gph (18 L/h) on Auto Fuel' }
    ],
    highlights: [
      'Short Takeoff and Landing (STOL) design for rough terrain',
      'Premium tundra tires for landing on sandbars, gravel, and grass',
      'Modern glass cockpit with dual iPad mounts and ADS-B traffic warnings',
      'Foldable wings for easy garage storage and trailering'
    ],
    stock: 4,
    isFeatured: false
  },
  {
    id: 'a3',
    name: 'Rii SilentGlide Sailplane',
    category: 'airplane',
    subcategory: 'Performance Glider',
    brand: 'Bruce Rii Aerospace',
    price: 75000,
    rating: 4.9,
    reviewsCount: 7,
    image: 'https://images.unsplash.com/photo-1473842191133-3a5c2229c834?auto=format&fit=crop&q=80&w=800',
    description: 'A pure, exhilarating flight experience. Crafted from state-of-the-art carbon and glass composites, this high-performance sailplane features a massive 15-meter wingspan for unparalleled glide ratios.',
    specs: [
      { label: 'Glide Ratio', value: '42:1 at 54 knots' },
      { label: 'Wingspan', value: '49.2 ft (15 m)' },
      { label: 'Empty Weight', value: '485 lbs (220 kg)' },
      { label: 'Max Speed (VNE)', value: '168 mph (270 km/h)' },
      { label: 'Self-Launch', value: 'Retractable Electric Motor (optional)' }
    ],
    highlights: [
      'Ultra-high aspect ratio wings with flexible tips',
      'Integrated solar panels on the fuselage for auxiliary avionics power',
      'Full safety cockpit cell with energy-absorbing honeycomb bulkheads',
      'Easy-rigging system allowing a single person to assemble the wings in 10 mins'
    ],
    stock: 3,
    isFeatured: false
  },

  // --- ELECTRONICS ---
  {
    id: 'e1',
    name: 'Rii Quantum Book Ultra',
    category: 'electronic',
    subcategory: 'Flagship Laptop',
    brand: 'Bruce Rii Electronics',
    price: 2499,
    rating: 4.9,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    description: 'A powerhouse laptop engineered for developers, graphic artists, and machine learning researchers. Crafted from a single block of grade-5 titanium, featuring a vapor-chamber-cooled neural processor and a gorgeous 120Hz micro-LED screen.',
    specs: [
      { label: 'Processor', value: 'Rii Quantum-9 (16 Cores, 24 Threads)' },
      { label: 'Display', value: '16.2" Mini-LED 3.2K (120Hz, 1600 nits)' },
      { label: 'Memory / Storage', value: '64GB LPDDR5X / 2TB NVMe Gen5 SSD' },
      { label: 'Battery Life', value: 'Up to 22 hours real-world usage' },
      { label: 'Weight', value: '3.6 lbs (1.63 kg)' }
    ],
    highlights: [
      'Onboard 45 TOPS dedicated Neural Processing Unit (NPU) for local AI',
      'Fanless liquid loop cooling system under heavy loads',
      'Tactile opto-mechanical mechanical keyboard with customized backlighting',
      'Thunderbolt 5 integration for massive data bandwidth and multi-display output'
    ],
    stock: 25,
    isFeatured: true
  },
  {
    id: 'e2',
    name: 'Rii Aura Fold Pad X',
    category: 'electronic',
    subcategory: 'Foldable Tablet/Phone',
    brand: 'Bruce Rii Electronics',
    price: 1799,
    rating: 4.75,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    description: 'Revolutionize your workflow with the ultimate flexible device. When folded, it is an elegant, thin 6.4" smartphone; unfolded, it displays a glorious, seamless 8.3" workspace with native pen inputs and advanced multitasking.',
    specs: [
      { label: 'Main Display', value: '8.3" Dynamic Foldable AMOLED 2X (120Hz)' },
      { label: 'Cover Display', value: '6.4" AMOLED (120Hz)' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 5 Elite' },
      { label: 'Cameras', value: 'Triple: 108MP Main + 48MP Zoom + 12MP Ultra-wide' },
      { label: 'Stylus', value: 'Rii Active Stylus with magnetic inductive charging' }
    ],
    highlights: [
      'Virtually invisible waterdrop hinge with 300,000 fold certification',
      'IPX8 underwater waterproof rating',
      'Premium brushed gold and obsidian ceramic back finishes',
      'Intuitive split-screen engine running 4 active apps simultaneously'
    ],
    stock: 15,
    isFeatured: false
  },
  {
    id: 'e3',
    name: 'Rii Sonic Studio Pro',
    category: 'electronic',
    subcategory: 'Studio Headphones',
    brand: 'Bruce Rii Electronics',
    price: 549,
    rating: 4.85,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    description: 'Immerse yourself in acoustic perfection. These reference-grade headphones combine custom planar magnetic drivers with active hybrid noise cancellation to deliver a studio-flat frequency response and lush soundstage.',
    specs: [
      { label: 'Drivers', value: '50mm Custom Planar Magnetic' },
      { label: 'Frequency Response', value: '4Hz - 45,000Hz' },
      { label: 'Noise Cancellation', value: 'Adaptive Hybrid ANC (up to 48dB reduction)' },
      { label: 'Battery Life', value: '60 hours (ANC Off) / 45 hours (ANC On)' },
      { label: 'Audio Codecs', value: 'LDAC, aptX Adaptive, AAC, SBC, Wired Hi-Res' }
    ],
    highlights: [
      'Ultra-comfortable sheepskin leather earpads and memory foam core',
      'Zero-latency wireless audio protocol with included USB-C transceiver',
      'Smart head tracking for real-time 3D spatial audio positioning',
      'Precision machined magnesium-alloy gimbals and arms'
    ],
    stock: 45,
    isFeatured: false
  },
  {
    id: 'e4',
    name: 'Rii Obsidian Mirrorless V',
    category: 'electronic',
    subcategory: 'Cinema Camera',
    brand: 'Bruce Rii Electronics',
    price: 3800,
    rating: 4.9,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    description: 'Designed for cinematographers and high-end studio photographers. The Obsidian features a state-of-the-art medium format back-illuminated sensor, producing breathtaking dynamic range, colors, and 8K uncompressed RAW footage.',
    specs: [
      { label: 'Sensor', value: '61.2 Megapixel Medium Format CMOS' },
      { label: 'Video Capture', value: '8K RAW at 60fps / 4K slow-mo at 120fps' },
      { label: 'Stabilization', value: '5-Axis In-Body Image Stabilization (8.5 Stops)' },
      { label: 'Dynamic Range', value: '16+ Stops of Latitude' },
      { label: 'Media Slots', value: 'Dual CFexpress Type B' }
    ],
    highlights: [
      'Dual-native ISO (800 / 3200) for exceptional low-light performances',
      'Phase-detection autofocus with real-time AI animal, vehicle, and human tracking',
      'Weather-sealed magnesium alloy chassis operating down to -10°C',
      'Native full-size HDMI output for professional recorders'
    ],
    stock: 8,
    isFeatured: true
  },
  {
    id: 'm4',
    name: 'Rii CyberCycle 2026',
    category: 'motorcycle',
    subcategory: 'Electric Superbike',
    brand: 'Bruce Rii Motors',
    price: 29900,
    rating: 4.95,
    reviewsCount: 17,
    image: 'https://images.unsplash.com/photo-1558981852-426c6c22a040?auto=format&fit=crop&q=80&w=800',
    description: 'The definitive future of two-wheeled performance. A silent electric powerhouse engineered with lightweight graphene battery packs, digital mirror-hud integration, and zero-emission instant torque delivery.',
    specs: [
      { label: 'Powertrain', value: '110kW Liquid-Cooled Electric Motor' },
      { label: 'Acceleration', value: '0-60 mph in 2.1 seconds' },
      { label: 'Battery Capacity', value: '24 kWh Graphene Pack' },
      { label: 'Range', value: '210 miles (338 km)' },
      { label: 'Charge Protocol', value: '80% charge in 20 minutes (CCS)' }
    ],
    highlights: [
      'Full cyberpunk carbon-shield aerodynamics',
      'Heads-Up-Display smart helmet pairing via Bluetooth 6.0',
      'Regenerative braking with active traction control mapping',
      'Discreet integrated digital security vault tracking'
    ],
    stock: 3,
    isFeatured: true
  },
  {
    id: 'm5',
    name: 'Rii Scrambler Urban S',
    category: 'motorcycle',
    subcategory: 'Street Scrambler',
    brand: 'Bruce Rii Motors',
    price: 14500,
    rating: 4.78,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate minimalist street crawler. Purpose-built for urban lanes and gravel escapes, carrying high-ground clearance suspension, scrambler spoked wheels, and deep guttural exhaust notes.',
    specs: [
      { label: 'Engine', value: '800cc L-Twin Desmodromic' },
      { label: 'Power', value: '73 hp @ 8,250 RPM' },
      { label: 'Torque', value: '49 lb-ft @ 5,750 RPM' },
      { label: 'Transmission', value: '6-Speed Constant Mesh' },
      { label: 'Dry Weight', value: '375 lbs (170 kg)' }
    ],
    highlights: [
      'Rugged brushed steel fuel tank inserts',
      'LED projector lights with aluminum stone guard',
      'Premium Pirelli Scorpion Rally STR tires',
      'Under-seat secure smart device charging pod'
    ],
    stock: 7,
    isFeatured: false
  },
  {
    id: 'c4',
    name: 'Rii Monolith Armored SUV',
    category: 'car',
    subcategory: 'Tactical Luxury SUV',
    brand: 'Bruce Rii Automotive',
    price: 195000,
    rating: 4.98,
    reviewsCount: 8,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
    description: 'An absolute fortress on wheels. Outfitted with ballistic level-6 armored shielding and run-flat defense networks, completely cocooned inside bespoke executive-lounge seating with climate control and premium acoustic silence.',
    specs: [
      { label: 'Engine', value: '6.2L Supercharged V8' },
      { label: 'Armor Grade', value: 'CEN BR6 Ballistic Protection' },
      { label: 'Horsepower', value: '650 hp' },
      { label: 'Suspension', value: 'Heavy Duty Air Lift Adaptive' },
      { label: 'Weight', value: '7,800 lbs (3,538 kg)' }
    ],
    highlights: [
      'Bulletproof military-grade glass and run-flat safety wheels',
      'Cabin air-filtration defense system against gas exposure',
      'Bespoke executive hot-stone massage leather seating',
      '360-degree night-vision thermal camera suite'
    ],
    stock: 2,
    isFeatured: true
  },
  {
    id: 'c5',
    name: 'Rii AeroCoupe Concept',
    category: 'car',
    subcategory: 'Futuristic Roadster',
    brand: 'Bruce Rii Automotive',
    price: 160000,
    rating: 4.9,
    reviewsCount: 11,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800',
    description: 'A visual spectacle and performance juggernaut. Inspired by fighter-jet aerodynamics, the AeroCoupe integrates a canopy roof, digital steering yoke, and a high-revving hybrid propulsion system for unparalleled track precision.',
    specs: [
      { label: 'Powertrain', value: 'Twin-Turbo V6 Hybrid' },
      { label: 'Power output', value: '820 hp combined' },
      { label: '0-60 mph', value: '2.4 seconds' },
      { label: 'Top Speed', value: '215 mph (346 km/h)' },
      { label: 'Aerodynamics', value: 'Active variable venturi wings' }
    ],
    highlights: [
      'Pneumatic fighter-jet style bubble canopy entry',
      'Synthetic carbon fiber steering yoke with integrated telemetry',
      'Brembo carbon-ceramic race track brake calipers',
      'Advanced virtual reality HUD projection glass windshield'
    ],
    stock: 4,
    isFeatured: false
  },
  {
    id: 'a4',
    name: 'Rii Apex Jet eVTOL',
    category: 'airplane',
    subcategory: 'Electric VTOL',
    brand: 'Bruce Rii Aerospace',
    price: 1250000,
    rating: 4.96,
    reviewsCount: 5,
    image: 'https://images.unsplash.com/photo-1473842191133-3a5c2229c834?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate urban aviation solution. The Apex Jet eVTOL enables vertical take-offs and landings from high-rise pads or personal estates, transitioning into high-speed wings-borne horizontal cruise silently.',
    specs: [
      { label: 'Propulsion', value: '8x Tilting Electric Vector Rotors' },
      { label: 'Takeoff Type', value: 'eVTOL (Vertical Take-off & Landing)' },
      { label: 'Cruise Speed', value: '180 mph (290 km/h)' },
      { label: 'Max Range', value: '150 miles (241 km)' },
      { label: 'Passenger Capacity', value: '4 Passengers + Luggage' }
    ],
    highlights: [
      'Triple-redundant fly-by-wire flight computer automation',
      'Ultra-silent acoustic signature for residential compliance',
      'Whole-cabin rocket parachute emergency system',
      'Bespoke luxury carbon-fiber interior shell'
    ],
    stock: 1,
    isFeatured: true
  },
  {
    id: 'e5',
    name: 'Rii Neural Ring Gen-1',
    category: 'electronic',
    subcategory: 'Biometric Wearable',
    brand: 'Bruce Rii Electronics',
    price: 399,
    rating: 4.82,
    reviewsCount: 144,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800',
    description: 'The future of personal tracking on your finger. Crafted from premium surgical aerospace titanium, this lightweight ring monitors heart-rate variability, blood-oxygen, galvanic skin responses, and sleep architecture securely.',
    specs: [
      { label: 'Material', value: 'Aerospace Grade 5 Titanium' },
      { label: 'Sensor Grid', value: 'Infrared PPG, NTC temperature, 3D accelerometer' },
      { label: 'Battery', value: 'Up to 8 days on a single wireless charge' },
      { label: 'Weight', value: '2.4 grams (ultra-light)' },
      { label: 'Waterproof', value: 'IP68 up to 100 meters' }
    ],
    highlights: [
      'Encrypted on-device wellness dashboard syncing',
      'Hypoallergenic non-metallic inner molding',
      'Smart vibration alarms with stress tracking algorithms',
      'Discreet gesture controller mapping for smart home devices'
    ],
    stock: 50,
    isFeatured: false
  },
  {
    id: 'e6',
    name: 'Rii HoloLens Prime',
    category: 'electronic',
    subcategory: 'AR Holographic Glasses',
    brand: 'Bruce Rii Electronics',
    price: 1499,
    rating: 4.88,
    reviewsCount: 61,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800',
    description: 'Experience overlay computing in real-time. Unbelievably lightweight and styled like everyday designer spectacles, projecting high-resolution micro-LED holographic displays over your natural field of view.',
    specs: [
      { label: 'Display Optics', value: 'Dual Waveguide Micro-LED Projectors' },
      { label: 'Hologram Resolution', value: '2K per eye at 120Hz refresh' },
      { label: 'Spatial Sensing', value: 'ToF depth cameras, 6DoF head tracking' },
      { label: 'Processor', value: 'Rii Silicon Eye-1 Wearable SOC' },
      { label: 'Weight', value: '75 grams (all-day comfort)' }
    ],
    highlights: [
      'Seamless everyday transparent lenses with active transition dimming',
      'Spatial spatial-audio drivers integrated into the temple arms',
      'Intuitive eye-gaze tracking and finger-pinch gestures',
      'Onboard offline instant voice-concierge command response'
    ],
    stock: 20,
    isFeatured: true,
    reviews: [
      { id: 'rev-e6-1', userName: 'Gilbert N.', rating: 5, comment: 'Phenomenal augmented reality clarity. Seamlessly overlays workspace documents. Excellent!', date: '2026-05-12', isVerified: true },
      { id: 'rev-e6-2', userName: 'Alice K.', rating: 4, comment: 'Sleek and lightweight, but the voice recognition has a slight latency in noisy areas.', date: '2026-06-01', isVerified: true }
    ]
  },
  {
    id: 's1',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphone',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    price: 1299,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    description: 'The pinnacle of mobile intelligence. Powered by Galaxy AI, this flagship features a titanium frame, an embedded S Pen, and an industry-leading 200MP camera system for breathtaking low-light photography.',
    specs: [
      { label: 'Processor', value: 'Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X, QHD+, 120Hz' },
      { label: 'Camera', value: '200MP Main + 50MP Periscope + 12MP Ultra-wide' },
      { label: 'Battery', value: '5,000 mAh with 45W Fast Charging' },
      { label: 'Storage', value: '512GB UFS 4.0' }
    ],
    highlights: [
      'Galaxy AI features including Live Translate and Circle to Search',
      'Extremely durable Grade 5 Titanium armor frame',
      'Corning Gorilla Armor anti-reflective glass screen',
      'Integrated Bluetooth-enabled digital S Pen'
    ],
    stock: 25,
    isFeatured: true,
    reviews: [
      { id: 'rev-s1-1', userName: 'Gilbert Ndacyayisenga', rating: 5, comment: 'The zoom capabilities are unbelievable! S Pen is super convenient for remote shutter and signing invoices.', date: '2026-06-20', isVerified: true }
    ]
  },
  {
    id: 's2',
    name: 'Apple iPhone 15 Pro Max',
    category: 'smartphone',
    subcategory: 'Smartphones',
    brand: 'Apple',
    price: 1199,
    rating: 4.88,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever with 5x optical telephoto lens.',
    specs: [
      { label: 'Processor', value: 'A17 Pro with 6-core GPU' },
      { label: 'Display', value: '6.7" Super Retina XDR OLED, ProMotion 120Hz' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra-Wide + 12MP 5x Telephoto' },
      { label: 'Weight', value: '221 grams' },
      { label: 'Connector', value: 'USB-C with USB 3 speeds' }
    ],
    highlights: [
      'Aerospace-grade titanium design with contoured edges',
      'Action button mapping for quick shortcuts',
      'Next-generation portraits with Focus and Depth Control',
      'Apple Intelligence compatible high-performance neural engine'
    ],
    stock: 18,
    isFeatured: true,
    reviews: [
      { id: 'rev-s2-1', userName: 'Alex M.', rating: 5, comment: 'Super light compared to previous Pro Max models. Video stabilization is unmatched.', date: '2026-06-18', isVerified: true }
    ]
  },
  {
    id: 'l1',
    name: 'Apple MacBook Pro 16" M3 Max',
    category: 'laptop',
    subcategory: 'Laptops',
    brand: 'Apple',
    price: 3499,
    rating: 4.96,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate portable powerhouse for creators, developers, and engineers. Leveraging Apple Silicon M3 Max with a 16-core CPU, 40-core GPU, and an astonishing Liquid Retina XDR screen.',
    specs: [
      { label: 'Processor', value: 'Apple M3 Max (16-Core CPU, 40-Core GPU)' },
      { label: 'Memory', value: '48GB Unified Memory' },
      { label: 'Storage', value: '1TB Superfast SSD' },
      { label: 'Display', value: '16.2" Liquid Retina XDR (3456 x 2234), 1600 nits' },
      { label: 'Battery Life', value: 'Up to 22 hours video playback' }
    ],
    highlights: [
      'Mind-blowing hardware-accelerated ray tracing and mesh shading',
      'Immersive six-speaker sound system with force-cancelling woofers',
      'Studio-quality three-mic array with high signal-to-noise ratio',
      'Stunning Space Black finish with anodized fingerprint-resistance'
    ],
    stock: 10,
    isFeatured: true,
    reviews: [
      { id: 'rev-l1-1', userName: 'N. Gilbert', rating: 5, comment: 'Brings compiling times to milliseconds. The display is a work of art.', date: '2026-06-22', isVerified: true }
    ]
  },
  {
    id: 'l2',
    name: 'Dell XPS 15 OLED Touch',
    category: 'laptop',
    subcategory: 'Laptops',
    brand: 'Dell',
    price: 1999,
    rating: 4.79,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
    description: 'Precision crafted from CNC aluminum and carbon fiber, this stunning creator laptop boasts a 3.5K OLED InfinityEdge touch display and powerful Intel Core i9 performance.',
    specs: [
      { label: 'Processor', value: 'Intel Core i9-13900H (14 Cores)' },
      { label: 'Graphics', value: 'NVIDIA GeForce RTX 4060 (8GB GDDR6)' },
      { label: 'Memory', value: '32GB DDR5 Dual Channel' },
      { label: 'Display', value: '15.6" 3.5K (3456x2160) OLED Touchscreen' },
      { label: 'Storage', value: '1TB NVMe PCIe Gen4 SSD' }
    ],
    highlights: [
      'Stunning 4-sided InfinityEdge screen with 92.9% screen-to-body ratio',
      '100% Adobe RGB color space coverage for studio-grade editing',
      'Bespoke carbon fiber aerospace composite palm rest',
      'Quad-speaker setup calibrated with Waves Nx 3D audio'
    ],
    stock: 12,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'l3',
    name: 'HP Spectre x360 2-in-1',
    category: 'laptop',
    subcategory: 'Laptops',
    brand: 'HP',
    price: 1599,
    rating: 4.82,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
    description: 'Fusing luxury craftsmanship with premium convertible versatility. Rotate 360 degrees into a digital notebook with pen input, powered by Intel Evo platform with active smart cooling.',
    specs: [
      { label: 'Processor', value: 'Intel Core Ultra 7 155H with AI Boost' },
      { label: 'Graphics', value: 'Intel Arc Graphics' },
      { label: 'Display', value: '14" 2.8K (2880 x 1800) OLED Convertible Touch' },
      { label: 'Memory', value: '16GB LPDDR5x' },
      { label: 'Security', value: 'IR Face Recognition & Fingerprint Reader' }
    ],
    highlights: [
      'Gem-cut double-anodized aluminum chassis edges',
      'Included rechargeable HP Tilt Stylus Pen with magnetic dock',
      '9MP high-resolution camera with hardware shutter switch',
      'Tuned by Bang & Olufsen quad speaker array'
    ],
    stock: 15,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'l4',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    category: 'laptop',
    subcategory: 'Laptops',
    brand: 'Lenovo',
    price: 1849,
    rating: 4.89,
    reviewsCount: 153,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
    description: 'The legendary premier enterprise laptop. Engineered with woven carbon fiber top cover, tracking red point, and military-grade durability compliance, keeping you online securely anywhere.',
    specs: [
      { label: 'Processor', value: 'Intel Core Ultra 7 165U vPro' },
      { label: 'Memory', value: '32GB LPDDR5x (Soldered)' },
      { label: 'Storage', value: '1TB PCIe Gen4 Performance SSD' },
      { label: 'Display', value: '14" WUXGA (1920x1200) IPS Low Power Anti-Glare' },
      { label: 'Weight', value: '2.42 lbs (1.09 kg)' }
    ],
    highlights: [
      'Mil-Spec 810H extreme pressure, temperature, and shock testing',
      'Unmatched tactile comfortable keyboard with spill resistance',
      'Self-healing system firmware shields and dTPM 2.0 safety',
      'Carbon-neutral manufacturing and packaging materials'
    ],
    stock: 14,
    isFeatured: true,
    reviews: []
  },
  {
    id: 't1',
    name: 'Apple iPad Pro 12.9" M2',
    category: 'tablet',
    subcategory: 'Tablets',
    brand: 'Apple',
    price: 1099,
    rating: 4.91,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    description: 'Stunning performance with the M2 chip. Features a Liquid Retina XDR screen with extreme dynamic range and superfast Wi-Fi 6E connectivity, ideal for pro drawing and modeling.',
    specs: [
      { label: 'Processor', value: 'Apple M2 Chip with 8-Core CPU' },
      { label: 'Display', value: '12.9" Liquid Retina XDR, Mini-LED' },
      { label: 'Storage', value: '256GB' },
      { label: 'Camera', value: '12MP Wide + 10MP Ultra Wide + LiDAR Scanner' },
      { label: 'Connectivity', value: 'Wi-Fi 6E & Thunderbolt 4' }
    ],
    highlights: [
      'Liquid Retina XDR screen with 1,000,000:1 contrast ratio',
      'Apple Pencil 2nd Gen hover-sensing mechanics',
      'Advanced LiDAR scanner for precise AR depth maps',
      'Studio-quality 5-microphone array with 4-speaker sound'
    ],
    stock: 20,
    isFeatured: false,
    reviews: []
  },
  {
    id: 't2',
    name: 'Samsung Galaxy Tab S9 Ultra',
    category: 'tablet',
    subcategory: 'Tablets',
    brand: 'Samsung',
    price: 1199,
    rating: 4.87,
    reviewsCount: 135,
    image: 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&q=80&w=800',
    description: 'The largest, most powerful Android tablet. Waterproof casing, expansive Dynamic AMOLED 2X, and the S Pen included right in the box for ultimate workflow creation.',
    specs: [
      { label: 'Processor', value: 'Snapdragon 8 Gen 2 for Galaxy' },
      { label: 'Display', value: '14.6" Dynamic AMOLED 2X, 120Hz' },
      { label: 'Water Protection', value: 'IP68 Dust & Water Resistant' },
      { label: 'Memory', value: '12GB RAM' },
      { label: 'Battery', value: '11,200 mAh with 45W Charging' }
    ],
    highlights: [
      'Massive 14.6-inch screen with ultra-slim bezels',
      'Armor Aluminum frame with extreme shock resistance',
      'Included IP68-rated Bluetooth S Pen Stylus',
      'Seamless multi-control and second-screen Windows mapping'
    ],
    stock: 15,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'w1',
    name: 'Apple Watch Ultra 2',
    category: 'smartwatch',
    subcategory: 'Smart Watches',
    brand: 'Apple',
    price: 799,
    rating: 4.93,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=800',
    description: 'The rugged, capable, limit-pushing adventure watch. Aerospace titanium frame, dual-frequency GPS, up to 72 hours of battery in low power, and our brightest display ever.',
    specs: [
      { label: 'Material', value: '49mm Aerospace Titanium Case' },
      { label: 'Display Brightness', value: '3,000 nits Peak Retina Screen' },
      { label: 'Battery', value: 'Up to 36 hours regular / 72 hours low-power' },
      { label: 'Water Resistance', value: '100m, Recreational dive to 40m' },
      { label: 'GPS', value: 'Precision dual-frequency L1 + L5 GPS' }
    ],
    highlights: [
      'Dual-tap gesture to answer calls or toggle menus hands-free',
      'Customizable Action button to mark loops and map compass coordinates',
      'Dual-speaker system with 86-decibel emergency siren beacon',
      'Depth gauge with real-time water temperature metrics'
    ],
    stock: 22,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'w2',
    name: 'Samsung Galaxy Watch 6 Classic',
    category: 'smartwatch',
    subcategory: 'Smart Watches',
    brand: 'Samsung',
    price: 399,
    rating: 4.76,
    reviewsCount: 168,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
    description: 'Returning the iconic rotating physical bezel. Track workouts, heart rhythms, and sleep stages seamlessly with refined stainless steel contours.',
    specs: [
      { label: 'Material', value: '47mm Stainless Steel Case' },
      { label: 'Bezel', value: 'Physical Interactive Rotating Bezel' },
      { label: 'Sensors', value: 'BioActive Sensor (HR, ECG, BIA), Temp sensor' },
      { label: 'Glass', value: 'Sapphire Crystal Screen Cover' },
      { label: 'OS', value: 'Wear OS Powered by Samsung' }
    ],
    highlights: [
      'Classic rotating dial for easy notification navigation',
      'Advanced Body Composition analysis (BIA metric tracking)',
      'Customized heart rate training zones for optimal fitness',
      'Enhanced sleep coaching with structural night telemetry logs'
    ],
    stock: 30,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'h1',
    name: 'Sony WH-1000XM5 ANC Headphones',
    category: 'headphone',
    subcategory: 'Headphones',
    brand: 'Sony',
    price: 399,
    rating: 4.92,
    reviewsCount: 652,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800',
    description: 'The golden benchmark in wireless active noise cancellation. Eight microphones, auto NC optimizer, and breathtaking audio fidelity via LDAC code resolution.',
    specs: [
      { label: 'ANC Tech', value: 'Dual Processors (QN1 + V1) & 8 Mics' },
      { label: 'Driver Size', value: '30mm Specially Designed Carbon Dome' },
      { label: 'Battery Life', value: 'Up to 30 hours (ANC On) / 38 hours (ANC Off)' },
      { label: 'Codec', value: 'LDAC, AAC, SBC with DSEE Extreme scaling' },
      { label: 'Charging', value: '3 hours of power on 3 minutes quick charge' }
    ],
    highlights: [
      'Speak-to-Chat pauses music automatically when you start talking',
      'Precise Voice Pickup technology with wind-noise reduction arrays',
      'Ultra-comfortable, lightweight noiseless design with soft-fit leather',
      'Multipoint connection to pair with two separate devices simultaneously'
    ],
    stock: 40,
    isFeatured: true,
    reviews: [
      { id: 'rev-h1-1', userName: 'Gilbert', rating: 5, comment: 'Silence is absolute. Recommended for long flights.', date: '2026-06-15', isVerified: true }
    ]
  },
  {
    id: 'h2',
    name: 'Apple AirPods Pro 2 (USB-C)',
    category: 'headphone',
    subcategory: 'Headphones',
    brand: 'Apple',
    price: 249,
    rating: 4.85,
    reviewsCount: 489,
    image: 'https://images.unsplash.com/photo-1588444839799-6686de78125f?auto=format&fit=crop&q=80&w=800',
    description: 'Up to 2x more Active Noise Cancellation than previous generation. Richer audio depth, Adaptive Audio, and a USB-C MagSafe tracking charging case.',
    specs: [
      { label: 'Processor', value: 'Apple H2 Headphone Silicon Chip' },
      { label: 'Case Tracker', value: 'U1 Chip with Precision Finding locator' },
      { label: 'Acoustic Modes', value: 'Adaptive Audio, Transparency, ANC' },
      { label: 'Water Protection', value: 'IP54 sweat & dust resistant' },
      { label: 'Control', value: 'Touch volume sliders directly on stems' }
    ],
    highlights: [
      'Dynamic spatial audio tracking for three-dimensional movies',
      'Loud noise reduction protection in Transparency mode',
      'Lanyard loop and speaker integrated directly into charging case',
      'Bespoke custom low-distortion audio driver'
    ],
    stock: 50,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'sp1',
    name: 'Sonos Era 300 Smart Speaker',
    category: 'speaker',
    subcategory: 'Speakers',
    brand: 'Sonos',
    price: 449,
    rating: 4.81,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
    description: 'With next-level spatial audio, the Sonos Era 300 doesn’t just play sound; it places it all around you. Six optimally placed drivers project left, right, forward, and overhead.',
    specs: [
      { label: 'Drivers', value: '6 Class-D Digital Amplifiers, 4 Tweeters, 2 Woofers' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.0, AirPlay 2' },
      { label: 'Acoustics', value: 'Dolby Atmos Spatial Audio Calibration' },
      { label: 'Tuning', value: 'Trueplay Room Optimization via iOS/Android' },
      { label: 'Smart Voice', value: 'Sonos Voice Control & Amazon Alexa built-in' }
    ],
    highlights: [
      'Revolutionary hourglass architecture designed for spatial dispersion',
      'Aux line-in connectivity via Sonos Combo Adapter',
      'Trueplay auto-adjusts sound to match room acoustics',
      'Physical mic-mute hardware switch for absolute privacy protection'
    ],
    stock: 12,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'tv1',
    name: 'Sony Bravia XR OLED A95L',
    category: 'tv',
    subcategory: 'TVs & Home Entertainment',
    brand: 'Sony',
    price: 2799,
    rating: 4.97,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800',
    description: 'Our flagship Quantum-Dot OLED TV. Breathtaking color saturation, pure deep blacks, and the Cognitive Processor XR that mirrors how humans see and hear.',
    specs: [
      { label: 'Panel', value: 'QD-OLED (Quantum Dot OLED)' },
      { label: 'Processor', value: 'Cognitive Processor XR' },
      { label: 'Sound', value: 'Acoustic Surface Audio+ (Screen vibrating sound)' },
      { label: 'Gaming Features', value: '4K/120Hz, VRR, ALLM, Auto HDR Mapping' },
      { label: 'Platform', value: 'Google TV with Bravia Core streaming' }
    ],
    highlights: [
      'Bravia Cam included for automatic sound/picture focal adjustments',
      'Acoustic surface acts as a premium center-channel speaker',
      'Perfect for PS5 with customized auto-toning profiles',
      'Minimalist seamless metal edge bezel profile design'
    ],
    stock: 5,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'acc1',
    name: 'Anker Prime 20,000mAh Power Bank',
    category: 'accessory',
    subcategory: 'Accessories',
    brand: 'Sony',
    price: 129,
    rating: 4.84,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=800',
    description: 'High-speed smart multi-port power bank. Deliver up to 200W of combined power outputs to quickly charge dual MacBooks and phones on the go.',
    specs: [
      { label: 'Capacity', value: '20,000 mAh High-Density Cells' },
      { label: 'Output Total', value: '200W Max Shared Output' },
      { label: 'Port Layout', value: '2x USB-C + 1x USB-A ports' },
      { label: 'Display Screen', value: 'Smart Interactive Color Screen Panel' },
      { label: 'Recharge Speed', value: 'Fully refilled in 1.1 hours at 100W input' }
    ],
    highlights: [
      'Smart color display gives real-time stats on power flows',
      'Ultra-compact design easily fits into briefcase or travel pouches',
      'ActiveShield 2.0 monitors temperature 3,000,000 times daily',
      'Pliable protective shielding guards against standard drops'
    ],
    stock: 45,
    isFeatured: false,
    reviews: []
  },
  // --- EXTRA VEHICLES (TOYOTA, HONDA, NISSAN, HYUNDAI, BMW, MERCEDES-BENZ) ---
  {
    id: 'v1',
    name: 'Toyota Land Cruiser Prado TX-L',
    category: 'car',
    subcategory: 'SUVs',
    brand: 'Toyota',
    price: 68500,
    rating: 4.9,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-wheels-spinning-on-a-dirt-road-in-forest-41553-large.mp4',
    description: 'The legendary off-road machine built for heavy-duty terrain and luxury cruising. Equipped with advanced Multi-Terrain Select (MTS) and crawls control systems, fully climate-controlled interior, and 7 executive seats.',
    specs: [
      { label: 'Engine', value: '2.8L 4-Cylinder Turbo Diesel' },
      { label: 'Transmission', value: '6-Speed Super ECT Automatic' },
      { label: 'Drivetrain', value: 'Full-Time 4WD with Torsen LSD' },
      { label: 'Max Power', value: '201 hp @ 3,400 RPM' },
      { label: 'Seating', value: '7 Passengers' }
    ],
    highlights: [
      'Multi-Terrain Select and Crawl Control active assistance',
      'Toyota Safety Sense active driving lane controllers',
      'Dual-zone climate controls with cold box utility console',
      'Highly reinforced ladder frame chassis'
    ],
    stock: 4,
    isFeatured: true,
    model: 'Land Cruiser Prado',
    year: 2023,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: 18500,
    color: 'Blizzard White Pearl',
    condition: 'Used',
    engineSize: '2.8L Turbo',
    isVerifiedVehicle: true,
    warrantyInfo: '2-Year / 50,000 km Certified Pre-Owned Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery Kigali', 'Regional Delivery'],
    inspectionReport: {
      overallScore: 97,
      date: '2026-06-20',
      inspector: 'David Kamari, Senior Mechanics Inspector',
      engine: 'Turbo boost pressure holds constant. Pistons compression perfect. Air intake filters pristine.',
      brakes: 'Hydraulic master cylinder calibrated. Pad life remaining: 90% Front, 88% Rear.',
      electrical: 'All differential locking controls verified. Diagnostic scanner returned 0 codes.',
      tires: 'Bridgestone Dueler A/T: 90% tread depth.',
      body: 'Underbody armor protection intact. No frame damage or chassis alignment drift.',
      details: 'Highly reliable model. Serviced exclusively at certified Toyota service hubs. Fully ready for rugged cross-border trails.'
    }
  },
  {
    id: 'v2',
    name: 'Toyota Hilux GR Sport 4x4',
    category: 'car',
    subcategory: 'Pickup Trucks',
    brand: 'Toyota',
    price: 54000,
    rating: 4.85,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-wheels-spinning-on-a-dirt-road-in-forest-41553-large.mp4',
    description: 'The absolute king of pickup trucks, tuned by Gazoo Racing. Dynamic sports suspension, aggressive wider fender flares, bespoke GR badging, and an upgraded high-output motor.',
    specs: [
      { label: 'Engine', value: '2.8L High-Output Turbo Diesel' },
      { label: 'Torque', value: '550 Nm @ 1,600-2,800 RPM' },
      { label: 'Suspension', value: 'Monotube GR Sports Shock Absorbers' },
      { label: 'Payload Capacity', value: '1,000 kg (1 Ton)' },
      { label: 'Towing Capacity', value: '3,500 kg' }
    ],
    highlights: [
      'GR Sport aggressive black honeycomb front grille',
      'Monotube shock absorbers for extreme high-speed offroad composure',
      '18-inch GR custom alloy wheels with Rugged Terrain tires',
      'Premium black leather seats with red sports stitching and GR logos'
    ],
    stock: 5,
    isFeatured: true,
    model: 'Hilux GR Sport',
    year: 2025,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: 0,
    color: 'Emotional Red II',
    condition: 'New',
    engineSize: '2.8L High-Output',
    isVerifiedVehicle: true,
    warrantyInfo: '5-Year / 150,000 km Toyota Manufacturer Warranty',
    location: 'Kigali Free Zone Depot',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery', 'Nationwide Delivery'],
    inspectionReport: {
      overallScore: 100,
      date: '2026-06-21',
      inspector: 'Toyota Factory Q.A. Kigali',
      engine: 'Brand new, factory original fluid levels, pristine condition.',
      brakes: 'Factory original, 100% thick.',
      electrical: 'All factory diagnostic modules: Checked. 100% nominal state.',
      tires: 'Yokohama Geolandar A/T: 100% tread.',
      body: 'Zero defects. Fully wrapped in protective transit film.',
      details: 'Fresh delivery from assembly plant. Includes 3 spare keys, owner booklet, and factory tooling kit.'
    }
  },
  {
    id: 'v3',
    name: 'Honda Civic Type R (FL5)',
    category: 'car',
    subcategory: 'Cars',
    brand: 'Honda',
    price: 49900,
    rating: 4.95,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-in-the-night-40283-large.mp4',
    description: 'The pinnacle of front-wheel-drive performance. Features the legendary K20C1 VTEC Turbo engine, a close-ratio 6-speed manual transmission with standard rev-match, and a highly tuned aerodynamic body kit for high downforce.',
    specs: [
      { label: 'Engine', value: '2.0L VTEC Turbo Inline-4' },
      { label: 'Horsepower', value: '315 hp @ 6,500 RPM' },
      { label: 'Transmission', value: '6-Speed Manual with Rev-Match' },
      { label: '0-60 mph', value: '5.3 seconds' },
      { label: 'Top Speed', value: '170 mph (273 km/h)' }
    ],
    highlights: [
      'Active exhaust valve with signature triple-outlet tips',
      'High-performance Brembo front brakes with two-piece rotors',
      '9-inch touchscreen display with custom LogR telemetry data',
      'Bespoke red suede bucket seats and red carpets'
    ],
    stock: 2,
    isFeatured: true,
    model: 'Civic Type R',
    year: 2024,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: 1800,
    color: 'Championship White',
    condition: 'Used',
    engineSize: '2.0L Turbo',
    isVerifiedVehicle: true,
    warrantyInfo: '3-Year / 100,000 km Honda Factory Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery'],
    inspectionReport: {
      overallScore: 98,
      date: '2026-06-11',
      inspector: 'Sano Blaise, Performance Tuner',
      engine: 'High throttle compression, clean exhaust manifold, ECU logs confirm zero over-rev events.',
      brakes: 'Brembo compound: 90% pads remaining. Rotors are perfectly flat.',
      electrical: 'Custom LogR lap timer and sensors synchronized. All steering sensors calibrated.',
      tires: 'Michelin Pilot Sport 4S: 90% tread depth.',
      body: 'Original Championship White paint with zero paint chips. Rear spoiler mounts torqued.',
      details: 'Exquisite condition. Completely stock vehicle with no aftermarket engine tunes.'
    }
  },
  {
    id: 'v4',
    name: 'Mercedes-Benz EQG Electric G-Class',
    category: 'car',
    subcategory: 'Electric Vehicles (EVs)',
    brand: 'Mercedes-Benz',
    price: 168000,
    rating: 4.98,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-in-the-night-40283-large.mp4',
    description: 'The legendary Geländewagen goes fully electric. Carrying four individually controlled electric motors near the wheels, enabling advanced capabilities like the "G-Turn" 360 tank spin on the spot.',
    specs: [
      { label: 'Powertrain', value: '4 Independent Electric Motors' },
      { label: 'Total Horsepower', value: '579 hp' },
      { label: 'Total Torque', value: '855 lb-ft' },
      { label: 'Battery Capacity', value: '116 kWh High-Density' },
      { label: 'Special Capability', value: 'G-Turn & G-Steering active torque spin' }
    ],
    highlights: [
      'Four-motor layout allowing complete torque vectoring on offroad routes',
      'Robust underbody protection featuring highly innovative carbon-silicon shield',
      'Exclusive interior luxury finish with MBUX Hyperscreen cockpit',
      'Simulated low frequency electric dynamic roar sound modes'
    ],
    stock: 1,
    isFeatured: true,
    model: 'EQG 580',
    year: 2025,
    fuelType: 'Electric',
    transmission: 'Direct Drive',
    mileage: 120,
    color: 'Two-Tone Obsidian Black & High-Gloss Silver',
    condition: 'New',
    engineSize: 'Quad-Motor 432kW',
    isVerifiedVehicle: true,
    warrantyInfo: '8-Year / 160,000 km Mercedes EV Battery Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery'],
    inspectionReport: {
      overallScore: 99,
      date: '2026-06-22',
      inspector: 'Alain Ndenga, certified Mercedes EV technician',
      engine: 'Stator coils resistance balanced. Dynamic inverter thermals perfectly stabilized.',
      brakes: 'Regenerative braking system calibrated. Hydraulic backing calipers at 100% thick.',
      electrical: 'High-voltage safety relays and disconnect blocks verified. Diagnostic log is pristine.',
      tires: 'Michelin Latitude Sport 3: 100% tread.',
      body: 'Two-tone finish verified with sonic paint thickness gauge. Perfect consistency.',
      details: 'Showroom display car. Ready for immediate deployment with pre-configured home charging station.'
    }
  },
  {
    id: 'v5',
    name: 'Nissan Navara PRO-4X 4WD',
    category: 'car',
    subcategory: 'Pickup Trucks',
    brand: 'Nissan',
    price: 39500,
    rating: 4.78,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-wheels-spinning-on-a-dirt-road-in-forest-41553-large.mp4',
    description: 'Rugged toughness meets modern luxury. The PRO-4X edition is Nissans ultimate rugged utility pickup, with black sporty decals, off-road shock absorbers, all-terrain tires, and utility rail cargo system.',
    specs: [
      { label: 'Engine', value: '2.5L Intercooled Twin-Turbo Diesel' },
      { label: 'Power', value: '187 hp @ 3,600 RPM' },
      { label: 'Transmission', value: '7-Speed Automatic with manual shift mode' },
      { label: 'Payload', value: '1,010 kg' },
      { label: 'Suspension', value: '5-Link Coil Springs Rear Suspension' }
    ],
    highlights: [
      'Black athletic sports bar and roof rails',
      'Nissan Intelligent Around View Monitor (360 Degree Camera) with Offroad monitor',
      'Advanced driver assist features with emergency braking and lane assist',
      'Signature black 17-inch PRO-4X alloy wheels with orange Nissan badges'
    ],
    stock: 3,
    isFeatured: false,
    model: 'Navara PRO-4X',
    year: 2023,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: 26000,
    color: 'Stealth Gray',
    condition: 'Used',
    engineSize: '2.5L Twin-Turbo',
    isVerifiedVehicle: true,
    warrantyInfo: '1-Year Certified Pre-Owned Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery'],
    inspectionReport: {
      overallScore: 95,
      date: '2026-06-14',
      inspector: 'Umaru Ndahiro, Pickups Evaluator',
      engine: 'Intercooler is tight with no trace oil leaks. EGR system thoroughly cleaned.',
      brakes: 'Friction pads at 75% front, 80% rear. Fluid flushed completely.',
      electrical: 'Camera overlays and proximity sensors validated. 4WD selector operates smoothly.',
      tires: 'Yokohama Geolandar A/T: 75% tread depth.',
      body: 'Rear tray lined with premium polymer protective coating. Paint minor scuffs detailed out.',
      details: 'Extremely robust vehicle. Perfect utility helper for rural terrain transport.'
    }
  },
  {
    id: 'v6',
    name: 'Hyundai County Deluxe Bus',
    category: 'car',
    subcategory: 'Buses',
    brand: 'Hyundai',
    price: 45000,
    rating: 4.65,
    reviewsCount: 11,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-auto-in-the-highway-surrounded-by-nature-41551-large.mp4',
    description: 'The preferred choice for school, tourism, and corporate transport in Kigali. The Hyundai County is designed with high passenger comfort in mind, offering spacious legroom, strong roof-rack utility, and reliable diesel stamina.',
    specs: [
      { label: 'Engine', value: '3.9L Turbocharged Diesel Inline-4' },
      { label: 'Seating Capacity', value: '30 Passengers (Fabric Seats)' },
      { label: 'Suspension', value: 'Heavy Duty Leaf Springs' },
      { label: 'A/C System', value: 'High Capacity Overhead Air Ducts' },
      { label: 'Safety', value: 'Pneumatic auto-folding door with safety sensors' }
    ],
    highlights: [
      'Pneumatic passenger boarding folding door with emergency release',
      'Dual fuel filter design optimized for regional diesel supplies',
      'Ergonomic driver cockpit with power steering and audio controls',
      'High capacity under-seat luggage and parcel channels'
    ],
    stock: 2,
    isFeatured: false,
    model: 'County Deluxe',
    year: 2021,
    fuelType: 'Diesel',
    transmission: 'Manual',
    mileage: 54000,
    color: 'White & Blue Ribbon Duo',
    condition: 'Used',
    engineSize: '3.9L Turbo',
    isVerifiedVehicle: true,
    warrantyInfo: '6-Month Powertrain Warranty',
    location: 'Kigali Free Zone Depot',
    deliveryOptions: ['Showroom Pickup', 'Kigali Showroom delivery'],
    inspectionReport: {
      overallScore: 92,
      date: '2026-06-05',
      inspector: 'Jean de Dieu Mutangana, Commercial Vehicle inspector',
      engine: 'High injection rail pressure. Glow plugs replaced. Crankshaft seals tested tight.',
      brakes: 'Drum brakes overhauled completely, shoes adjusted, new brake booster cylinder installed.',
      electrical: 'Overhead passenger lighting, ventilation fans, and door motor controls fully functional.',
      tires: 'Hankook Commercial Radials: 80% tread.',
      body: 'Chassis rustproof treatment applied. Side emergency exit hatch calibrated.',
      details: 'Superb corporate carrier. Complete registration logs and safety certification available.'
    }
  },
  {
    id: 'v7',
    name: 'BMW iX xDrive50 M-Sport',
    category: 'car',
    subcategory: 'Electric Vehicles (EVs)',
    brand: 'BMW',
    price: 92500,
    rating: 4.92,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-in-the-night-40283-large.mp4',
    description: 'An avant-garde visionary EV SUV. Combining BMWs carbon-fiber-reinforced cage design, dual high-efficiency eDrive motors, luxury olive-leaf tanned natural leather, and the breathtaking curved digital instrument screen.',
    specs: [
      { label: 'Powertrain', value: 'Dual-Motor AWD Electric' },
      { label: 'Horsepower', value: '516 hp' },
      { label: 'Range', value: '324 miles (521 km)' },
      { label: 'Acceleration', value: '0-60 mph in 4.4 seconds' },
      { label: 'Fast Charge', value: '10% to 80% in 35 mins (150kW DC)' }
    ],
    highlights: [
      'M-Sport active aerodynamic wheels and wider brake calipers',
      'Sky Lounge panoramic sunroof with electrochromic active shading',
      '18-speaker Harman Kardon spatial audio system',
      'BMW Curved Display running latest OS 8.5 with navigation HUD'
    ],
    stock: 2,
    isFeatured: true,
    model: 'iX xDrive50',
    year: 2024,
    fuelType: 'Electric',
    transmission: 'Direct Drive',
    mileage: 3200,
    color: 'Phytonic Blue Metallic',
    condition: 'Used',
    engineSize: 'Dual-Motor 385kW',
    isVerifiedVehicle: true,
    warrantyInfo: '5-Year / 100,000 km BMW Factory Drivetrain Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Flatbed Home Delivery'],
    inspectionReport: {
      overallScore: 98,
      date: '2026-06-19',
      inspector: 'Aimable Mugisha, Lead EV diagnostics',
      engine: 'Battery health reading at 99.4% original state. Inverters and coolant levels checked.',
      brakes: 'M-Sport performance pads at 90% life. Brake lines dry and intact.',
      electrical: 'Full network diagnostics returned zero anomalies. Digital instrument firmware updated.',
      tires: 'Bridgestone Alenza EV: 90% tread remaining.',
      body: 'Carbon fiber safety cage verified intact. Original paint thickness on all surfaces.',
      details: 'Superb electric high-rider. Extremely quiet, premium executive commuter.'
    }
  },
  {
    id: 'v8',
    name: 'Mercedes-Benz Actros 1845 Heavy Truck',
    category: 'car',
    subcategory: 'Commercial Vehicles',
    brand: 'Mercedes-Benz',
    price: 78000,
    rating: 4.7,
    reviewsCount: 8,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-auto-in-the-highway-surrounded-by-nature-41551-large.mp4',
    description: 'The ultimate heavy-duty regional hauler. Powered by Mercedes-Benz highly efficient OM471 diesel engine, featuring predictive powertrain controls, active brake assist, and a luxurious sleeper cabin optimized for cross-border transit.',
    specs: [
      { label: 'Engine', value: '12.8L OM471 Inline-6 Turbo Diesel' },
      { label: 'Torque', value: '2,200 Nm @ 1,100 RPM' },
      { label: 'Gross Weight (GCW)', value: '44,000 kg (44 Tons)' },
      { label: 'Transmission', value: 'PowerShift 12-Speed Automated Manual' },
      { label: 'Cabin', value: 'StreamSpace Sleeper Cab with double bunk beds' }
    ],
    highlights: [
      'Predictive Powertrain Control (PPC) for up to 5% fuel savings',
      'Active Brake Assist 5 with automated pedestrian recognition',
      'MirrorCam digital side camera displays instead of massive glass mirrors',
      'Pneumatic high-comfort seat suspension and cabin climate heater'
    ],
    stock: 1,
    isFeatured: false,
    model: 'Actros 1845',
    year: 2022,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: 82000,
    color: 'Pure Arctic White',
    condition: 'Used',
    engineSize: '12.8L heavy diesel',
    isVerifiedVehicle: true,
    warrantyInfo: '1-Year Powertrain Warranty from Bruce Rii Motors',
    location: 'Kigali Free Zone Depot',
    deliveryOptions: ['Showroom Pickup', 'Trailer delivery countrywide'],
    inspectionReport: {
      overallScore: 93,
      date: '2026-06-03',
      inspector: 'Francois Gatera, Commercial Fleet Inspector',
      engine: 'Turbo seals checked, oil filters replaced. Exhaust treatment (AdBlue) injector fully cleaned.',
      brakes: 'Pneumatic disc brakes overhauled. Disc friction levels at 80% remaining.',
      electrical: 'MirrorCam displays updated, high voltage auxiliary alternator fully tested.',
      tires: 'Michelin Multi-Way Commercial: 80% tread remaining.',
      body: 'Dual fuel tanks (720L capacity) thoroughly cleaned and flushed. Bunk bed framing tight.',
      details: 'Superb regional hauler. Perfect mechanical shape, fully certified for regional trade routes.'
    }
  },
  {
    id: 'v9',
    name: 'BMW S1000RR M-Performance',
    category: 'motorcycle',
    subcategory: 'Superbike',
    brand: 'BMW',
    price: 27500,
    rating: 4.96,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'
    ],
    gallery360: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-in-the-night-40283-large.mp4',
    description: 'An absolute weapon built for the track and premium speed on the road. The M-Performance package adds super-light carbon wheels, titanium exhaust, M sports seat, and specialized track modes.',
    specs: [
      { label: 'Engine', value: '999cc ShiftCam Inline-4' },
      { label: 'Power', value: '210 hp @ 13,750 RPM' },
      { label: 'Weight', value: '193.5 kg (M package)' },
      { label: 'Top Speed', value: '188 mph (303 km/h)' },
      { label: 'Electronics', value: '6-axis IMU with Slide Control & DTC' }
    ],
    highlights: [
      'M Carbon wheels reducing rotating mass significantly',
      'Akrapovič titanium sports silencer standard',
      'M Sport sports seat and high wind-screen racing dome',
      'Dynamic Damping Control (DDC) electronic active forks'
    ],
    stock: 2,
    isFeatured: true,
    model: 'S1000RR',
    year: 2024,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: 950,
    color: 'M Motorsport Tri-Color',
    condition: 'Used',
    engineSize: '999cc ShiftCam',
    isVerifiedVehicle: true,
    warrantyInfo: '2-Year BMW Motorrad Warranty',
    location: 'Kiyovu Showroom, Kigali',
    deliveryOptions: ['Showroom Pickup', 'Regional delivery Kigali'],
    inspectionReport: {
      overallScore: 99,
      date: '2026-06-23',
      inspector: 'Sano Blaise, Motorsports Engineer',
      engine: 'ShiftCam valve switching mechanics checked. Idle frequency steady. Spark firing optimized.',
      brakes: 'M-Performance blue anodized brake calipers at 95% pads remaining.',
      electrical: 'Dynamic riding modes (Rain, Road, Dynamic, Race Pro) tested. TFT screen updated.',
      tires: 'Pirelli Diablo Supercorsa SP: 95% tread depth.',
      body: 'Carbon fiber wheels scanned with ultrasound for micro-fractures: 100% sound. Fairings original.',
      details: 'Pristine motorcycle. Extremely agile and high performing. Original purchase invoice included.'
    }
  },
  // --- VEHICLE ACCESSORIES & SPARE PARTS ---
  {
    id: 'sp1',
    name: 'Bruce Rii High-Performance Brake Rotors',
    category: 'accessory',
    subcategory: 'Spare Parts',
    brand: 'Bruce Rii Motors',
    price: 380,
    rating: 4.88,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=800',
    description: 'Precision cross-drilled and slotted carbon-iron alloy brake rotors. Designed to maximize heat dissipation, eliminate brake fade, and deliver incredible responsive stopping power in tough regional climates.',
    specs: [
      { label: 'Material', value: 'Carbon-Iron high density alloy' },
      { label: 'Design', value: 'Cross-Drilled & Slotted for cooling' },
      { label: 'Coating', value: 'Zinc plated for anti-rust protection' },
      { label: 'Diameter', value: '345 mm vented' },
      { label: 'Package Includes', value: 'Pair of Front Rotors + Ceramic Pads' }
    ],
    highlights: [
      'Up to 30% quicker heat dissipation than standard steel rotors',
      'Precision slotted lanes wipe away dust, gas, and regional mud debris',
      'High resistance against warping under extreme downhill hauling',
      'Direct bolt-on replacement fitting major Toyota, Nissan, and BMW hubs'
    ],
    stock: 20,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'sp2',
    name: 'Bruce Rii Laser LED Headlight Retrofit Kit',
    category: 'accessory',
    subcategory: 'Vehicle Accessories',
    brand: 'Bruce Rii Motors',
    price: 245,
    rating: 4.78,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-bright plug-and-play laser LED headlight replacement bulbs. Boosts visual reach up to 600 meters in foggy or unlit night highway routes in East Africa.',
    specs: [
      { label: 'Brightness', value: '25,000 Lumens per bulb' },
      { label: 'Color Temp', value: '6000K Pure White' },
      { label: 'Lifespan', value: '50,000 Hours' },
      { label: 'Cooling', value: 'Double ball bearing fan + copper heatpipe' },
      { label: 'Waterproof', value: 'IP68 fully sealed aluminum shell' }
    ],
    highlights: [
      'Unbelievable 600m visual range with non-glaring beam focus',
      'Dual active cooling system avoids thermal degradation',
      'Fits standard H4, H7, H11, and 9005 headlight sockets',
      'Instant start with no latency or warming up periods'
    ],
    stock: 35,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'sp3',
    name: 'Bruce Rii Carbon Fiber Aero Rear Spoiler',
    category: 'accessory',
    subcategory: 'Vehicle Accessories',
    brand: 'Bruce Rii Motors',
    price: 520,
    rating: 4.9,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=800',
    description: 'Bespoke dry carbon fiber aerodynamic rear trunk wing. Dramatically increases highway high-speed downforce and styling for sports vehicles and custom rebuilds.',
    specs: [
      { label: 'Material', value: 'Dry Pre-preg Carbon Fiber (3K weave)' },
      { label: 'Weight', value: '1.2 kg (ultra lightweight)' },
      { label: 'Finish', value: 'Glossy UV-Resistant clear-coat' },
      { label: 'Width', value: '135 cm (universal fit)' },
      { label: 'Mounting', value: 'Includes high strength double-sided 3M tape' }
    ],
    highlights: [
      'Aerodynamically optimized wind-tunnel proven curve profile',
      'Incredibly rigid dry carbon fiber holds its shape under heavy winds',
      'High UV protection coat avoids yellowing or cracking under hot sun',
      'Installs in minutes with zero structural drilling required'
    ],
    stock: 8,
    isFeatured: false,
    reviews: []
  },
  {
    id: 'sp4',
    name: 'Bruce Rii Laser-Iridium Spark Plugs Set',
    category: 'accessory',
    subcategory: 'Spare Parts',
    brand: 'Bruce Rii Motors',
    price: 95,
    rating: 4.82,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=800',
    description: 'Set of 6 ultra-durable laser iridium-platinum premium spark plugs. Provides unmatched spark reliability, fuel efficiency booster, and instant motor starting capabilities.',
    specs: [
      { label: 'Electrode Material', value: 'Laser Iridium tip with Platinum ground' },
      { label: 'Thread Size', value: '14mm diameter, 26.5mm reach' },
      { label: 'Lifespan', value: '100,000 km continuous duty' },
      { label: 'Pack Qty', value: 'Set of 6 spark plugs' },
      { label: 'Heat Range', value: '7 (highly stable under extreme loads)' }
    ],
    highlights: [
      'Ultra-fine 0.6mm iridium tip maximizes ignition firing rate',
      'Ensures optimal combustion to boost mileage fuel efficiency',
      'Eliminates cylinder cold-start misfires completely',
      'Corrosion resistant nickel plated threads prevent seizing'
    ],
    stock: 120,
    isFeatured: false,
    reviews: []
  }
];

