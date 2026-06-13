import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types";

interface FavoritesState {
  items: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addFavorite: (product) => {
        const items = [...get().items];
        if (!items.find((item) => item.id === product.id)) {
          items.push(product);
          set({ items });
        }
      },

      removeFavorite: (productId) => {
        const items = get().items.filter((item) => item.id !== productId);
        set({ items });
      },

      toggleFavorite: (product) => {
        const isFav = get().isFavorite(product.id);
        if (isFav) {
          get().removeFavorite(product.id);
        } else {
          get().addFavorite(product);
        }
      },

      isFavorite: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    { name: "nectar-favorites" }
  )
);
