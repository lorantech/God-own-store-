export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  featured: boolean;
  inStock: boolean;
  createdAt: string;
}

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment?: string;
  type: 'text' | 'video';
  mediaUrl?: string;
  approved: boolean;
  createdAt: string;
}

export interface CEOCorner {
  _id: string;
  title: string;
  content: string;
  image?: string;
  quote?: string;
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
