import { readJson, writeJson } from '@/shared/lib'

const OWNED_PRODUCTS_KEY = 'my-marketplace-products'

export const getOwnedProductIds = (): number[] => readJson<number[]>(OWNED_PRODUCTS_KEY, [])

export const isOwnedProduct = (id: string | number | undefined): boolean =>
  getOwnedProductIds().includes(Number(id))

export function addOwnedProduct(id: number | string): void {
  writeJson(OWNED_PRODUCTS_KEY, [...getOwnedProductIds(), Number(id)])
}

export function removeOwnedProduct(id: number | string): void {
  writeJson(
    OWNED_PRODUCTS_KEY,
    getOwnedProductIds().filter((item) => item !== Number(id)),
  )
}
