import { resolve } from 'node:path'
import { log } from '@clack/prompts'
import { ensurePnpmWorkspace } from './ensure-pnpm-workspace'
import { ensurePackageJsonRepo } from './ensure-package-json-repo'
import { execCommand } from './exec-command'

export interface RunCommandInstallOptions {
  repo: string
  dryRun: boolean
  verbose: boolean
}

/**
 * Installs the dependencies in the repokit repo.
 *
 * @param repo - The path to the repokit repo.
 * @param dryRun - Whether to run the command in dry run mode.
 * @param verbose - Whether to print verbose output.
 */
export function runCommandInstall({ repo, dryRun, verbose }: RunCommandInstallOptions) {
  const path = resolve(repo)
  ensurePackageJsonRepo(path)

  ensurePnpmWorkspace(path)
  if (verbose) {
    log.info(`Found a pnpm workspace in ${path}`)
  }

  const command = 'pnpm install --no-frozen-lockfile'
  if (dryRun) {
    log.warn('This is a dry run, no commands were executed.')
    return
  }

  try {
    log.info(`Installing dependencies: ${command} in ${path}`)
    execCommand({ command, path, verbose })
  } catch {
    log.error(`Failed to run command: ${command}`)
    process.exit(1)
  }
}
