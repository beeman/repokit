import { cancel, intro, outro } from '@clack/prompts'
import * as process from 'node:process'
import { getAppInfo } from './utils/get-app-info'
import { program } from 'commander'
import {
  getCommandClean,
  getCommandGenerate,
  getCommandInit,
  getCommandInstall,
  getCommandLint,
  getCommandRun,
} from './commands'
import { getCommandConfig } from './commands/get-command-config'
import { getCommandPublish } from './commands/get-command-publish'

// Export public API
export * from './exports'

export async function main(argv: string[]) {
  // Get app info from package.json
  const app = getAppInfo()

  try {
    // Display the intro
    intro(`${app.name} ${app.version}`)
    // Run the command
    await program
      .name(app.name)
      .version(app.version, '-V, --version', 'Output the version number')
      .addCommand(getCommandClean())
      .addCommand(getCommandConfig())
      .addCommand(getCommandGenerate())
      .addCommand(getCommandInit())
      .addCommand(getCommandInstall())
      .addCommand(getCommandLint())
      .addCommand(getCommandRun())
      .addCommand(getCommandPublish())
      .helpOption('-h, --help', 'Display help for command')
      .parseAsync(argv)
    outro('Done!')
  } catch (error) {
    cancel(`${error}`)
    process.exit(1)
  }
}
