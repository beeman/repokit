import { z } from 'zod'

export const packageJsonRepokitGroup = z.object({
  description: z.string(),
  name: z.string(),
  path: z.string(),
})

export const packageJsonRepokit = z.object({
  groups: z.array(packageJsonRepokitGroup),
})

export const packageJsonRepository = z.object({
  name: z.string(),
  type: z.string(),
  url: z.string(),
})

export const packageJsonRepo = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  repokit: packageJsonRepokit,
  repository: packageJsonRepository,
})

export function parsePackageJsonRepokit(content: string) {
  return packageJsonRepo.safeParse(JSON.parse(content))
}

export type PackageJsonRepo = z.infer<typeof packageJsonRepo>
