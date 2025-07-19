import { getRepoUrl } from './get-repo-url'
import { fetchRepoReadmeContent } from './fetch-repo-readme-content'
import { convertMarkdownToHtml } from './convert-markdown-to-html'
import { PublishSource } from './parse-publish-config'
import { TemplateJsonTemplate } from './parse-template-json'

export type PublishTemplate = TemplateJsonTemplate & {
  readme: string
  repoUrl: string
  source: PublishSource
}

export async function convertPublishTemplate({
  source,
  template,
  verbose,
}: {
  source: PublishSource
  template: TemplateJsonTemplate
  verbose: boolean
}): Promise<PublishTemplate> {
  const content = await fetchRepoReadmeContent({
    owner: source.owner,
    path: template.path,
    repo: source.repo,
    verbose,
  })
  const readme = await convertMarkdownToHtml({ content, verbose })
  // TODO: get preview image if available
  return {
    source,
    ...template,
    readme,
    repoUrl: getRepoUrl({ owner: source.owner, path: template.path, repo: source.repo }),
  }
}
