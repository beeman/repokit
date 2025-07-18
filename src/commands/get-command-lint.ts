import { Command } from 'commander'
import { runCommandLint } from '../utils/run-command-lint'

export function getCommandLint() {
  return new Command('lint')
    .description('Lint all the repo templates')
    .alias('l')
    .option('-r, --repo <repo>', 'Path to the repokit repo', '.')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => await runCommandLint(options))
}
