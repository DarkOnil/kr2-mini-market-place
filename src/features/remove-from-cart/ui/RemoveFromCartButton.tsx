import { useCartStore } from '@/entities/cart'

interface RemoveFromCartButtonProps {
  id: number
}

export function RemoveFromCartButton({ id }: RemoveFromCartButtonProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  return <button onClick={() => removeFromCart(id)}>Убрать</button>
}
