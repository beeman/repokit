import { log } from '@clack/prompts'
import { execCommand } from './exec-command'

/**
 * Executes the automd command.
 *
 * @param path - The path to execute the command in.
 * @param verbose - Whether to print the command output.
 */
export function execAutoMd({ path, verbose }: { path: string; verbose: boolean }) {
  log.info(`Running automd`)
  execCommand({ command: 'pnpm automd', path, verbose })
}
