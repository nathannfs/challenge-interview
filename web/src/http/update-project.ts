import { api } from './api-client'

interface Product {
  title: string
  description: string
  price: string
}

interface UpdateProductInput {
  productId: string
  title?: string
  description?: string
  price?: string
}

export async function updateProduct({
  productId,
  title,
  description,
  price,
}: UpdateProductInput): Promise<void> {
  const currentProductResponse = await api.get<Product>(`products`)
  const currentProduct = await currentProductResponse.json()

  const updatedProduct = {
    title: title ?? currentProduct.title,
    description: description ?? currentProduct.description,
    price: price ?? currentProduct.price,
  }

  await api.put(`products/${productId}`, {
    json: updatedProduct,
  })
}
