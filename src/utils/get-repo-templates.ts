import { readPackageJsonTemplate } from './read-package-json-template'
import { getDirectories } from './get-directories'
import { join } from 'node:path'

export interface RepoTemplate {
  description: string
  keywords: string[]
  path: string
  name: string
  id: string
}

export function getRepoTemplates({ cwd, group, repo }: { cwd: string; group: string; repo: string }): RepoTemplate[] {
  return getDirectories(join(cwd, group)).map((templatePath) => {
    const { description, keywords, name } = readPackageJsonTemplate(templatePath)

    const path = templatePath.replace(`${cwd}/`, '')

    return {
      description,
      id: `${repo}/${path}`,
      keywords,
      name,
      path,
    }
  })
}
