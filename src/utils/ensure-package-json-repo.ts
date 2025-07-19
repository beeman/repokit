import { PackageJsonRepo, parsePackageJsonRepo } from './parse-package-json-repo'
import { ensurePackageJson } from './ensure-package-json'
import { z } from 'zod'

/**
 * Reads the package.json file of the given repokit repo.
 *
 * @param path - The path to the repokit repo.
 * @param verbose - Whether to print verbose output.
 * @returns The parsed package.json repokit object.
 * @throws If the package.json file is not found or if it is not a repokit repo.
 */
export function ensurePackageJsonRepo(path: string, { verbose = false }: { verbose?: boolean } = {}): PackageJsonRepo {
  const content = ensurePackageJson(path)
  const result = parsePackageJsonRepo(content)
  if (result.success) {
    return result.data
  }

  if (result.error.issues.some((issue) => isInvalidRepokitError(issue))) {
    throw new Error(`Repokit config not found in ${path}/package.json. ${showError(result.error, verbose)}`)
  }

  throw new Error(`Invalid repokit config in ${path}/package.json. ${showError(result.error, verbose)}`)
}

function showError(error: z.ZodError, verbose: boolean) {
  return verbose ? error.message : 'Use --verbose for more details.'
}

function isInvalidRepokitError(issue: z.ZodIssue) {
  return (
    issue.code === 'invalid_type' &&
    issue.message === 'Required' &&
    issue.expected === 'object' &&
    issue.received === 'undefined' &&
    issue.path.length === 1 &&
    issue.path[0] === 'repokit'
  )
}
