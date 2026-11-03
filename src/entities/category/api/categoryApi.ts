import { baseApi } from '@/shared/api'
import type { Category } from '../model/types'

const VALID_CATEGORY_NAMES = [
  'clothes',
  'clothing',
  'electronics',
  'electronic',
  'furniture',
  'shoes',
  'miscellaneous',
  'other',
]

export const getCategories = (): Promise<Category[]> =>
  baseApi.get<Category[]>('/categories').then((res) =>
    res.data.filter((category) => {
      const name = String(category.name || '')
        .replace(/\s*from config/gi, '')
        .trim()
        .toLowerCase()

      return VALID_CATEGORY_NAMES.includes(name)
    }),
  )
