import { useCartStore } from '@/entities/cart'

export function ClearCartButton() {
  const clearCart = useCartStore((state) => state.clearCart)

  return <button onClick={clearCart}>Очистить корзину</button>
}
