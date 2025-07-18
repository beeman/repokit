import { resolve } from 'node:path'
import { log } from '@clack/prompts'
import { existsSync } from 'node:fs'

/**
 * Ensures that the given path is in a pnpm workspace.
 * TODO: In the future we could support other package managers but has no priority right now.
 *
 * @param path - The path to the repokit repo.
 */
export function ensurePnpmWorkspace(path: string) {
  if (!existsSync(resolve(path, 'pnpm-lock.yaml')) || !existsSync(resolve(path, 'pnpm-workspace.yaml'))) {
    log.error('This command must be run in a pnpm workspace with a pnpm-lock.yaml and pnpm-workspace.yaml file.')
    throw new Error('This command must be run in a pnpm workspace with a pnpm-lock.yaml and pnpm-workspace.yaml file.')
  }
}
