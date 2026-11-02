import { useFavoriteStore } from '@/entities/favorite'
import type { Product } from '@/entities/product'

interface ToggleFavoriteButtonProps {
  product: Product
  activeLabel?: string
  inactiveLabel?: string
}

export function ToggleFavoriteButton({
  product,
  activeLabel = '♥ Убрать из избранного',
  inactiveLabel = '♡ В избранное',
}: ToggleFavoriteButtonProps) {
  const isFavorite = useFavoriteStore((state) => state.favorites.some((item) => item.id === product.id))
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)

  return <button onClick={() => toggleFavorite(product)}>{isFavorite ? activeLabel : inactiveLabel}</button>
}
