import { Command } from 'commander'
import { runCommandGenerate } from '../utils/run-command-generate'

export function getCommandGenerate() {
  return new Command('generate')
    .description('Generate template repository metadata')
    .option('-r, --repo <repo>', 'Path to the repokit repo', '.')
    .option('-d, --dry-run', 'Perform a dry run without making any changes.')
    .option('-f, --format', 'Format the files', false)
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => await runCommandGenerate(options))
}
