import { Command } from 'commander'
import { runCommandInstall } from '../utils/run-command-install'

export function getCommandInstall() {
  return new Command('install')
    .alias('i')
    .description('Run install command in a template repository')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not execute commands')
    .option('-v, --verbose', 'Show verbose output')
    .action((options) => runCommandInstall(options))
}
