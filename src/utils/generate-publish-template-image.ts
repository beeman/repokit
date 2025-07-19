import { PublishTemplate } from './convert-publish-template'
import { existsSync } from 'node:fs'
import { log } from '@clack/prompts'
import { mkdir, writeFile } from 'node:fs/promises'
import { generatePublishTemplateSvg } from './generate-publish-template-svg'
import sharp from 'sharp'

export async function generatePublishTemplateImage({
  template,
  target,
  verbose,
}: {
  template: PublishTemplate
  target: string
  verbose: boolean
}) {
  if (!existsSync(target)) {
    log.warn(`Creating directory: ${target}`)
    await mkdir(target, { recursive: true })
  }
  const svg = generatePublishTemplateSvg(template)
  const baseName = `${template.source.id}-${template.name}`
  if (verbose) {
    log.info(`Generating image for ${baseName}`)
  }
  await writeFile(`${target}/${baseName}.svg`, svg)
  await sharp(Buffer.from(svg)).png().toFile(`${target}/${baseName}.png`)

  return baseName
}
