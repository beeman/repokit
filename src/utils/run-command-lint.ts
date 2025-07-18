import { resolve } from 'node:path'
import { log } from '@clack/prompts'
import { getPackageJsonPaths } from './get-package-json-paths'
import { readFile } from 'node:fs/promises'
import { parsePackageJsonTemplate } from './parse-package-json-template'

export async function runCommandLint(options: { cwd: string; verbose: boolean }) {
  {
    const cwd = resolve(options.cwd)
    if (options.verbose) {
      log.info(`Searching for package.json files in ${cwd}`)
    }

    const packageJsonFiles = await getPackageJsonPaths(cwd)

    if (options.verbose) {
      log.info(`Found ${packageJsonFiles.length} package.json files.`)
    }
    let errorCount = 0
    for (const file of packageJsonFiles) {
      const filePath = resolve(cwd, file)
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
      if (options.verbose) {
        log.info(`Successfully linted ${filePath}`)
      }
    }

    if (errorCount > 0) {
      log.error(`Found ${errorCount} errors in ${packageJsonFiles.length} package.json files.`)
      process.exit(1)
    }
    log.success(`Successfully linted ${packageJsonFiles.length} package.json files.`)
  }
}
