import { Link } from 'react-router-dom'
import { selectCartTotal, useCartStore } from '@/entities/cart'
import { CartQuantityControls } from '@/features/cart-quantity'
import { ClearCartButton } from '@/features/clear-cart'
import { RemoveFromCartButton } from '@/features/remove-from-cart'

export function CartPage() {
  const cart = useCartStore((state) => state.cart)
  const total = useCartStore(selectCartTotal)

  return (
    <main className="container">
      <h1>Корзина</h1>
      {cart.length === 0 ? (
        <p>
          Корзина пуста. <Link to="/">Выбрать товары</Link>
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <Link to={`/products/${item.id}`}>{item.title}</Link>
              <span>${item.price}</span>
              <CartQuantityControls id={item.id} quantity={item.quantity} />
              <RemoveFromCartButton id={item.id} />
            </div>
          ))}
          <h2>Итого: ${total.toFixed(2)}</h2>
          <ClearCartButton />
        </>
      )}
    </main>
  )
}
