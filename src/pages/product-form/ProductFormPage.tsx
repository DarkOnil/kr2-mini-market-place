import { Link } from 'react-router-dom'
import { useProductForm } from './model/useProductForm'
import type { ProductFormMode } from './model/useProductForm'

interface ProductFormPageProps {
  mode?: ProductFormMode
}

export function ProductFormPage({ mode = 'create' }: ProductFormPageProps) {
  const { edit, id, owned, loading, error, categories, values, setValue, submit } = useProductForm(mode)

  if (loading && owned)
    return (
      <main className="container">
        <p>Загрузка...</p>
      </main>
    )

  return (
    <main className="container form-page">
      <Link to={edit ? `/products/${id}` : '/'}>← Назад</Link>
      <h1>{edit ? 'Редактировать товар' : 'Добавить товар'}</h1>
      {edit && !owned && (
        <p className="error">Можно менять только товар, созданный вами в этом приложении.</p>
      )}
      {error && <p className="error">{error}</p>}
      {(!edit || owned) && (
        <form className="product-form" onSubmit={submit}>
          {!edit && (
            <label>
              Фамилия
              <input
                required
                value={values.surname}
                onChange={(e) => setValue('surname', e.target.value)}
                placeholder="Ivanov"
              />
            </label>
          )}
          <label>
            Название
            <input required value={values.title} onChange={(e) => setValue('title', e.target.value)} />
          </label>
          <label>
            Цена
            <input
              required
              type="number"
              min="0"
              value={values.price}
              onChange={(e) => setValue('price', e.target.value)}
            />
          </label>
          <label>
            Категория
            <select
              required
              value={values.categoryId}
              onChange={(e) => setValue('categoryId', e.target.value)}
            >
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Описание
            <textarea
              required
              value={values.description}
              onChange={(e) => setValue('description', e.target.value)}
            />
          </label>
          <label>
            Ссылка на картинку
            <input
              required
              type="url"
              value={values.image}
              onChange={(e) => setValue('image', e.target.value)}
            />
          </label>
          <button>{edit ? 'Сохранить' : 'Создать товар'}</button>
        </form>
      )}
    </main>
  )
}
