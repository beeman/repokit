export function getTemplatesJsonUrl({ owner, repo }: { owner: string; repo: string }) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/templates.json`
}
