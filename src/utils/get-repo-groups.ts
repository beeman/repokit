import { ensurePackageJsonRepo } from './ensure-package-json-repo'
import { getRepoTemplates, RepoTemplate } from './get-repo-templates'

export interface RepoGroup {
  description: string
  path: string
  name: string
  templates: RepoTemplate[]
}

/**
 * Gets the repo groups with their templates for the given repokit repo.
 *
 * @param path - The path to the repokit repo.
 * @returns The repo groups with their templates.
 */
export function getRepoGroups(path: string): RepoGroup[] {
  const { repokit, repository } = ensurePackageJsonRepo(path)
  const groups = repokit.groups ?? []

  if (!groups?.length) {
    throw new Error(`Property 'repokit.groups' not found in package.json`)
  }

  return groups.map((group) => {
    return {
      ...group,
      templates: getRepoTemplates({ path, group: group.path, prefix: `gh:${repository.name}` }),
    }
  })
}
