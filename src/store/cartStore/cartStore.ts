import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Medicine } from "@/types";

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (medicine: Medicine) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (medicine) => {
        const existing = get().items.find(
          (item) => item.medicine.id === medicine.id,
        );
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.medicine.id === medicine.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...get().items, { medicine, quantity: 1 }] });
        }
      },

      removeFromCart: (id) => {
        set({ items: get().items.filter((item) => item.medicine.id !== id) });
      },

      increaseQuantity: (id) => {
        set({
          items: get().items.map((item) =>
            item.medicine.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        });
      },

      decreaseQuantity: (id) => {
        set({
          items: get()
            .items.map((item) =>
              item.medicine.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (acc, item) => acc + item.medicine.price * item.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",
    },
  ),
);
