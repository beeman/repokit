export function getRepoUrl({ owner, path, repo }: { owner: string; path: string; repo: string }) {
  return `https://github.com/${owner}/${repo}/tree/main/${path}`
}
