import { execSync } from 'node:child_process'

/**
 * Executes a command in a given path.
 *
 * @param command - The command to execute.
 * @param path - The path to execute the command in.
 * @param verbose - Whether to print the command output.
 */
export function execCommand({ command, path, verbose }: { command: string; path: string; verbose: boolean }) {
  execSync(command, {
    cwd: path,
    stdio: verbose ? 'inherit' : 'ignore',
  })
}
