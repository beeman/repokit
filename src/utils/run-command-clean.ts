import { resolve } from 'node:path'
import { log, note } from '@clack/prompts'
import { ensurePackageJsonRepo } from './ensure-package-json-repo'
import { getDirsByPatterns } from './get-dirs-by-patterns'
import { rmDirs } from './rm-dirs'

export interface RumCommandCleanOptions {
  dryRun: boolean
  repo: string
  verbose: boolean
}

/**
 * Cleans the template repository by removing node_modules and build files.
 *
 * @param options - The options for the command.
 */
export async function runCommandClean({ dryRun, repo, verbose }: RumCommandCleanOptions) {
  const path = resolve(repo)
  ensurePackageJsonRepo(path)
  const patterns = [
    // Add more patterns here as needed
    '.anchor',
    '.next',
    '.react-router',
    'build',
    'dist',
    'node_modules',
    'test-ledger',
  ]
  if (verbose) {
    log.info(`Deleting ${patterns.join(', ')} in ${path}`)
  }

  const dirs = await getDirsByPatterns({ patterns, path })
  if (dirs.length === 0) {
    log.info('No directories to delete')
    return
  }
  log.info(`Found ${dirs.length} directories to delete`)
  if (verbose) {
    note(`Removing the following directories from ${path}:\n` + dirs.map((dir) => `  - ${dir}`).join('\n'))
  }
  if (dryRun) {
    log.warn('This is a dry run, no files were deleted')
    return
  }
  await rmDirs({ path, dirs })
}
