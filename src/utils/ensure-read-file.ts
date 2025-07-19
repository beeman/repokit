import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

/**
 * Ensures that the given path has a certain file.
 *
 * @param path - The path to the directory to check.
 * @param file - The file to check.
 * @returns The content of the file.
 * @throws If the file is not found.
 */
export function ensureReadFile(path: string, file: string): string {
  const source = join(path, file)
  if (!existsSync(source)) {
    throw new Error(`No ${file} found at ${source}`)
  }
  return readFileSync(source, 'utf8')
}
