export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'title'
export type FilterKey = 'title' | 'categoryId' | 'price_min' | 'price_max' | 'page' | 'sort'

export interface ProductFilters {
  title: string
  categoryId: string
  min: string
  max: string
  page: number
  sort: SortOption
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'title', label: 'По названию' },
]

export const isSortOption = (value: string | null): value is SortOption =>
  SORT_OPTIONS.some((option) => option.value === value)
