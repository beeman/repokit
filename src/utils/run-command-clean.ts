import { resolve } from 'node:path'
import { getCleanDirPatterns } from './get-clean-dir-patterns'
import { log, note } from '@clack/prompts'
import { glob } from 'glob'
import { rm } from 'node:fs/promises'

export async function runCommandClean(options: { cwd: string; dryRun: boolean; verbose: boolean }) {
  {
    const cwd = resolve(options.cwd)
    const cleanDirPatterns = getCleanDirPatterns()
    if (options.verbose) {
      log.info(`Deleting ${cleanDirPatterns.join(', ')} in ${cwd}`)
    }

    const dirs = await glob(`**/{${cleanDirPatterns.join(',')}}`, {
      cwd,
      dot: true,
      includeChildMatches: false,
    })
    if (dirs.length === 0) {
      log.info('No directories to delete')
      return
    }
    log.info(`Found ${dirs.length} directories to delete`)
    if (options.verbose) {
      note(`Removing the following directories from ${cwd}:\n` + dirs.map((dir) => `  - ${dir}`).join('\n'))
    }
    if (options.dryRun) {
      log.warn('This is a dry run, no files were deleted')
      return
    }
    for (const dir of dirs) {
      await rm(resolve(cwd, dir), { recursive: true, force: true })
    }
  }
}
