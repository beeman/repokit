import { Command } from 'commander'
import { runCommandRun } from '../utils/run-command-run'

export function getCommandRun() {
  return new Command('run')
    .description('Run a npm script in all the repo templates')
    .alias('r')
    .argument('<command>', 'The command to run')
    .option('-d, --dry-run', 'Perform a dry run without making any changes.')
    .option('-r, --repo <repo>', 'Path to the repokit repo', '.')
    .option('-v, --verbose', 'Show verbose output')
    .action((command, options) => runCommandRun(command, options))
}
