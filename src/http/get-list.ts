import { FastifyInstance } from 'fastify'

import { redis } from '../lib/redis'

export async function getList(app: FastifyInstance) {
  app.get('/list', async () => {
    const itemsLength = await redis.llen('items')

    console.time('Get list items')

    const items = await redis.lrange('items', 0, itemsLength)

    console.timeEnd('Get list items')

    return { items }
  })
}
