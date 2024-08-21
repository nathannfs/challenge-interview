import { api } from './api-client'

interface GetProducts {
  products: {
    id: string
    title: string
    description: string
    price: string
  }[]
}

export async function getProducts() {
  const products = await api.get<GetProducts>('products').json()

  return products
}
