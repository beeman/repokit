import { join, resolve } from 'node:path'
import { log } from '@clack/prompts'
import { ensureValidDirectoryName } from './ensure-valid-directory-name'
import { exists } from './exists'
import { installRepokit } from './install-repokit'
import { execCommand } from './exec-command'

export interface RunCommandInitOptions {
  cwd: string
  dryRun: boolean
  generator: string
  template: string
  tag: string
  update: boolean
  verbose: boolean
}

/**
 * Initializes a new repokit repo in the given working directory.
 *
 * @param name - The name of the repokit repo.
 * @param options - The options for the command.
 */
export async function runCommandInit(
  name: string,
  { cwd, dryRun, tag, verbose, update, generator, template }: RunCommandInitOptions,
) {
  ensureValidDirectoryName(name)
  const path = resolve(cwd)
  const target = join(path, name)

  if (await exists(target)) {
    throw new Error(`Target directory already exists: ${target}`)
  }

  log.info(`Creating a new template repository in ${target}`)

  const command = getGeneratorCommand({ name, generator, template })
  try {
    if (dryRun) {
      log.warn(`Dry run, skipping ${command} in ${path}`)
    } else {
      if (verbose) {
        log.info(`Running command: ${command}`)
      }
      execCommand({ command, path: path, verbose })
      if (update) {
        installRepokit({ path: target, tag, verbose })
      }
    }
  } catch {
    log.error(`Failed to run command: ${command}`)
    process.exit(1)
  }
}

function getGeneratorCommand({ name, generator, template }: { name: string; generator: string; template: string }) {
  return `pnpx ${generator} -t ${template} ${name}`
}
