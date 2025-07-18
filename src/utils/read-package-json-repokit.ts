import { PackageJsonRepo, parsePackageJsonRepokit } from './parse-package-json-repokit'
import { readPackageJson } from './read-package-json'

export function readPackageJsonRepokit(cwd: string): PackageJsonRepo {
  const packageJson = readPackageJson(cwd)
  const result = parsePackageJsonRepokit(packageJson)
  if (result.success) {
    return result.data
  }
  throw new Error(`Error in repo ${cwd}/package.json: ${result.error.message}`)
}
