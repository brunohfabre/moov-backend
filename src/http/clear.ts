import { FastifyInstance } from 'fastify'

import { redis } from '@/lib/redis'

export async function clear(app: FastifyInstance) {
  app.post('/clear', async (_, reply) => {
    await redis.flushall()

    return reply.status(204).send()
  })
}
