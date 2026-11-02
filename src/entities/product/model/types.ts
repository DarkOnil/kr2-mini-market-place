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


export interface ProductPayload {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

export interface ProductsParams {
  offset?: number
  limit?: number
  title?: string
  categoryId?: string | number
  price_min?: string | number
  price_max?: string | number
}
