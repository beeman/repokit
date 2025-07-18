import { Command } from 'commander'
import { join, resolve } from 'node:path'
import { log } from '@clack/prompts'
import { execSync } from 'node:child_process'
import { exists } from '../utils/exists'
import { ensureValidDirectoryName } from '../utils/ensure-valid-directory-name'

export function getCommandInit() {
  return new Command('init')
    .description('Initialize a new template repository')
    .argument('<name>', 'The name of the template repository directory')
    .option('-c, --cwd <path>', 'Current working directory', '.')
    .option('-d, --dry-run', 'Dry run, do not delete files')
    .option('--tag <tag>', 'Npm tag of @beeman/repokit to install', 'latest')
    .option('-p, --package', 'Npm package used to create the template repository', 'create-solana-dapp@latest')
    .option('-t, --template <template>', 'Template to use', 'gh:beeman/repokit-templates')
    .option('-v, --verbose', 'Show verbose output')
    .action(async (name, options) => {
      ensureValidDirectoryName(name)
      const verbose = options.verbose ?? false
      const cwd = resolve(options.cwd)
      const target = join(cwd, name)

      if (await exists(target)) {
        throw new Error(`Target directory already exists: ${target}`)
      }

      log.info(`Creating a new template repository in ${target}`)

      const command = getCommand({ name, package: options.package, template: options.template })
      try {
        if (options.dryRun) {
          log.warn(`Dry run, skipping ${command} in ${cwd}`)
        } else {
          if (verbose) {
            log.info(`Running command: ${command}`)
          }
          execSync(command, { cwd, stdio: verbose ? 'inherit' : 'ignore' })
          installRepokit({ cwd: target, tag: options.tag, verbose })
        }
      } catch (error) {
        console.error(error)
        log.error(`Failed to run command: ${command}`)
        process.exit(1)
      }
    })
}

function getCommand({ name, package: pkg, template }: { name: string; package: string; template: string }) {
  return `pnpx ${pkg} -t ${template} ${name}`
}

function installRepokit({ cwd, tag, verbose }: { cwd: string; tag: string; verbose: boolean }) {
  const pkg = `@beeman/repokit@${tag}`
  log.info(`Installing ${pkg}`)
  execSync(`pnpm add -D ${pkg}`, { cwd, stdio: verbose ? 'inherit' : 'ignore' })
  // Commit the changes
  execSync(`git add .`, { cwd, stdio: verbose ? 'inherit' : 'ignore' })
  execSync(`git commit -m "chore: update ${pkg}"`, { cwd, stdio: verbose ? 'inherit' : 'ignore' })
}
