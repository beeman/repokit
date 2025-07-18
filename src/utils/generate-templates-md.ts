import { RepoGroup } from './get-repo-groups'
import { log } from '@clack/prompts'
import { getRepoGroupReadmeContent } from './get-repo-group-readme-content'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Generates the TEMPLATES.md and templates.json files for the given groups.
 *
 * @param groups - The groups to generate the TEMPLATES.md and templates.json files for.
 * @param path - The path to generate the TEMPLATES.md and templates.json files in.
 * @param verbose - Whether to print verbose output.
 */
export async function generateTemplatesMd({
  groups,
  path,
  verbose,
}: {
  groups: RepoGroup[]
  path: string
  verbose: boolean
}) {
  const lines: string[] = []
  for (const group of groups) {
    if (verbose) {
      log.warn(`Generating README for ${group.name}`)
    }
    lines.push(...getRepoGroupReadmeContent(group))
  }
  log.info(`Generating TEMPLATES.md`)
  await writeFile(join(path, 'TEMPLATES.md'), lines.join('\n'))
}
