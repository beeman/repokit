import { PackageJsonTemplate, parsePackageJsonTemplate } from './parse-package-json-template'
import { readPackageJson } from './read-package-json'

export function readPackageJsonTemplate(cwd: string): PackageJsonTemplate {
  const packageJson = readPackageJson(cwd)
  const result = parsePackageJsonTemplate(packageJson)
  if (result.success) {
    return result.data
  }
  throw new Error(`Error in template ${cwd}/package.json: ${result.error.message}`)
}
