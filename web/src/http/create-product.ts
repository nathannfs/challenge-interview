import { api } from './api-client'

interface CreateProduct {
  title: string
  description: string
  price: string
}

export async function createProduct({
  title,
  description,
  price,
}: CreateProduct): Promise<void> {
  await api.post('products', {
    json: {
      title,
      description,
      price,
    },
  })
}
