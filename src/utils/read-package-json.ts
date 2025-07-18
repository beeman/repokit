import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

export function readPackageJson(cwd: string): string {
  const packageJsonPath = join(cwd, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(`No package.json found at ${packageJsonPath}`)
  }
  return readFileSync(packageJsonPath, 'utf8')
}
