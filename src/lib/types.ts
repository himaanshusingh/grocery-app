// Shared domain types and enums for the Nectar grocery app.

export enum ProductCategory {
  FreshFruitsVegetable = "fresh-fruits-vegetable",
  CookingOilGhee = "cooking-oil-ghee",
  MeatFish = "meat-fish",
  BakerySnacks = "bakery-snacks",
  DairyEggs = "dairy-eggs",
  Beverages = "beverages",
}

export enum OrderStatus {
  Pending = "pending",
  Accepted = "accepted",
  Preparing = "preparing",
  OutForDelivery = "out-for-delivery",
  Delivered = "delivered",
  Failed = "failed",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // e.g. "1kg, Price", "7pcs, Price"
  image: string;
  category: ProductCategory;
  brand?: string;
  nutritionPer100g?: string;
  rating?: number; // 0-5
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  username?: string;
  email?: string;
  phone?: string;
  zone?: string;
  area?: string;
}
