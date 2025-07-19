export function getRepoReadmeUrl({ owner, path, repo }: { owner: string; path: string; repo: string }) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${path}/README.md`
}
