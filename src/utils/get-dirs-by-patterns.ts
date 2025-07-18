import { glob } from 'glob'

/**
 * Gets directories by patterns.
 *
 * @param patterns - The patterns to match.
 * @param path - The path to search for directories.
 * @returns The directories that match the patterns.
 */
export async function getDirsByPatterns({ patterns, path }: { patterns: string[]; path: string }): Promise<string[]> {
  return await glob(`**/{${patterns.join(',')}}`, {
    cwd: path,
    dot: true,
    includeChildMatches: false,
  })
}
