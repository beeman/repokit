import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * Recursively deletes the given directories.
 *
 * @param path - The path to delete the directories in.
 * @param dirs - The directories to delete.
 */
export async function rmDirs({ path, dirs }: { path: string; dirs: string[] }) {
  for (const dir of dirs) {
    await rm(resolve(path, dir), { recursive: true, force: true })
  }
}
