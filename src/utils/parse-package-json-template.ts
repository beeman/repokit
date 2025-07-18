import { z } from 'zod'

export const packageJsonTemplateSchema = z.object({
  name: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  scripts: z
    .object({
      build: z.string(),
      ci: z.string(),
      dev: z.string().optional(),
      start: z.string().optional(),
    })
    .refine((scripts) => scripts.dev || scripts.start, {
      message: "The scripts object must contain 'build', 'ci', and at least one of 'dev' or 'start'",
    }),
})

export function parsePackageJsonTemplate(content: string) {
  return packageJsonTemplateSchema.safeParse(JSON.parse(content))
}

export type PackageJsonTemplate = z.infer<typeof packageJsonTemplateSchema>
