import { PublishSource } from './parse-publish-config'
import { PublishTemplate } from './convert-publish-template'
import { fetchTemplatesJson } from './fetch-templates-json'
import { getTemplateJsonTemplates } from './get-template-json-templates'
import { convertPublishTemplates } from './convert-publish-templates'
import { log } from '@clack/prompts'

export async function getTemplatesForSources({
  sources,
  verbose,
}: {
  sources: PublishSource[]
  verbose: boolean
}): Promise<PublishTemplate[]> {
  const result: PublishTemplate[] = []

  for (const source of sources) {
    log.info(`Fetching templates for ${source.id}`)
    try {
      const groups = await fetchTemplatesJson(source, verbose)
      const templates = await getTemplateJsonTemplates({ groups, source, verbose })
      const converted = await convertPublishTemplates({ source, templates, verbose })
      result.push(...converted)
    } catch (error) {
      console.error(`[${source.id}] Error fetching templates: ${error}`)
    }
  }

  return result
}
