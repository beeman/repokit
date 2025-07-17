import { cancel, log, note, outro } from '@clack/prompts'
import * as process from 'node:process'
import { getAppInfo } from './utils/get-app-info'
import { getArgs } from './utils/get-args'

export async function main(argv: string[]) {
  // Get app info from package.json
  const app = getAppInfo()

  try {
    // Get the result from the command line and prompts
    const args = await getArgs(argv, app)

    if (args.dryRun) {
      note(JSON.stringify(args, undefined, 2), 'Arguments')
      outro('🚀 Dry run was used, no changes were made')
      return
    }

    if (args.verbose) {
      log.warn(`Verbose output enabled`)
      console.warn(args)
    }

    outro('Done!')
  } catch (error) {
    cancel(`${error}`)
    process.exit(1)
  }
}
