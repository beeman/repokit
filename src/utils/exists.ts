import { stat } from 'node:fs/promises'

export async function exists(file: string) {
  try {
    await stat(file)
    return true
  } catch {
    return false
  }
}
