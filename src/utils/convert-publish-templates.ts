import { convertPublishTemplate, PublishTemplate } from './convert-publish-template'
import { PublishSource } from './parse-publish-config'
import { TemplateJsonTemplate } from './parse-template-json'

export async function convertPublishTemplates({
  source,
  templates,
  verbose,
}: {
  source: PublishSource
  templates: TemplateJsonTemplate[]
  verbose: boolean
}): Promise<PublishTemplate[]> {
  return Promise.all(templates.map((template) => convertPublishTemplate({ source, template, verbose })))
}
