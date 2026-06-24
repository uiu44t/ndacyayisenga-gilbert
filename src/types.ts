export type CategoryType = 
  | 'all' 
  | 'motorcycle' 
  | 'car' 
  | 'airplane' 
  | 'electronic'
  | 'smartphone'
  | 'laptop'
  | 'tablet'
  | 'smartwatch'
  | 'headphone'
  | 'speaker'
  | 'tv'
  | 'accessory';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface InspectionReport {
  overallScore: number;
  date: string;
  inspector: string;
  engine: string;
  brakes: string;
  electrical: string;
  tires: string;
  body: string;
  details: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryType, 'all'>;
  subcategory: string;
  brand: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  gallery360?: string[];
  videoUrl?: string;
  description: string;
  specs: ProductSpec[];
  highlights: string[];
  stock: number;
  isFeatured?: boolean;
  reviews?: Review[];
  
  // Advanced Vehicle Properties
  model?: string;
  year?: number;
  fuelType?: string;
  transmission?: string;
  mileage?: number;
  color?: string;
  condition?: 'New' | 'Used';
  engineSize?: string;
  isVerifiedVehicle?: boolean;
  inspectionReport?: InspectionReport;
  warrantyInfo?: string;
  location?: string;
  deliveryOptions?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchFilters {
  category: CategoryType;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  priceRange: [number, number];
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    phone: string;
  };
  paymentMethod: 'momo' | 'card' | 'cod' | 'qr' | 'wire';
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  addresses: Array<{
    id: string;
    street: string;
    city: string;
    isDefault: boolean;
  }>;
}

