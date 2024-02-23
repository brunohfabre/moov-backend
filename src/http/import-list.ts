import { FastifyInstance } from 'fastify'
import fs from 'node:fs'
import slugify from 'slugify'
import { z } from 'zod'

export async function importList(app: FastifyInstance) {
  app.post('/imports', async (request, reply) => {
    const bodySchema = z.object({
      url: z.string().url(),
    })

    const { url } = bodySchema.parse(request.body)

    if (fs.existsSync('list.m3u')) {
      return reply.status(200).send()
    }

    const response = await fetch(url)
    const result = await response.text()

    const data = result
      .slice(result.indexOf('#EXTINF:-1'))
      .split('#EXTINF:-1')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => item.split('\n'))
      .map(([inlineInfo, fileUrl]) => {
        const infoArray = inlineInfo.split('"').map((item) => item.trim())

        const name = infoArray[1]
        const slug = slugify(name, {
          lower: true,
        })
        const isSerie = /S\d*E\d*/g.test(infoArray[1])
        const image = infoArray[3]
        const category =
          infoArray[5]
            .split('|')
            .map((tag) => tag.trim())[0]
            .toLowerCase()
            .replace(/:/g, '')
            .replace(/\s/g, '-')
            .replace(/./g, '-') ?? ''

        return {
          name,
          slug,
          image,
          category,
          fileUrl,
          isSerie,
        }
      })

    fs.writeFileSync('list.m3u', JSON.stringify(data))

    return reply.status(204).send()
  })
}
