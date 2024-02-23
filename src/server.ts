import fastify from 'fastify'

import fastifyCors from '@fastify/cors'

import { appRoutes } from './routes'

const app = fastify()

app.register(fastifyCors)
app.register(appRoutes)

app
  .listen({ host: '0.0.0.0', port: 3434 })
  .then(() => console.log('Server running on port 3434.'))
