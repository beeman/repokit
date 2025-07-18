import { Command } from 'commander'
import { runCommandInit } from '../utils/run-command-init'

export function getCommandInit() {
  return new Command('init')
    .description('Initialize a new template repository')
    .argument('<name>', 'The name of the template repository directory')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Perform a dry run without making any changes.')
    .option('-g, --generator', 'Npm package used to create the template repository', 'create-solana-dapp@latest')
    .option('--tag <tag>', 'Npm tag of @beeman/repokit to install', 'latest')
    .option('-t, --template <template>', 'Template to use', 'gh:beeman/repokit-templates')
    .option('-v, --verbose', 'Show verbose output')
    .option('-u, --update', 'Update @beeman/repokit in the template repository')
    .action(async (name, options) => await runCommandInit(name, options))
}
