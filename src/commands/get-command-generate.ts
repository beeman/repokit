import { Command } from 'commander'
import { runCommandGenerate } from '../utils/run-command-generate'

export function getCommandGenerate() {
  return new Command('generate')
    .description('Generate template repository metadata')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not create files')
    .option('-f, --format', 'Format the files', false)
    .option('-v, --verbose', 'Show verbose output')
    .action(async (options) => await runCommandGenerate(options))
}
