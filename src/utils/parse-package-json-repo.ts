import { z } from 'zod'

const repoRepokitGroupSchema = z.object({
  description: z.string(),
  name: z.string(),
  path: z.string(),
})

const repoRepokitSchema = z.object({
  groups: z.array(repoRepokitGroupSchema).optional(),
})

const repoRepositorySchema = z.object({
  name: z.string(),
  type: z.string(),
  url: z.string(),
})

const repoSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  repokit: repoRepokitSchema,
  repository: repoRepositorySchema,
})

export function parsePackageJsonRepo(content: string) {
  return repoSchema.safeParse(JSON.parse(content))
}

export type PackageJsonRepo = z.infer<typeof repoSchema>
