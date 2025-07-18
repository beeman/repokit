import { ensurePackageJsonTemplate } from './ensure-package-json-template'
import { getDirs } from './get-dirs'
import { join } from 'node:path'

export interface RepoTemplate {
  description: string
  keywords: string[]
  path: string
  name: string
  id: string
}

/**
 * Gets the repo templates for the given repokit repo.
 *
 * @param path - The path to the repokit repo.
 * @param group - The group to get the templates from.
 * @param prefix - The prefix for the template id.
 * @returns The repo templates.
 */
export function getRepoTemplates({
  path,
  group,
  prefix,
}: {
  path: string
  group: string
  prefix: string
}): RepoTemplate[] {
  return getDirs(join(path, group)).map((directory) => {
    const { description, keywords, name } = ensurePackageJsonTemplate(directory)

    const templatePath = directory.replace(`${path}/`, '')

    return {
      description,
      id: `${prefix}/${templatePath}`,
      keywords,
      name,
      path: templatePath,
    }
  })
}
