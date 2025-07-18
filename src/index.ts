import { cancel, intro, outro } from '@clack/prompts'
import * as process from 'node:process'
import { getAppInfo } from './utils/get-app-info'
import { getArgs } from './utils/get-args'

export async function main(argv: string[]) {
  // Get app info from package.json
  const app = getAppInfo()

  try {
    // Display the intro
    intro(`${app.name} ${app.version}`)
    // Get the result from the command line and prompts
    await getArgs(argv, app)
    outro('Done!')
  } catch (error) {
    cancel(`${error}`)
    process.exit(1)
  }
}
