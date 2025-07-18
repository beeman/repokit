import { PackageJsonTemplate, parsePackageJsonTemplate } from './parse-package-json-template'
import { ensurePackageJson } from './ensure-package-json'

/**
 * Reads the package.json file of the given repokit template.
 *
 * @param path - The path to the repokit template.
 * @returns The parsed package.json template object.
 * @throws If the package.json file is not found or if it is not a repokit template.
 */
export function ensurePackageJsonTemplate(path: string): PackageJsonTemplate {
  const content = ensurePackageJson(path)
  const result = parsePackageJsonTemplate(content)
  if (result.success) {
    return result.data
  }
  throw new Error(`Error in template ${path}/package.json: ${result.error.message}`)
}
