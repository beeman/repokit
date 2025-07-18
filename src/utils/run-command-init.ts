import { join, resolve } from 'node:path'
import { log } from '@clack/prompts'
import { ensureValidDirectoryName } from './ensure-valid-directory-name'
import { exists } from './exists'
import { execSync } from 'node:child_process'

export async function runCommandInit(
  name: string,
  options: {
    cwd: string
    dryRun: boolean
    package: string
    template: string
    tag: string
    verbose: boolean
  },
) {
  {
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
    } catch {
      log.error(`Failed to run command: ${command}`)
      process.exit(1)
    }
  }
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
