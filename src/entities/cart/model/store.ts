import { create } from 'zustand'
import type { Product } from '@/entities/product'
import { readJson, writeJson } from '@/shared/lib'
import type { CartItem } from './types'

const STORAGE_KEY = 'mini-marketplace'

interface SavedShop {
  cart?: CartItem[]
}

interface CartState {
  cart: CartItem[]
  addToCart: (product: Product) => void
  changeQuantity: (id: number, amount: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const savedShop = readJson<SavedShop>(STORAGE_KEY, {})

export const useCartStore = create<CartState>()((set) => ({
  cart: savedShop.cart || [],

  addToCart: (product) =>
    set((state) => {
      const found = state.cart.find((item) => item.id === product.id)

      if (found) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }

      return { cart: [...state.cart, { ...product, quantity: 1 }] }
    }),

  changeQuantity: (id, amount) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item,
      ),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}))

useCartStore.subscribe((state) => {
  writeJson(STORAGE_KEY, { cart: state.cart })
})
