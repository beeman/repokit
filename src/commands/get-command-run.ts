import { Command } from 'commander'
import { log } from '@clack/prompts'
import { glob } from 'glob'
import { dirname, resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'

export function getCommandRun() {
  return new Command('run')
    .alias('r')
    .description('Run a command in all subdirectories with a package.json')
    .argument('<command>', 'The command to run')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not execute commands')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (command, options) => {
      const cwd = resolve(options.cwd)
      if (options.verbose) {
        log.info(`Searching for package.json files in ${cwd}`)
      }

      const packageJsonFiles = await glob('**/package.json', {
        cwd,
        dot: true,
        ignore: '**/{node_modules,tmp}/**',
      }).then((res) => {
        // Filter out the top-level package.json file if found in a list of results
        return res.length > 1 ? res.filter((f) => f !== 'package.json') : res
      })

      if (options.verbose) {
        log.info(`Found ${packageJsonFiles.length} package.json files.`)
      }

      for (const file of packageJsonFiles) {
        const dir = dirname(resolve(cwd, file))
        const cmd = `pnpm run ${command}`

        try {
          // Read the package.json file and see if it has a "scripts" object with the specified command
          const packageJson = JSON.parse(await readFile(resolve(dir, 'package.json'), 'utf8'))
          if (!packageJson.scripts || !packageJson.scripts[command]) {
            log.error(`Command "${command}" not found in package.json file in ${dir}`)
            continue
          }
          if (!options.dryRun) {
            log.info(`Running "${cmd}" in ${dir}`)
            execSync(cmd, { cwd: dir, stdio: options.verbose ? 'inherit' : 'ignore' })
          }
        } catch {
          log.error(`Failed to run command "${cmd}" in ${dir}`)
        }
      }
      if (options.dryRun) {
        log.warn('This was a dry run. No commands were executed.')
      }
    })
}
