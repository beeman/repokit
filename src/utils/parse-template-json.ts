import { z } from 'zod'

const templateJsonTemplateSchema = z.object({
  description: z.string(),
  id: z.string(),
  keywords: z.array(z.string()),
  name: z.string(),
  path: z.string(),
})

const templateJsonGroupSchema = z.object({
  description: z.string(),
  name: z.string(),
  path: z.string(),
  templates: z.array(templateJsonTemplateSchema),
})

const templateJsonSchema = z.array(templateJsonGroupSchema)

export function parseTemplateJson(content: string) {
  return templateJsonSchema.safeParse(JSON.parse(content))
}

export type TemplateJson = z.infer<typeof templateJsonSchema>
export type TemplateJsonGroup = z.infer<typeof templateJsonGroupSchema>
export type TemplateJsonTemplate = z.infer<typeof templateJsonTemplateSchema>
