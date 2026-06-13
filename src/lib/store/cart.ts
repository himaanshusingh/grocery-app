import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isCheckingOut: boolean;
  promoCode: string | null;
  discountPercentage: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyPromoCode: (code: string) => boolean;
  clearCart: () => void;
  checkout: () => Promise<boolean>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCheckingOut: false,
      promoCode: null,
      discountPercentage: 0,

      addItem: (product, quantity = 1) => {
        const items = [...get().items];
        const existing = items.find((item) => item.product.id === product.id);

        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({ product, quantity });
        }

        set({ items });
      },

      removeItem: (productId) => {
        const items = get().items.filter((item) => item.product.id !== productId);
        set({ items });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const items = get().items.map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ items });
      },

      applyPromoCode: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === "NECTAR10") {
          set({ promoCode: "NECTAR10", discountPercentage: 10 });
          return true;
        } else if (cleanCode === "NECTAR20") {
          set({ promoCode: "NECTAR20", discountPercentage: 20 });
          return true;
        } else if (cleanCode === "FAIL") {
          // Special code to simulate checkout failure
          set({ promoCode: "FAIL", discountPercentage: 0 });
          return true;
        }
        return false;
      },

      clearCart: () => set({ items: [], promoCode: null, discountPercentage: 0 }),

      checkout: async () => {
        set({ isCheckingOut: true });
        
        // Simulate network API delay using setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        set({ isCheckingOut: false });

        // If user used the "FAIL" promo code, simulate a checkout failure
        if (get().promoCode === "FAIL") {
          return false;
        }

        // Otherwise, clear the cart on success
        get().clearCart();
        return true;
      },
    }),
    { name: "nectar-cart" }
  )
);

// Helper selectors for cart metrics
export const getCartSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export const getCartTotalItems = (items: CartItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);
