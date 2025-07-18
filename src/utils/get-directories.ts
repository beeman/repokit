import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

export function getDirectories(cwd: string): string[] {
  return readdirSync(cwd)
    .map((file) => join(cwd, file))
    .filter((file) => statSync(file).isDirectory())
}
