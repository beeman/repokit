import { Command } from 'commander'

import { runCommandLint } from '../utils/run-command-lint'

export function getCommandLint() {
  return new Command('lint')
    .alias('l')
    .description('Lint all the package.json files in the template repository')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => await runCommandLint(options))
}
