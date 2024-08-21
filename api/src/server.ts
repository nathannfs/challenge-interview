import { app } from './app'
import { env } from './env/index'
import { createProduct } from './routes/create-product'
import { deleteProduct } from './routes/delete-project'
import { getProducts } from './routes/get-products'
import { updateProduct } from './routes/update-product'

import fastifyCors from '@fastify/cors'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running!')
  })

app.register(fastifyCors)

app.register(createProduct)
app.register(getProducts)
app.register(updateProduct)
app.register(deleteProduct)
