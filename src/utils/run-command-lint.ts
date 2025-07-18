import { resolve } from 'node:path'
import { log } from '@clack/prompts'
import { getPackageJsonPaths } from './get-package-json-paths'
import { readFile } from 'node:fs/promises'
import { parsePackageJsonTemplate } from './parse-package-json-template'
import { ensurePackageJsonRepo } from './ensure-package-json-repo'

export interface RunCommandLintOptions {
  repo: string
  verbose: boolean
}

/**
 * Lints all the package.json files in the given repokit repo.
 *
 * @param options - The options for the command.
 */
export async function runCommandLint({ repo, verbose }: RunCommandLintOptions) {
  const path = resolve(repo)
  ensurePackageJsonRepo(path)

  if (verbose) {
    log.info(`Searching for package.json files in ${path}`)
  }

  const packageJsonFiles = await getPackageJsonPaths(path)

  if (verbose) {
    log.info(`Found ${packageJsonFiles.length} package.json files.`)
  }
  let errorCount = 0
  for (const file of packageJsonFiles) {
    const filePath = resolve(path, file)
    const content = await readFile(filePath, 'utf8')
    const result = parsePackageJsonTemplate(content)

    if (!result.success) {
      errorCount++
      log.error(`Error in ${filePath}:`)
      for (const error of result.error.errors) {
        log.error(`  - ${error.path.join('.')} ${error.message}`)
      }
      continue
    }
    if (verbose) {
      log.info(`Successfully linted ${filePath}`)
    }
  }

  if (errorCount > 0) {
    log.error(`Found ${errorCount} errors in ${packageJsonFiles.length} package.json files.`)
    process.exit(1)
  }
  log.success(`Successfully linted ${packageJsonFiles.length} package.json files.`)
}
