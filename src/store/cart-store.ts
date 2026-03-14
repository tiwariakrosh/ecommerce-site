import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity) => {
        const currentItems = get().items;
        const existing = currentItems.findIndex(
          (item) => item.id === product.id,
        );

        if (existing !== -1) {
          const updated = [...currentItems];
          updated[existing].quantity += quantity;
          set({ items: updated });
        } else {
          set({
            items: [...currentItems, { ...product, quantity }],
          });
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "store-cart",
    },
  ),
);
