import { join, resolve } from 'node:path'
import { ensurePackageJsonRepo } from './ensure-package-json-repo'
import { log, note } from '@clack/prompts'
import pico from 'picocolors'

export async function runCommandConfigGet({ repo, verbose }: { repo: string; verbose: boolean }) {
  const path = resolve(repo)
  const config = ensurePackageJsonRepo(path, { verbose })

  if (verbose) {
    note(JSON.stringify(config, undefined, 2))
  }
  log.info(`name: ${config.name}`)
  log.info(`description: ${config.description || pico.red('NOT SET')}`)
  log.info(`keywords: ${config.keywords?.length ? config.keywords.join(', ') : pico.red('NOT SET')}`)
  log.info(`repository.name: ${config.repository.name}`)
  log.info(`repokit.groups: ${config.repokit.groups?.length ?? 'none'}`)
  for (const group of config.repokit.groups ?? []) {
    log.info(`  - ${pico.green(`[${group.name}]`)} ${group.description}`)
    log.info(`    file://${pico.gray(join(path, group.path))}`)
  }
}
