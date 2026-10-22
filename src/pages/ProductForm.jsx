import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createProduct, getCategories, getProduct, updateProduct } from '../api/products'

export default function ProductForm({ mode = 'create' }) {
  const edit = mode === 'edit'
  const { id } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')
  const [surname, setSurname] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState('https://placehold.co/300x200?text=Product')
  const [loading, setLoading] = useState(edit)
  const [error, setError] = useState('')
  const ownedIds = JSON.parse(localStorage.getItem('my-marketplace-products') || '[]')
  const owned = ownedIds.includes(Number(id))

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
      if (data.length) setCategoryId(String(data[0].id))
    }).catch(() => setError('Не удалось загрузить категории.'))
  }, [])

  useEffect(() => {
    if (!edit) return
    if (!owned) return
    getProduct(id).then(product => {
      setTitle(product.title || '')
      setPrice(String(product.price || ''))
      setDescription(product.description || '')
      setCategoryId(String(product.category?.id || ''))
      setImage(product.images?.[0] || '')
    }).catch(() => setError('Не удалось загрузить товар.'))
      .finally(() => setLoading(false))
  }, [edit, id, owned])

  async function submit(event) {
    event.preventDefault()
    setError('')
    const product = {
      title: edit ? title : `${surname.trim()} ${title.trim()}`,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [image]
    }
    try {
      if (edit) {
        await updateProduct(id, product)
        navigate(`/products/${id}`)
      } else {
        const created = await createProduct(product)
        const ids = JSON.parse(localStorage.getItem('my-marketplace-products') || '[]')
        ids.push(Number(created.id))
        localStorage.setItem('my-marketplace-products', JSON.stringify(ids))
        navigate(`/products/${created.id}`)
      }
    } catch {
      setError('Не удалось сохранить товар. Проверьте данные и попробуйте снова.')
    }
  }

  if (loading && owned) return <main className="container"><p>Загрузка...</p></main>
  return <main className="container form-page">
    <Link to={edit ? `/products/${id}` : '/'}>← Назад</Link>
    <h1>{edit ? 'Редактировать товар' : 'Добавить товар'}</h1>
    {edit && !owned && <p className="error">Можно менять только товар, созданный вами в этом приложении.</p>}
    {error && <p className="error">{error}</p>}
    {(!edit || owned) && <form className="product-form" onSubmit={submit}>
      {!edit && <label>Фамилия<input required value={surname} onChange={e => setSurname(e.target.value)} placeholder="Ivanov" /></label>}
      <label>Название<input required value={title} onChange={e => setTitle(e.target.value)} /></label>
      <label>Цена<input required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} /></label>
      <label>Категория<select required value={categoryId} onChange={e => setCategoryId(e.target.value)}>{categories.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label>Описание<textarea required value={description} onChange={e => setDescription(e.target.value)} /></label>
      <label>Ссылка на картинку<input required type="url" value={image} onChange={e => setImage(e.target.value)} /></label>
      <button>{edit ? 'Сохранить' : 'Создать товар'}</button>
    </form>}
  </main>
}
