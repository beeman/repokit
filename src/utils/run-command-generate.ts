import { resolve } from 'node:path'
import { getRepoGroups } from './get-repo-groups'
import { execAutoMd } from './exec-auto-md'
import { execPrettier } from './exec-prettier'
import { generateTemplatesJson } from './generate-templates-json'
import { generateTemplatesMd } from './generate-templates-md'

export interface RunCommandGenerateOptions {
  dryRun: boolean
  format: boolean
  repo: string
  verbose: boolean
}

/**
 * Generates the TEMPLATES.md and templates.json files for the given repokit repo.
 *
 * @param options - The options for the command.
 */
export async function runCommandGenerate({ format, verbose, repo }: RunCommandGenerateOptions) {
  const path = resolve(repo)
  const groups = getRepoGroups(path)

  // Generate the TEMPLATES.md and templates.json files
  await generateTemplatesMd({ groups, path, verbose })
  await generateTemplatesJson({ groups, path })

  // Run automd and format the files with prettier
  execAutoMd({ path, verbose })
  if (format) {
    execPrettier({ path, verbose })
  }
}
