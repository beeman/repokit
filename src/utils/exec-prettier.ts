import { log } from '@clack/prompts'
import { execCommand } from './exec-command'

/**
 * Executes the prettier command.
 *
 * @param path - The path to execute the command in.
 * @param verbose - Whether to print the command output.
 */
export function execPrettier({ path, verbose }: { path: string; verbose: boolean }) {
  log.info(`Running prettier`)
  execCommand({ command: 'pnpm prettier --write {README.md,TEMPLATES.md,templates.json}', path, verbose })
}
