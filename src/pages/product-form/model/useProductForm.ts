import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories } from '@/entities/category'
import type { Category } from '@/entities/category'
import {
  addOwnedProduct,
  createProduct,
  getProduct,
  isOwnedProduct,
  updateProduct,
} from '@/entities/product'
import type { ProductPayload } from '@/entities/product'
import { PLACEHOLDER_CARD_IMAGE } from '@/shared/config'

export type ProductFormMode = 'create' | 'edit'

export interface ProductFormValues {
  title: string
  surname: string
  price: string
  description: string
  categoryId: string
  image: string
}

const INITIAL_VALUES: ProductFormValues = {
  title: '',
  surname: '',
  price: '',
  description: '',
  categoryId: '',
  image: PLACEHOLDER_CARD_IMAGE,
}

export function useProductForm(mode: ProductFormMode) {
  const edit = mode === 'edit'
  const { id } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [values, setValues] = useState<ProductFormValues>(INITIAL_VALUES)
  const [loading, setLoading] = useState(edit)
  const [error, setError] = useState('')
  const owned = isOwnedProduct(id)

  function setValue<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
        if (data.length) setValue('categoryId', String(data[0].id))
      })
      .catch(() => setError('Не удалось загрузить категории.'))
  }, [])

  useEffect(() => {
    if (!edit || !owned || !id) return
    getProduct(id)
      .then((product) => {
        setValues((prev) => ({
          ...prev,
          title: product.title || '',
          price: String(product.price || ''),
          description: product.description || '',
          categoryId: String(product.category?.id || ''),
          image: product.images?.[0] || '',
        }))
      })
      .catch(() => setError('Не удалось загрузить товар.'))
      .finally(() => setLoading(false))
  }, [edit, id, owned])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const product: ProductPayload = {
      title: edit ? values.title : `${values.surname.trim()} ${values.title.trim()}`,
      price: Number(values.price),
      description: values.description,
      categoryId: Number(values.categoryId),
      images: [values.image],
    }
    try {
      if (edit && id) {
        await updateProduct(id, product)
        navigate(`/products/${id}`)
      } else {
        const created = await createProduct(product)
        addOwnedProduct(created.id)
        navigate(`/products/${created.id}`)
      }
    } catch {
      setError('Не удалось сохранить товар. Проверьте данные и попробуйте снова.')
    }
  }

  return { edit, id, owned, loading, error, categories, values, setValue, submit }
}
