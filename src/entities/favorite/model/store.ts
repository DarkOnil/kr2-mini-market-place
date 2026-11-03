import { create } from 'zustand'
import type { Product } from '@/entities/product'

interface FavoriteState {
  favorites: Product[]
  toggleFavorite: (product: Product) => void
}

export const useFavoriteStore = create<FavoriteState>()((set) => ({
  favorites: [],

  toggleFavorite: (product) =>
    set((state) => ({
      favorites: state.favorites.some((item) => item.id === product.id)
        ? state.favorites.filter((item) => item.id !== product.id)
        : [...state.favorites, product],
    })),
}))
