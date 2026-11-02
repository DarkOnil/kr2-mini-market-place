import { useCartStore } from '@/entities/cart'
import type { Product } from '@/entities/product'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  return <button onClick={() => addToCart(product)}>В корзину</button>
}
