import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from './../app'

export async function updateProduct(app: FastifyInstance) {
  app.put(
    '/products/:productId',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bodySchema = z.object({
        title: z.string().nullish(),
        description: z.string().nullish(),
        price: z.string().nullish(),
      })

      const paramsSchema = z.object({
        productId: z.string().uuid(),
      })

      const { productId } = paramsSchema.parse(request.params)

      const { title, description, price } = bodySchema.parse(request.body)

      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      })

      if (!product) {
        throw new Error('Product not found!')
      }

      await prisma.product.update({
        where: { id: productId },
        data: {
          title: title ?? product.title,
          description: description ?? product.description,
          price: price ?? product.price,
        },
      })

      return reply.status(201).send('Product updated!')
    },
  )
}
