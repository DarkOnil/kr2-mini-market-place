import { baseApi } from '@/shared/api'
import type { Product, ProductPayload, ProductsParams } from '../model/types'

export const getProducts = (params?: ProductsParams): Promise<Product[]> =>
  baseApi.get<Product[]>('/products', { params }).then((res) => res.data)

export const getProduct = (id: string | number): Promise<Product> =>
  baseApi.get<Product>(`/products/${id}`).then((res) => res.data)

export const createProduct = (product: ProductPayload): Promise<Product> =>
  baseApi.post<Product>('/products/', product).then((res) => res.data)

export const updateProduct = (id: string | number, product: ProductPayload): Promise<Product> =>
  baseApi.put<Product>(`/products/${id}`, product).then((res) => res.data)

export const deleteProduct = (id: string | number): Promise<boolean> =>
  baseApi.delete<boolean>(`/products/${id}`).then((res) => res.data)
