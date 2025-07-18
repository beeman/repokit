import { Command } from 'commander'
import { runCommandInstall } from '../utils/run-command-install'

export function getCommandInstall() {
  return new Command('install')
    .description('Run install command in a template repo')
    .alias('i')
    .option('-r, --repo <repo>', 'Path to the repokit repo', '.')
    .option('-d, --dry-run', 'Perform a dry run without making any changes.')
    .option('-v, --verbose', 'Show verbose output')
    .action((options) => runCommandInstall(options))
}
