import { ensureReadFile } from './ensure-read-file'
import { parsePublishConfig, PublishConfig } from './parse-publish-config'
import { join } from 'node:path'

/**
 * Reads the package.json file of the given repokit repo.
 *
 * @param path - The path to the repokit repo.
 * @param config - The name of the config file.
 * @param verbose - Whether to print verbose output.
 * @returns The parsed package.json repokit object.
 * @throws If the package.json file is not found or if it is not a repokit repo.
 */
export function ensurePublishConfig({
  path,
  config,
  verbose = false,
}: {
  config: string
  path: string
  verbose?: boolean
}): PublishConfig {
  const configPath = join(path, config)
  const configFile = ensureReadFile(path, config)
  const result = parsePublishConfig(configFile)
  if (result.success) {
    return result.data
  }

  throw new Error(
    `Invalid publish config in ${configPath}. ${verbose ? result.error.message : 'Use --verbose for more details.'}`,
  )
}
