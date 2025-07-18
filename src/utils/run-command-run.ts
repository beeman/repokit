import { dirname, resolve } from 'node:path'
import { log } from '@clack/prompts'
import { getPackageJsonPaths } from './get-package-json-paths'
import { readFile } from 'node:fs/promises'
import { execCommand } from './exec-command'
import { ensurePackageJsonRepo } from './ensure-package-json-repo'

export interface RunCommandRunOptions {
  dryRun: boolean
  repo: string
  verbose: boolean
}

/**
 * Runs a command in all subdirectories with a package.json file.
 * TODO: This should be smarter and use the repokit.groups from the package.json file to find groups and templates.
 *
 * @param command
 * @param repo
 * @param dryRun
 * @param verbose
 */
export async function runCommandRun(command: string, { repo, dryRun, verbose }: RunCommandRunOptions) {
  const path = resolve(repo)
  ensurePackageJsonRepo(path)

  if (verbose) {
    log.info(`Searching for package.json files in ${path}`)
  }

  const packageJsonFiles = await getPackageJsonPaths(path)

  if (verbose) {
    log.info(`Found ${packageJsonFiles.length} package.json files.`)
  }

  for (const file of packageJsonFiles) {
    const dir = dirname(resolve(path, file))
    const cmd = `pnpm run ${command}`

    try {
      // Read the package.json file and see if it has a "scripts" object with the specified command
      const packageJson = JSON.parse(await readFile(resolve(dir, 'package.json'), 'utf8'))
      if (!packageJson.scripts || !packageJson.scripts[command]) {
        log.error(`Command "${command}" not found in package.json file in ${dir}`)
        continue
      }
      if (!dryRun) {
        log.info(`Running "${cmd}" in ${dir}`)
        execCommand({ command: cmd, path: dir, verbose })
      }
    } catch {
      log.error(`Failed to run command "${cmd}" in ${dir}`)
    }
  }
  if (dryRun) {
    log.warn('This was a dry run. No commands were executed.')
  }
}
