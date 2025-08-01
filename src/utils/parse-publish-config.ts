import { z } from 'zod'

const publishSourceSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    source: z.string().regex(/^gh:[^/]+\/[^/]+$/, "Must be in format 'gh:<owner>/<repo>'"),
  })
  .transform((data) => {
    const [provider, path] = data.source.split(':')
    const [owner, repo] = path.split('/')
    return {
      ...data,
      provider,
      owner,
      repo,
    }
  })

const publishFilterKeywordSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const publishFilterSchema = z.object({
  id: z.string(),
  keywords: z.array(publishFilterKeywordSchema),
  name: z.string(),
})

const publishConfigSchema = z.object({
  filters: z.array(publishFilterSchema),
  output: z.string(),
  sources: z.array(publishSourceSchema),
})

export function parsePublishConfig(content: string) {
  return publishConfigSchema.safeParse(JSON.parse(content))
}

export type PublishConfig = z.infer<typeof publishConfigSchema>
export type PublishFilter = z.infer<typeof publishFilterSchema>
export type PublishSource = z.infer<typeof publishSourceSchema>
