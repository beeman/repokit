import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { getPublishTypes } from './get-publish-types'
import { log, note } from '@clack/prompts'

export async function generatePublishTypes({ output, verbose }: { output: string; verbose: boolean }) {
  const target = join(output, 'types.ts')
  log.step(`Writing types.ts${verbose ? ` to ${target}` : ''}`)
  if (verbose) {
    note(`types: ${getPublishTypes()}`)
  }
  await writeFile(target, getPublishTypes())
}
