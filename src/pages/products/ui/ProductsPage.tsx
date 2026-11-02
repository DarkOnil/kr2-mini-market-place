import { useEffect, useState } from 'react'
import { getCategories } from '@/entities/category'
import type { Category } from '@/entities/category'
import { ProductCard } from '@/entities/product'
import { AddToCartButton } from '@/features/add-to-cart'
import { ProductFilters, sortProducts, useProductFilters } from '@/features/product-filters'
import { ToggleFavoriteButton } from '@/features/toggle-favorite'
import { PRODUCTS_LIMIT, useProducts } from '../model/useProducts'

export function ProductsPage() {
  const { filters, changeFilter, resetFilters } = useProductFilters()
  const { products, loading, error } = useProducts(filters)
  const [categories, setCategories] = useState<Category[]>([])

  const { page, sort } = filters

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  return (
    <main className="container">
      <h1>Каталог товаров</h1>
      <ProductFilters
        filters={filters}
        categories={categories}
        onChange={changeFilter}
        onReset={resetFilters}
      />
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && products.length === 0 && <p>Товары не найдены.</p>}
      <div className="product-grid">
        {sortProducts(products, sort).map((product) => (
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
      <div className="pagination">
        <button disabled={page === 1 || loading} onClick={() => changeFilter('page', String(page - 1))}>
          Назад
        </button>
        <span>Страница {page}</span>
        <button
          disabled={products.length < PRODUCTS_LIMIT || loading}
          onClick={() => changeFilter('page', String(page + 1))}
        >
          Далее
        </button>
      </div>
    </main>
  )
}
