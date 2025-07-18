import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Gets the directories in the given path.
 *
 * @param cwd - The path to get the directories in.
 * @returns The directories in the given path.
 */
export function getDirs(cwd: string): string[] {
  return readdirSync(cwd)
    .map((file) => join(cwd, file))
    .filter((file) => statSync(file).isDirectory())
}
