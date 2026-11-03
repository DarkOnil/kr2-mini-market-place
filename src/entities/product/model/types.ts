import type { Category } from '@/entities/category'

export interface Product {
  id: number
  title: string
  slug?: string
  price: number
  description: string
  category: Category
  images: string[]
  creationAt?: string
  updatedAt?: string
}

/** Тело запроса на создание / обновление товара */
export interface ProductPayload {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

/** Query-параметры списка товаров */
export interface ProductsParams {
  offset?: number
  limit?: number
  title?: string
  categoryId?: string | number
  price_min?: string | number
  price_max?: string | number
}
