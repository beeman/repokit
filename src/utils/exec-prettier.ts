import { log } from '@clack/prompts'
import { execCommand } from './exec-command'

/**
 * Executes the prettier command.
 *
 * @param files - The files to format.
 * @param path - The path to execute the command in.
 * @param verbose - Whether to print the command output.
 */
export function execPrettier({ files, path, verbose }: { files: string; path: string; verbose: boolean }) {
  log.step(`Running prettier`)
  execCommand({ command: `pnpm prettier --write ${files}`, path, verbose })
}
