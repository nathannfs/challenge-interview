import type { FastifyInstance } from 'fastify'
import { prisma } from '../app'

export async function getProducts(app: FastifyInstance) {
  app.get('/products', async () => {
    const products = await prisma.product.findMany()

    return { products }
  })
}
