import { getTemplatesJsonUrl } from './get-templates-json-url'
import { PublishSource } from './parse-publish-config'
import { TemplateJsonGroup } from './parse-template-json'
import { fetchTemplatesJsonUrl } from './fetch-templates-json-url'

export async function fetchTemplatesJson(source: PublishSource, verbose: boolean): Promise<TemplateJsonGroup[]> {
  const url = getTemplatesJsonUrl(source)
  if (verbose) {
    console.log(`Fetching templates.json from ${source.provider}:${source.owner}/${source.repo}`, url)
  }
  return fetchTemplatesJsonUrl(url)
}
