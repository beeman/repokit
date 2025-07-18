import { program } from 'commander'
import { AppInfo } from './get-app-info'

import { getCommandClean, getCommandInstall } from '../commands'

export async function getArgs(argv: string[], app: AppInfo): Promise<void> {
  await program
    .name(app.name)
    .version(app.version, '-V, --version', 'Output the version number')
    .addCommand(getCommandClean())
    .addCommand(getCommandInstall())
    .helpOption('-h, --help', 'Display help for command')
    .parseAsync(argv)
}
