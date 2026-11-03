import { deleteProduct, isOwnedProduct, removeOwnedProduct } from '@/entities/product'

interface DeleteProductButtonProps {
  productId: string | number
  onDeleted: () => void
  onError: (message: string) => void
}

export function DeleteProductButton({ productId, onDeleted, onError }: DeleteProductButtonProps) {
  async function handleClick() {
    if (!isOwnedProduct(productId) || !window.confirm('Удалить свой товар?')) return

    try {
      await deleteProduct(productId)
      removeOwnedProduct(productId)
      onDeleted()
    } catch {
      onError('Не удалось удалить товар.')
    }
  }

  return <button onClick={handleClick}>Удалить</button>
}
