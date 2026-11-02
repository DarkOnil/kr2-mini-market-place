import type { CartItem } from './types'

interface WithCart {
  cart: CartItem[]
}

export const selectCartCount = (state: WithCart): number =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state: WithCart): number =>
  state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
