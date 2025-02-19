import { create } from "zustand"

interface CartItem {
  id: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (id, quantity) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        return {
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item)),
        }
      }
      return { items: [...state.items, { id, quantity }] }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}))

