import { create } from "zustand";
import { PRODUCTS } from "@/lib/mockData";
import { Product, ProductCategory } from "@/lib/types";

interface ProductsState {
  products: Product[];
  searchQuery: string;
  selectedCategory: ProductCategory | null;
  isLoading: boolean;
  filters: {
    brands: string[];
    priceRange: [number, number];
  };
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory | null) => void;
  setFilters: (filters: Partial<ProductsState["filters"]>) => void;
  resetFilters: () => void;
  getFilteredProducts: () => Product[];
  getProductById: (id: string) => Product | undefined;
  triggerLoading: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: PRODUCTS,
  searchQuery: "",
  selectedCategory: null,
  isLoading: false,
  filters: {
    brands: [],
    priceRange: [0, 50],
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () =>
    set({
      filters: {
        brands: [],
        priceRange: [0, 50],
      },
    }),

  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory, filters } = get();
    
    return products.filter((product) => {
      // 1. Category Filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // 2. Search Query Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query) ?? false;
        if (!matchesName && !matchesDesc && !matchesBrand) {
          return false;
        }
      }

      // 3. Brand Filter
      if (filters.brands.length > 0 && product.brand) {
        if (!filters.brands.includes(product.brand)) {
          return false;
        }
      }

      // 4. Price Filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });
  },

  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  },

  triggerLoading: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 800));
    set({ isLoading: false });
  },
}));
