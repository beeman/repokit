import { getTemplatesJsonUrl } from './get-templates-json-url'
import { PublishSource } from './parse-publish-config'
import { parseTemplateJson, TemplateJsonGroup } from './parse-template-json'

export async function fetchTemplatesJson(source: PublishSource, verbose: boolean): Promise<TemplateJsonGroup[]> {
  const url = getTemplatesJsonUrl(source)
  if (verbose) {
    console.log(`Fetching templates.json from ${source.provider}:${source.owner}/${source.repo}`, url)
  }
  const response = await fetch(url)

  const content = await response.json()

  const parsed = parseTemplateJson(JSON.stringify(content))
  if (parsed.success) {
    return parsed.data
  }
  throw new Error(`Error parsing templates.json (${url}): ${parsed.error.message}`)
}
