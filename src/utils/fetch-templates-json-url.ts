import { parseTemplateJson, TemplateJsonGroup } from './parse-template-json'

export async function fetchTemplatesJsonUrl(url: string): Promise<TemplateJsonGroup[]> {
  if (!url?.length || !url.startsWith('http')) {
    throw new Error(`Invalid url: ${url?.length > 0 ? url : 'NO URL PROVIDED'}`)
  }
  const response = await fetch(url)

  const content = await response.json()

  const parsed = parseTemplateJson(JSON.stringify(content))
  if (parsed.success) {
    return parsed.data
  }
  throw new Error(`Error parsing templates.json (${url}): ${parsed.error.message}`)
}
