import { readPackageJsonTemplate } from './read-package-json-template'
import { getDirectories } from './get-directories'

export interface RepoTemplate {
  description: string
  keywords: string[]
  path: string
  name: string
  id: string
}

export function getRepoTemplates({ cwd, repo }: { cwd: string; repo: string }): RepoTemplate[] {
  return getDirectories(cwd).map((path) => {
    const { description, keywords, name } = readPackageJsonTemplate(path)

    return { description, id: `${repo}/${path}`, keywords, name, path }
  })
}
