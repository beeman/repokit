import { Command } from 'commander'
import { runCommandClean } from '../utils/run-command-clean'

export function getCommandClean() {
  return new Command('clean')
    .description('Clean up directories in the template repo')
    .alias('c')
    .option('-r, --repo <repo>', 'Path to the repokit repo', '.')
    .option('-d, --dry-run', 'Perform a dry run without making any changes.')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => runCommandClean(options))
}
