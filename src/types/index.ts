export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  category: string;
  categoryName: string;
  price: number;
  compareAtPrice?: number;
  isQuoteOnly: boolean;
  badge?: 'Popular' | 'New' | 'Best Seller' | 'Custom';
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  material: string;
  dimensions: {
    desk?: string;
    chair?: string;
    overall?: string;
  };
  features: string[];
  specifications: Record<string, string>;
  minOrderQuantity: number;
  leadTime: string;
  warranty: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  handle: string;
  count: number;
  icon: string;
  description: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Classrooms' | 'Libraries' | 'Computer Labs' | 'School Benches' | 'Staff Rooms' | 'Science Labs';
  client: string;
  location: string;
  year: string;
  image: string;
  galleryImages: string[];
  description: string;
  scope: string;
  furnitureSupplied: string[];
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  customNotes?: string;
}

export interface QuotationRequest {
  id: string;
  createdAt: string;
  customerName: string;
  institutionName: string;
  phone: string;
  email: string;
  productCategory: string;
  requestedQuantity: number | string;
  deliveryCity: string;
  customDimensions?: string;
  materialPreference?: string;
  additionalRequirements?: string;
  preferredProduct?: string;
  status: 'pending' | 'reviewing' | 'quoted';
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  announcementText: string;
  announcementLink: string;
  showAnnouncement: boolean;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  currencySymbol: string;
  freeShippingThreshold: number;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  institution?: string;
  phone?: string;
  city?: string;
  address?: string;
  accountMode?: 'classic' | 'new_customer_accounts' | 'institutional';
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    image?: string;
    variantName?: string;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'in_production' | 'dispatched' | 'delivered';
  paymentMethod: string;
  deliveryAddress: string;
  trackingNumber?: string;
}
