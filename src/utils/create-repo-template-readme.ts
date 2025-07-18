import { RepoTemplateGroup } from './get-repo-template-groups'

export function createRepoTemplateReadme({ description, path, name, templates }: RepoTemplateGroup) {
  const lines: string[] = []

  lines.push(`# ${name}\n`)
  lines.push(`${description}\n`)

  for (const template of templates) {
    const { description, name, keywords } = template
    lines.push(`### [${name}](${path}/${name})\n`)
    lines.push(`> ${description}\n`)
    lines.push(`${keywords.map((keyword) => '`' + keyword + '`').join(' ')}\n`)
  }

  return lines
}
