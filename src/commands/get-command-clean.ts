import { Command } from 'commander'
import { runCommandClean } from '../utils/run-command-clean'

export function getCommandClean() {
  return new Command('clean')
    .alias('c')
    .description('Clean the template repository by removing node_modules and build files')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not delete files')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => runCommandClean(options))
}
