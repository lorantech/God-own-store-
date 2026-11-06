export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  color?: string;
  variantGroup?: string;
  sizes?: string;
  featured: boolean;
  inStock: boolean;
  published?: boolean;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  name: string;
  handle?: string;
  rating: number;
  title?: string;
  comment?: string;
  type: 'text' | 'video';
  image?: string;
  mediaUrl?: string;
  product?: string;
  approved: boolean;
  createdAt: string;
}

export interface CEOCorner {
  _id: string;
  title: string;
  content: string;
  image?: string;
  quote?: string;
  fullName?: string;
  position?: string;
  welcomeMessage?: string;
  introduction?: string;
  story?: string;
  vision?: string;
  mission?: string;
  personalMessage?: string;
  published?: boolean;
  createdAt: string;
}

export interface Settings {
  logo?: string;
  storeName: string;
  tagline: string;
  whatsapp: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
