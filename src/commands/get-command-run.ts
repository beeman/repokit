import { Command } from 'commander'

import { runCommandRun } from '../utils/run-command-run'

export function getCommandRun() {
  return new Command('run')
    .alias('r')
    .description('Run a command in all subdirectories with a package.json')
    .argument('<command>', 'The command to run')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not execute commands')
    .option('-v, --verbose', 'Show verbose output')
    .action((command, options) => runCommandRun(command, options))
}
