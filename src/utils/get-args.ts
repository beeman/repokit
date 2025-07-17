import { intro } from '@clack/prompts'
import { program } from 'commander'

import { AppInfo } from './get-app-info'
import { GetArgsResult } from './get-args-result'

export async function getArgs(argv: string[], app: AppInfo): Promise<GetArgsResult> {
  // Get the result from the command line
  const input = program
    .name(app.name)
    .version(app.version, '-V, --version', 'Output the version number')
    .option('-d, --dry-run', 'Dry run (default: false)')
    .option('-v, --verbose', 'Verbose output (default: false)')
    .helpOption('-h, --help', 'Display help for command')
    .parse(argv)

  // Get the options from the command line
  const result = input.opts()

  // Display the intro
  intro(`${app.name} ${app.version}`)

  // Take the result from the command line and use it to populate the options
  const options: GetArgsResult = {
    dryRun: result.dryRun ?? false,
    app,
    verbose: result.verbose ?? false,
  }

  return options as GetArgsResult
}
