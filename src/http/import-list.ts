import { FastifyInstance } from 'fastify'
import fs from 'node:fs'
import http from 'node:http'
import { z } from 'zod'

import { redis } from '@/lib/redis'

export async function importList(app: FastifyInstance) {
  app.post('/imports', async (request, reply) => {
    const bodySchema = z.object({
      url: z.string().url(),
    })

    const { url } = bodySchema.parse(request.body)

    // const response = await fetch(url)
    // const result = await response.text()

    const result = fs.readFileSync('file.m3u').toString()

    const data = result
      .slice(result.indexOf('#EXTINF:-1'))
      .split('#EXTINF:-1')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => item.split('\n'))
      .map(([inlineInfo, fileUrl]) => {
        const infoArray = inlineInfo.split('"').map((item) => item.trim())

        const name = infoArray[1]
        const image = infoArray[3]
        const category =
          infoArray[5]
            .split('|')
            .map((tag) => tag.trim())[0]
            .toLowerCase()
            .replace(':', '')
            .replace(/\s/g, '-') ?? ''

        return {
          name,
          image,
          category,
          fileUrl,
        }
      })

    return {
      data,
    }
  })
}
