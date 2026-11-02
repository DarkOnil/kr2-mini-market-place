import { useCartStore } from '@/entities/cart'

interface CartQuantityControlsProps {
  id: number
  quantity: number
}

export function CartQuantityControls({ id, quantity }: CartQuantityControlsProps) {
  const changeQuantity = useCartStore((state) => state.changeQuantity)

  return (
    <>
      <button onClick={() => changeQuantity(id, -1)}>-</button>
      <span>{quantity}</span>
      <button onClick={() => changeQuantity(id, 1)}>+</button>
    </>
  )
}
