import { Link } from 'react-router-dom'
import { useFavoriteStore } from '@/entities/favorite'
import { ProductCard } from '@/entities/product'
import { AddToCartButton } from '@/features/add-to-cart'
import { ToggleFavoriteButton } from '@/features/toggle-favorite'

export function FavoritesPage() {
  const favorites = useFavoriteStore((state) => state.favorites)

  return (
    <main className="container">
      <h1>Избранное</h1>
      {favorites.length ? (
        <div className="product-grid">
          {favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            actions={
              <>
                <ToggleFavoriteButton product={product} />
                <AddToCartButton product={product} />
              </>
            }
          />
        ))}
        </div>
      ) : (
        <p>
          Избранное пока пустое. <Link to="/">Открыть католог</Link>
        </p>
      )}
    </main>
  )
}
