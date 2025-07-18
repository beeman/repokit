import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

/**
 * Ensures that the given path has a package.json file.
 *
 * @param path - The path to the directory to check.
 * @returns The content of the package.json file.
 * @throws If the package.json file is not found.
 */
export function ensurePackageJson(path: string): string {
  const packageJsonPath = join(path, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(`No package.json found at ${packageJsonPath}`)
  }
  return readFileSync(packageJsonPath, 'utf8')
}
