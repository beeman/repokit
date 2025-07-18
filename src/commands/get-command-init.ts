import { Command } from 'commander'
import { runCommandInit } from '../utils/run-command-init'

export function getCommandInit() {
  return new Command('init')
    .description('Initialize a new template repository')
    .argument('<name>', 'The name of the template repository directory')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not delete files')
    .option('--tag <tag>', 'Npm tag of @beeman/repokit to install', 'latest')
    .option('-p, --package', 'Npm package used to create the template repository', 'create-solana-dapp@latest')
    .option('-t, --template <template>', 'Template to use', 'gh:beeman/repokit-templates')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (name, options) => await runCommandInit(name, options))
}
