import { readPackageJsonRepokit } from './read-package-json-repokit'
import { getRepoTemplates, RepoTemplate } from './get-repo-templates'

export interface RepoTemplateGroup {
  description: string
  path: string
  name: string
  templates: RepoTemplate[]
}

export function getRepoTemplateGroups(cwd: string): RepoTemplateGroup[] {
  const packageJson = readPackageJsonRepokit(cwd)
  const items = packageJson.repokit.groups ?? []

  if (!items || items.length === 0) {
    throw new Error(`Property repokit.groups not found in package.json`)
  }

  return items.map((group) => {
    return {
      ...group,
      templates: getRepoTemplates({ cwd: `${cwd}/${group.path}`, repo: `gh:${packageJson.repository.name}` }),
    }
  })
}
