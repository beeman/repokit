import { resolve } from 'node:path'
import { log } from '@clack/prompts'
import { existsSync } from 'node:fs'

export function ensurePnpmWorkspace(options: { cwd: string; dryRun: boolean; verbose: boolean }) {
  const cwd = resolve(options.cwd)

  if (options.verbose) {
    log.warn(`Checking for pnpm-lock.yaml and pnpm-workspace.yaml in ${cwd}`)
  }

  const lockFile = resolve(cwd, 'pnpm-lock.yaml')
  const workspaceFile = resolve(cwd, 'pnpm-workspace.yaml')

  if (!existsSync(lockFile) || !existsSync(workspaceFile)) {
    log.error('This command must be run in a pnpm workspace with a pnpm-lock.yaml and pnpm-workspace.yaml file.')
    throw new Error('This command must be run in a pnpm workspace with a pnpm-lock.yaml and pnpm-workspace.yaml file.')
  }
}
