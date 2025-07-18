import { log } from '@clack/prompts'
import { execCommand } from './exec-command'

/**
 * Installs the repokit package in the given path.
 * Commits the changes.
 *
 * @param path - The path to install the repokit package in.
 * @param tag - The tag to install.
 * @param verbose - Whether to print verbose output.
 */
export function installRepokit({ path, tag, verbose }: { path: string; tag: string; verbose: boolean }) {
  const pkg = `@beeman/repokit@${tag}`
  log.info(`Installing ${pkg}`)
  execCommand({ command: `pnpm add -D -w ${pkg}`, path, verbose })
  // Commit the changes
  execCommand({ command: `git add .`, path, verbose })
  execCommand({ command: `git commit -m "chore: update ${pkg}"`, path, verbose })
}
