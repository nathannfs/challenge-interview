import { api } from './api-client'

interface DeleteProduct {
  productId: string
}

export async function deleteProduct({
  productId,
}: DeleteProduct): Promise<void> {
  await api.delete(`products/${productId}`)
}
