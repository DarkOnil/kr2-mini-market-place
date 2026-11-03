import { Link } from 'react-router-dom'
import { selectCartCount, useCartStore } from '@/entities/cart'
import { useFavoriteStore } from '@/entities/favorite'

export function Header() {
  const favoritesCount = useFavoriteStore((state) => state.favorites.length)
  const cartCount = useCartStore(selectCartCount)

  return (
    <header>
      <Link to="/" className="logo">
        Мини-Маркетплейс
      </Link>
      <nav>
        <Link to="/">Каталог</Link>
        <Link to="favorites">Избранное ({favoritesCount})</Link>
        <Link to="cart">Корзина ({cartCount})</Link>
        <Link to="/products/new">Добавить товар</Link>
      </nav>
    </header>
  )
}
