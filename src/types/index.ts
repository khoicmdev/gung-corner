export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  images: string[];
  category: string;
  isBestSeller?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phoneNumber: string;
  total: number;
  createdAt: Date;
  status: "pending" | "confirmed" | "completed";
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  avatar?: string;
}
