import { RepoGroup } from './get-repo-groups'

/**
 * Gets the content of the README.md file for the given repo group.
 *
 * @param group - The repo group.
 * @returns The content of the README.md file.
 */
export function getRepoGroupReadmeContent({ description, path, name, templates }: RepoGroup): string[] {
  const lines: string[] = []

  lines.push(`# ${name}\n`)
  lines.push(`${description}\n`)

  for (const template of templates) {
    const { description, id, name, keywords } = template
    lines.push(`### [${name}](${path}/${name})\n`)
    lines.push(`${backtick(id)}\n`)
    lines.push(`> ${description}\n`)
    lines.push(`${keywords.map((keyword) => backtick(keyword)).join(' ')}\n`)
  }

  return lines
}

function backtick(str: string) {
  return `\`${str}\``
}
