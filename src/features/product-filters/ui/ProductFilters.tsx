import type { Category } from '@/entities/category'
import { SORT_OPTIONS } from '../model/types'
import type { FilterKey, ProductFilters as ProductFiltersValue } from '../model/types'

interface ProductFiltersProps {
  filters: ProductFiltersValue
  categories: Category[]
  onChange: (key: FilterKey, value: string) => void
  onReset: () => void
}

export function ProductFilters({ filters, categories, onChange, onReset }: ProductFiltersProps) {
  return (
    <div className="filters">
      <input
        placeholder="Поиск по названию"
        value={filters.title}
        onChange={(e) => onChange('title', e.target.value)}
      />
      <select value={filters.categoryId} onChange={(e) => onChange('categoryId', e.target.value)}>
        <option value="">Все категории</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="0"
        placeholder="Цена от"
        value={filters.min}
        onChange={(e) => onChange('price_min', e.target.value)}
      />
      <input
        type="number"
        min="0"
        placeholder="Цена до"
        value={filters.max}
        onChange={(e) => onChange('price_max', e.target.value)}
      />
      <select value={filters.sort} onChange={(e) => onChange('sort', e.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button onClick={onReset}>Сбросить</button>
    </div>
  )
}
