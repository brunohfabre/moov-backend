import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'

import { redis } from '../lib/redis'

export async function helloWorld(app: FastifyInstance) {
  app.get('/', async () => {
    const items = new Array(1000000).fill('')

    for (const item of items) {
      await redis.lpush('items', randomUUID())
    }

    return { hello: 'world' }
  })
}
