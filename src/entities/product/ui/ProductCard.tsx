import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PLACEHOLDER_CARD_IMAGE } from '@/shared/config'
import { ImageWithFallback } from '@/shared/ui'
import type { Product } from '../model/types'

interface ProductCardProps {
  product: Product
  
  actions?: ReactNode
}

export function ProductCard({ product, actions }: ProductCardProps) {
  const image = product.images?.[0]

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <ImageWithFallback src={image} alt={product.title} fallbackSrc={PLACEHOLDER_CARD_IMAGE} />
      </Link>
      <h3>
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </h3>
      <p>${product.price}</p>
      {actions}
    </article>
  )
}
