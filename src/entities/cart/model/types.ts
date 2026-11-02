import type { Product } from '@/entities/product'

export interface CartItem extends Product {
  quantity: number
}
