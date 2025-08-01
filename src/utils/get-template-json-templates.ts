import { PublishSource } from './parse-publish-config'
import { TemplateJsonGroup, TemplateJsonTemplate } from './parse-template-json'
import { log } from '@clack/prompts'

export async function getTemplateJsonTemplates({
  groups,
  source,
  verbose,
}: {
  groups: TemplateJsonGroup[]
  source: PublishSource
  verbose: boolean
}): Promise<TemplateJsonTemplate[]> {
  const tag = `[${source.id}]`

  if (groups.length === 0) {
    log.warn(`${tag} No template groups found`)
    return []
  }
  const templates = groups.flatMap((group) => group.templates)

  if (templates.length === 0) {
    log.warn(`${tag} No templates found`)
    return []
  }
  if (verbose) {
    log.info(`${tag} Found ${templates.length} templates: ${templates.map((template) => template.name).join(', ')}`)
  }
  return templates
}
