import type { Product } from '@/entities/product'
import type { SortOption } from '../model/types'

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products]
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  if (sort === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title))
  return sorted
}
