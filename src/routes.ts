import { FastifyInstance } from 'fastify'

import { getList } from './http/get-list'
import { helloWorld } from './http/hello-world'

export async function appRoutes(app: FastifyInstance) {
  app.register(helloWorld)
  app.register(getList)
}
