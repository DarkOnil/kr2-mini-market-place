import { create } from 'zustand'


const savedShop = JSON.parse(localStorage.getItem('mini-marketplace') || '{}')

export const useShopStore = create((set) => ({
  favorites: savedShop.favorites || [],
  cart: savedShop.cart || [],

  toggleFavorite: (product) => set((state) => ({
    favorites: state.favorites.some(item => item.id === product.id)
      ? state.favorites.filter(item => item.id !== product.id)
      : [...state.favorites, product]
  })),

  addToCart: (product) => set((state) => {
    const found = state.cart.find(item => item.id === product.id)

    if (found) {
      return {
        cart: state.cart.map(item => item.id === product.id
            ? {...item, quantity: item.quantity + 1 }
            : item)
        }
    }

    return {cart: [...state.cart, { ... product, quantity: 1}] }
}),

    changeQuantity: (id, amount) => set((state) => ({
        cart: state.cart.map(item => item.id === id
            ? { ... item, quantity: Math.max(1, item.quantity + amount) }
            : item)
    })),
    
    removeFromCart: (id) => set((state) => ({
        cart:state.cart.filter(item => item.id !== id)
    })),

    clearCart: () => set ({ cart: [] })
    }))

    useShopStore.subscribe((state) => {
        localStorage.setItem('mini-marketplace', JSON.stringify({
            cart: state.cart
        }))
    })