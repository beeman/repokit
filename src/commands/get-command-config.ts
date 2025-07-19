import { Command } from 'commander'
import { runCommandConfigGet } from '../utils/run-command-config-get'

export function getCommandConfig() {
  return new Command('config')
    .description('Configure repokit')
    .argument('<command>', 'The command to run')
    .addCommand(getCommandConfigGet())
}

export function getCommandConfigGet() {
  return new Command('get')
    .description('Get the current configuration')
    .option('-r, --repo <repo>', 'Path to the repokit repo', '.')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => await runCommandConfigGet(options))
}
