import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, isOwnedProduct } from '@/entities/product'
import type { Product } from '@/entities/product'
import { AddToCartButton } from '@/features/add-to-cart'
import { DeleteProductButton } from '@/features/delete-product'
import { ToggleFavoriteButton } from '@/features/toggle-favorite'
import { PLACEHOLDER_DETAILS_IMAGE } from '@/shared/config'
import { ImageWithFallback } from '@/shared/ui'

export function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState('')
  const owned = isOwnedProduct(id)

  useEffect(() => {
    if (!id) return
    getProduct(id)
      .then(setProduct)
      .catch(() => setError('Товар не найден'))
  }, [id])

  if (error && !product)
    return (
      <main className="container">
        <p>{error}</p>
        <Link to="/"></Link>
      </main>
    )
  if (!product)
    return (
      <main className="container">
        <p>Загрузка...</p>
      </main>
    )

  return (
    <main className="container detail-page">
      <Link to="/">← В каталог</Link>
      {error && <p className="error">{error}</p>}
      <div className="detail">
        <ImageWithFallback
          src={product.images?.[0]}
          alt={product.title}
          fallbackSrc={PLACEHOLDER_DETAILS_IMAGE}
        />
        <div>
          <h1>{product.title}</h1>
          <h2>${product.price}</h2>
          <p>Категория: {product.category?.name}</p>
          <p>{product.description}</p>
          <AddToCartButton product={product} />
          <ToggleFavoriteButton product={product} activeLabel="♥ В избранном" />
          {owned && (
            <div>
              <p>Твой товар</p>
              <Link to={`/products/${id}/edit`}>Редактировать</Link>{' '}
              <DeleteProductButton
                productId={product.id}
                onDeleted={() => navigate('/')}
                onError={setError}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
