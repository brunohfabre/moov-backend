import fastify from 'fastify'

import { appRoutes } from './routes'

const app = fastify()

app.register(appRoutes)

app
  .listen({ host: '0.0.0.0', port: 3333 })
  .then(() => console.log('Server running on port 3333.'))
