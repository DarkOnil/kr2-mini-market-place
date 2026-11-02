import { useEffect, useState } from 'react'
import { getProducts } from '@/entities/product'
import type { Product } from '@/entities/product'
import type { ProductFiltersValue } from '@/features/product-filters'

export const PRODUCTS_LIMIT = 12

export function useProducts({ title, categoryId, min, max, page }: ProductFiltersValue) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.resolve()
      .then(() => {
        setLoading(true)
        setError('')
        return getProducts({
          offset: (page - 1) * PRODUCTS_LIMIT,
          limit: PRODUCTS_LIMIT,
          title: title || undefined,
          categoryId: categoryId || undefined,
          price_min: min || undefined,
          price_max: max || undefined,
        })
      })
      .then((data) => setProducts(data))
      .catch(() => setError('Не удалось загрузить товары. Проверьте интернет и попробуйте ещё раз.'))
      .finally(() => setLoading(false))
  }, [title, categoryId, min, max, page])

  return { products, loading, error }
}
