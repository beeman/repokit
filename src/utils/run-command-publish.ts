import { log, note } from '@clack/prompts'
import { ensurePublishConfig } from './ensure-publish-config'
import { PublishTemplate } from './convert-publish-template'
import { getTemplatesForSources } from './get-templates-for-sources'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { execPrettier } from './exec-prettier'
import { generatePublishTypes } from './generate-publish-types'
import { generatePublishImages } from './generate-publish-images'
import { generatePublishTemplatesTs } from './generate-publish-templates-ts'
import { generatePublishFiltersTs } from './generate-publish-filters-ts'
import { generatePublishSourcesTs } from './generate-publish-sources-ts'

export async function runCommandPublish({
  verbose,
  ...options
}: {
  config: string
  format: boolean
  verbose: boolean
}) {
  const path = process.cwd()
  const config = ensurePublishConfig({ path, ...options })

  if (verbose) {
    note(JSON.stringify(config, undefined, 2))
  }
  const output = join(path, config.output)
  if (!existsSync(output)) {
    await mkdir(output, { recursive: true })
    log.info(`Created output directory: ${output}`)
  }
  if (verbose) {
    log.info(`Writing metadata to ${output}`)
  }

  try {
    const templates: PublishTemplate[] = await getTemplatesForSources({
      sources: config.sources,
      verbose,
    })
    await generatePublishFiltersTs({ output, filters: config.filters, verbose })
    await generatePublishSourcesTs({ output, sources: config.sources, verbose })
    await generatePublishTemplatesTs({ output, templates, verbose })
    await generatePublishTypes({ output, verbose })
    await generatePublishImages({ output, templates, verbose })
    if (options.format) {
      execPrettier({ files: '.', path: output, verbose })
    }
  } catch (error) {
    throw new Error(`Error publishing metadata: ${error}`)
  }
}

export async function generatePublishOutput({
  //
  output,
}: {
  output: string
}) {
  console.log('publish output', output)
}
