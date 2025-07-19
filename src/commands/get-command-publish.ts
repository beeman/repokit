import { Command } from 'commander'

import { runCommandPublish } from '../utils/run-command-publish'

export function getCommandPublish() {
  return new Command('publish')
    .description('Publish the site metadata')
    .option('-c, --config <file>', 'Path to the site config file', './repokit-publish.json')
    .option('-f, --format', 'Format the files', false)
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => await runCommandPublish(options))
}
