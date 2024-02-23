import { FastifyInstance } from 'fastify'

import { clear } from './http/clear'
import { importList } from './http/import-list'

export async function appRoutes(app: FastifyInstance) {
  app.register(importList)

  app.register(clear)
}
