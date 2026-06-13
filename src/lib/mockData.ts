import { Product, ProductCategory } from "./types";

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  image: string;
  bgColor: string; // for tailwind style background
  borderColor: string; // for tailwind style border
  textColor: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: ProductCategory.FreshFruitsVegetable,
    name: "Fresh Fruits & Vegetable",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-emerald-50/70",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
  },
  {
    id: ProductCategory.CookingOilGhee,
    name: "Cooking Oil & Ghee",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&auto=format&fit=crop&q=60",
    bgColor: "bg-amber-50/70",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
  {
    id: ProductCategory.MeatFish,
    name: "Meat & Fish",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=60",
    bgColor: "bg-rose-50/70",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
  },
  {
    id: ProductCategory.BakerySnacks,
    name: "Bakery & Snacks",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&auto=format&fit=crop&q=60",
    bgColor: "bg-orange-50/70",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
  },
  {
    id: ProductCategory.DairyEggs,
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&auto=format&fit=crop&q=60",
    bgColor: "bg-yellow-50/70",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
  },
  {
    id: ProductCategory.Beverages,
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=60",
    bgColor: "bg-blue-50/70",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
  },
];

export const PRODUCTS: Product[] = [
  // Fresh Fruits & Vegetables
  {
    id: "1",
    name: "Organic Bananas",
    description: "Bananas are rich in potassium and fiber. They make a great snack, add creaminess to smoothies, and are naturally pre-packaged in their own peel.",
    price: 4.99,
    unit: "7pcs",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.FreshFruitsVegetable,
    brand: "Fresh Farms",
    nutritionPer100g: "89 kcal, 22.8g Carbs, 1.1g Protein",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Red Apples",
    description: "Crisp and juicy sweet red apples. Excellent for eating fresh, slicing into salads, or baking into pies.",
    price: 2.99,
    unit: "1kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.FreshFruitsVegetable,
    brand: "Gala Orchard",
    nutritionPer100g: "52 kcal, 13.8g Carbs, 0.3g Protein",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Bell Pepper Red",
    description: "Bright red bell peppers, sweet and crunchy. High in Vitamin C. Perfect for stir-fries, roasting, or raw snacking.",
    price: 3.49,
    unit: "1kg",
    image: "https://plus.unsplash.com/premium_photo-1724849347630-a7d35a7fb08a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ProductCategory.FreshFruitsVegetable,
    brand: "Hydro Growers",
    nutritionPer100g: "31 kcal, 6.0g Carbs, 1.0g Protein",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Organic Ginger",
    description: "Fresh, spicy organic ginger root. Adds aromatic warmth to tea, cooking, and smoothies.",
    price: 2.49,
    unit: "250g",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.FreshFruitsVegetable,
    brand: "Root Organics",
    nutritionPer100g: "80 kcal, 17.8g Carbs, 1.8g Protein",
    rating: 4.9,
  },
  
  // Cooking Oil & Ghee
  {
    id: "5",
    name: "Fortune Sunflower Oil",
    description: "Light and healthy cooking oil. Rich in Vitamin E and low in saturated fats, suitable for all types of daily cooking.",
    price: 15.99,
    unit: "5L",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.CookingOilGhee,
    brand: "Fortune",
    nutritionPer100g: "884 kcal, 0g Carbs, 100g Fat",
    rating: 4.4,
  },
  {
    id: "6",
    name: "Organic Mustard Oil",
    description: "Cold-pressed mustard oil with a strong aroma and pungent flavor. Ideal for traditional recipes and pickling.",
    price: 4.59,
    unit: "1L",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.CookingOilGhee,
    brand: "Pure Roots",
    nutritionPer100g: "884 kcal, 0g Carbs, 100g Fat",
    rating: 4.7,
  },

  // Meat & Fish
  {
    id: "7",
    name: "Premium Beef Ribeye",
    description: "Juicy, tender, and well-marbled premium beef ribeye cut. Perfect for grilling, pan-searing, or roasting.",
    price: 24.99,
    unit: "500g",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.MeatFish,
    brand: "Butcher's Choice",
    nutritionPer100g: "291 kcal, 0g Carbs, 24g Protein, 22g Fat",
    rating: 4.9,
  },
  {
    id: "8",
    name: "Fresh Salmon Fillet",
    description: "Atlantic salmon fillet, rich in Omega-3 fatty acids. Tender, flavorful, and clean pre-cut.",
    price: 18.99,
    unit: "250g",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.MeatFish,
    brand: "Ocean Harvest",
    nutritionPer100g: "208 kcal, 0g Carbs, 20g Protein, 13g Fat",
    rating: 4.8,
  },

  // Bakery & Snacks
  {
    id: "9",
    name: "Whole Wheat Bread",
    description: "Freshly baked whole wheat bread loaf. Soft, nutritious, and high in dietary fiber.",
    price: 2.29,
    unit: "400g",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.BakerySnacks,
    brand: "Daily Bake",
    nutritionPer100g: "265 kcal, 49g Carbs, 9g Protein",
    rating: 4.3,
  },
  {
    id: "10",
    name: "Chocolate Chip Cookies",
    description: "Crunchy cookies loaded with rich chocolate chips. The perfect companion for milk or tea.",
    price: 3.99,
    unit: "200g",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.BakerySnacks,
    brand: "Sweet Treats",
    nutritionPer100g: "488 kcal, 64g Carbs, 5g Protein",
    rating: 4.6,
  },

  // Dairy & Eggs
  {
    id: "11",
    name: "Organic Whole Milk",
    description: "Freshly pasteurized farm milk, rich in calcium and vitamin D. No artificial hormones.",
    price: 1.89,
    unit: "1L",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.DairyEggs,
    brand: "Dairy Pure",
    nutritionPer100g: "61 kcal, 4.8g Carbs, 3.2g Protein, 3.2g Fat",
    rating: 4.7,
  },
  {
    id: "12",
    name: "Brown Farm Eggs",
    description: "Free-range brown chicken eggs. Farm-fresh, high quality protein source.",
    price: 3.49,
    unit: "12pcs",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.DairyEggs,
    brand: "Happy Hens",
    nutritionPer100g: "155 kcal, 1.1g Carbs, 13g Protein, 11g Fat",
    rating: 4.9,
  },

  // Beverages
  {
    id: "13",
    name: "Coca-Cola Can",
    description: "Classic refreshing carbonated soft drink. Best served ice cold.",
    price: 1.25,
    unit: "330ml",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.Beverages,
    brand: "Coca-Cola",
    nutritionPer100g: "42 kcal, 10.6g Carbs, 0g Protein",
    rating: 4.5,
  },
  {
    id: "14",
    name: "Sprite Can",
    description: "Crisp, clean, lemon-lime flavored soda. Caffeine-free and incredibly refreshing.",
    price: 1.25,
    unit: "330ml",
    image: "https://images.unsplash.com/photo-1690988109041-458628590a9e?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ProductCategory.Beverages,
    brand: "Sprite",
    nutritionPer100g: "39 kcal, 9.8g Carbs, 0g Protein",
    rating: 4.4,
  },
  {
    id: "15",
    name: "Apple Juice Organic",
    description: "100% pure pressed apple juice from organic apples. No added sugar or preservatives.",
    price: 3.99,
    unit: "1L",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&auto=format&fit=crop&q=80",
    category: ProductCategory.Beverages,
    brand: "TreeTop",
    nutritionPer100g: "46 kcal, 11.3g Carbs, 0.1g Protein",
    rating: 4.7,
  },
];

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}

export const BANNERS: Banner[] = [
  {
    id: "b1",
    title: "Fresh Vegetables",
    subtitle: "Get Up To 40% OFF",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-emerald-100",
  },
  {
    id: "b2",
    title: "Healthy Cooking Oils",
    subtitle: "Flat 15% Cashback",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    bgColor: "bg-amber-100",
  },
  {
    id: "b3",
    title: "Refresh with Juice",
    subtitle: "Buy 1 Get 1 Free",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80",
    bgColor: "bg-blue-100",
  },
];
