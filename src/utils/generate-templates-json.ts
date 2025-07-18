import { RepoGroup } from './get-repo-groups'
import { log } from '@clack/prompts'
import { join } from 'node:path'
import { writeFileSync } from 'node:fs'

/**
 * Generates the templates.json file for the given groups.
 *
 * @param groups - The groups to generate the templates.json file for.
 * @param path - The path to generate the templates.json file in.
 */
export async function generateTemplatesJson({ groups, path }: { groups: RepoGroup[]; path: string }) {
  log.info(`Generating templates.json`)
  const rootTemplatesJsonPath = join(path, 'templates.json')

  writeFileSync(rootTemplatesJsonPath, JSON.stringify(groups, undefined, 2) + '\n')
}
