import { FastifyInstance } from 'fastify'

import { importList } from './http/import-list'

export async function appRoutes(app: FastifyInstance) {
  app.register(importList)
}
