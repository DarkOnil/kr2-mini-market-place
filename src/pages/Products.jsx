import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCategories, getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'

const LIMIT = 12

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const title = params.get('title') || ''
  const categoryId = params.get('categoryId') || ''
  const min = params.get('price_min') || ''
  const max = params.get('price_max') || ''
  const page = Number(params.get('page') || 1)
  const sort = params.get('sort') || 'newest'

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    Promise.resolve().then(() => {
      setLoading(true)
      setError('')
      return getProducts({
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        title: title || undefined,
        categoryId: categoryId || undefined,
        price_min: min || undefined,
        price_max: max || undefined
      })
    }).then(data => setProducts(data))
      .catch(() => setError('Не удалось загрузить товары. Проверьте интернет и попробуйте ещё раз.'))
      .finally(() => setLoading(false))
  }, [title, categoryId, min, max, page])

  function changeFilter(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next)
  }

  const sorted = [...products]
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  if (sort === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title))

  return <main className="container">
    <h1>Каталог товаров</h1>
    <div className="filters">
      <input placeholder="Поиск по названию" value={title} onChange={e => changeFilter('title', e.target.value)} />
      <select value={categoryId} onChange={e => changeFilter('categoryId', e.target.value)}>
        <option value="">Все категории</option>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <input type="number" min="0" placeholder="Цена от" value={min} onChange={e => changeFilter('price_min', e.target.value)} />
      <input type="number" min="0" placeholder="Цена до" value={max} onChange={e => changeFilter('price_max', e.target.value)} />
      <select value={sort} onChange={e => changeFilter('sort', e.target.value)}>
        <option value="newest">Сначала новые</option>
        <option value="price-asc">Сначала дешевле</option>
        <option value="price-desc">Сначала дороже</option>
        <option value="title">По названию</option>
      </select>
      <button onClick={() => setParams({})}>Сбросить</button>
    </div>
    {loading && <p>Загрузка...</p>}
    {error && <p>{error}</p>}
    {!loading && !error && products.length === 0 && <p>Товары не найдены.</p>}
    <div className="product-grid">{sorted.map(product => <ProductCard key={product.id} product={product} />)}</div>
    <div className="pagination">
      <button disabled={page === 1 || loading} onClick={() => changeFilter('page', String(page - 1))}>Назад</button>
      <span>Страница {page}</span>
      <button disabled={products.length < LIMIT || loading} onClick={() => changeFilter('page', String(page + 1))}>Далее</button>
    </div>
  </main>
}
