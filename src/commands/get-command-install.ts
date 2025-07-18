import { log } from '@clack/prompts'
import { Command } from 'commander'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'

export function getCommandInstall() {
  return new Command('install')
    .alias('i')
    .description('Run install command in a template repository')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not execute commands')
    .option('-v, --verbose', 'Show verbose output')
    .action((options) => {
      const cwd = resolve(options.cwd)

      if (options.verbose) {
        log.warn(`Checking for pnpm-lock.yaml and pnpm-workspace.yaml in ${cwd}`)
      }

      const lockFile = resolve(cwd, 'pnpm-lock.yaml')
      const workspaceFile = resolve(cwd, 'pnpm-workspace.yaml')

      if (!existsSync(lockFile) || !existsSync(workspaceFile)) {
        log.error('This command must be run in a pnpm workspace with a pnpm-lock.yaml and pnpm-workspace.yaml file.')
        process.exit(1)
      }

      if (options.verbose) {
        log.info(`Found pnpm-lock.yaml and pnpm-workspace.yaml in ${cwd}`)
      }

      const command = 'pnpm install --no-frozen-lockfile'

      if (options.dryRun) {
        log.warn('This is a dry run, no commands were executed.')
        return
      }

      try {
        log.info(`Installing dependencies: ${command} in ${cwd}`)
        execSync(command, { cwd, stdio: options.verbose ? 'inherit' : 'ignore' })
      } catch {
        log.error(`Failed to run command: ${command}`)
        process.exit(1)
      }
    })
}
