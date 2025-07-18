import { PackageJsonRepo, parsePackageJsonRepo } from './parse-package-json-repo'
import { ensurePackageJson } from './ensure-package-json'

/**
 * Reads the package.json file of the given repokit repo.
 *
 * @param path - The path to the repokit repo.
 * @returns The parsed package.json repokit object.
 * @throws If the package.json file is not found or if it is not a repokit repo.
 */
export function ensurePackageJsonRepo(path: string): PackageJsonRepo {
  const content = ensurePackageJson(path)
  const result = parsePackageJsonRepo(content)
  if (result.success) {
    return result.data
  }
  throw new Error(`Error in repo ${path}/package.json: ${result.error.message}`)
}
