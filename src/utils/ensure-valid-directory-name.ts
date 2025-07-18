export function ensureValidDirectoryName(name: string) {
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    throw new Error(`Invalid directory name: ${name}`)
  }
  return true
}
