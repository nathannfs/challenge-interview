import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from './../app'

export async function deleteProduct(app: FastifyInstance) {
  app.delete(
    '/products/:productId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        productId: z.string(),
      })

      const { productId } = paramsSchema.parse(request.params)

      const product = await prisma.product.findUnique({
        where: { id: productId },
      })

      if (!product) {
        throw new Error('Product not found!')
      }

      await prisma.product.delete({
        where: { id: productId },
      })

      return reply.status(201).send('Product deleted!')
    },
  )
}
