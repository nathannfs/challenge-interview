import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../app'

export async function createProduct(app: FastifyInstance) {
  app.post(
    '/products',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bodySchema = z.object({
        title: z.string(),
        description: z.string(),
        price: z.string(),
      })

      const { title, description, price } = bodySchema.parse(request.body)

      if (!title || !description || !price) {
        throw new Error('Title, description and price are required!')
      }

      const response = await prisma.product.create({
        data: {
          title,
          description,
          price,
        },
      })

      return reply.status(201).send({
        productId: response.id,
      })
    },
  )
}
