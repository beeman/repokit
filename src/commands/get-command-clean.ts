import { Command } from 'commander'
import { resolve } from 'node:path'
import { log, note } from '@clack/prompts'
import { glob } from 'glob'
import { rm } from 'node:fs/promises'
import { getCleanDirPatterns } from '../utils/get-clean-dir-patterns'

export function getCommandClean() {
  return new Command('clean')
    .alias('c')
    .description('Clean the template repository by removing node_modules and build files')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not delete files')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => {
      const cwd = resolve(options.cwd)
      const cleanDirPatterns = getCleanDirPatterns()
      log.info(`Deleting ${cleanDirPatterns.join(', ')} in ${cwd}`)
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
    })
}
