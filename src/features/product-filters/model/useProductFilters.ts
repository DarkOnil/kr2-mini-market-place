import { useSearchParams } from 'react-router-dom'
import { isSortOption } from './types'
import type { FilterKey, ProductFilters } from './types'

export function useProductFilters() {
  const [params, setParams] = useSearchParams()

  const sortParam = params.get('sort')

  const filters: ProductFilters = {
    title: params.get('title') || '',
    categoryId: params.get('categoryId') || '',
    min: params.get('price_min') || '',
    max: params.get('price_max') || '',
    page: Number(params.get('page') || 1),
    sort: isSortOption(sortParam) ? sortParam : 'newest',
  }

  function changeFilter(key: FilterKey, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next)
  }

  function resetFilters() {
    setParams({})
  }

  return { filters, changeFilter, resetFilters }
}
