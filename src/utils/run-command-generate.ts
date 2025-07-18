import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { getRepoTemplateGroups } from './get-repo-template-groups'
import { createRepoTemplateReadme } from './create-repo-template-readme'
import { createRepoTemplateJson } from './create-repo-template-json'
import { log } from '@clack/prompts'

export async function runCommandGenerate(options: { cwd: string; dryRun: boolean; format: boolean; verbose: boolean }) {
  const cwd = resolve(options.cwd)
  const groups = getRepoTemplateGroups(cwd)
  const lines: string[] = []
  for (const group of groups) {
    if (options.verbose) {
      log.warn(`Generating README for ${group.name}`)
    }
    lines.push(...createRepoTemplateReadme(group))
  }
  log.info(`Generating TEMPLATES.md`)
  writeFileSync(join(cwd, 'TEMPLATES.md'), lines.join('\n'))
  log.info(`Generating templates.json`)
  await createRepoTemplateJson(cwd, groups)
  log.info(`Running automd`)
  execSync('pnpm automd', { cwd, stdio: options.verbose ? 'inherit' : 'ignore' })
  if (options.format) {
    log.info(`Running prettier`)
    execSync('pnpm prettier --write {README.md,TEMPLATES.md,templates.json}', {
      cwd,
      stdio: options.verbose ? 'inherit' : 'ignore',
    })
  }
}
