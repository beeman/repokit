import { resolve } from 'node:path'
import { log } from '@clack/prompts'
import { execSync } from 'node:child_process'
import { ensurePnpmWorkspace } from './ensure-pnpm-workspace'

export function runCommandInstall(options: { cwd: string; dryRun: boolean; verbose: boolean }) {
  const cwd = resolve(options.cwd)
  ensurePnpmWorkspace(options)

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
}
