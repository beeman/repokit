import { z } from 'zod'

const templateScriptSchema = z
  .object({
    build: z.string(),
    ci: z.string(),
    dev: z.string().optional(),
    start: z.string().optional(),
  })
  .refine((scripts) => scripts.dev || scripts.start, {
    message: "The scripts object must contain 'build', 'ci', and at least one of 'dev' or 'start'",
  })

const templateSchema = z.object({
  description: z.string(),
  keywords: z.array(z.string()),
  name: z.string(),
  scripts: templateScriptSchema,
})

export function parsePackageJsonTemplate(content: string) {
  return templateSchema.safeParse(JSON.parse(content))
}

export type PackageJsonTemplate = z.infer<typeof templateSchema>
