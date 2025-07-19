import { getRepoReadmeUrl } from './get-repo-readme-url'
import { log } from '@clack/prompts'

export async function fetchRepoReadmeContent({
  owner,
  path,
  repo,
  verbose,
}: {
  owner: string
  path: string
  repo: string
  verbose: boolean
}) {
  try {
    const url = getRepoReadmeUrl({ owner, path, repo })
    if (verbose) {
      log.info(`Fetching README content for ${owner}/${repo}/${path} from ${url}`)
    }
    const response = await fetch(url)
    return await response.text()
  } catch (error) {
    log.error(`Error fetching README content for ${owner}/${repo}/${path}: ${error}`)
    return ''
  }
}
