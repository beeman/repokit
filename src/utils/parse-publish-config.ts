import { z } from 'zod'

const siteConfigSourceSchema = z
  .object({
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

const siteConfigFilterKeywordSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const siteConfigFilterSchema = z.object({
  id: z.string(),
  keywords: z.array(siteConfigFilterKeywordSchema),
  name: z.string(),
})

const siteConfigSchema = z.object({
  filters: z.array(siteConfigFilterSchema),
  output: z.string(),
  sources: z.array(siteConfigSourceSchema),
})

export function parsePublishConfig(content: string) {
  return siteConfigSchema.safeParse(JSON.parse(content))
}

export type PublishConfig = z.infer<typeof siteConfigSchema>
export type PublishSource = z.infer<typeof siteConfigSourceSchema>
