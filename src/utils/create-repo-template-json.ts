import { join } from 'node:path'
import { writeFileSync } from 'node:fs'
import { RepoTemplateGroup } from './get-repo-template-groups'

export async function createRepoTemplateJson(cwd: string, groups: RepoTemplateGroup[]) {
  const rootTemplatesJsonPath = join(cwd, 'templates.json')

  writeFileSync(rootTemplatesJsonPath, JSON.stringify(groups, undefined, 2) + '\n')
}
