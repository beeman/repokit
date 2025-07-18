import { glob } from 'glob'

export async function getPackageJsonPaths(cwd: string): Promise<string[]> {
  return await glob('**/package.json', {
    cwd,
    dot: true,
    ignore: '**/{.next,build,dist,node_modules,tmp}/**',
  }).then((res) => {
    // Filter out the top-level package.json file if found in a list of results
    return res.length > 1 ? res.filter((f) => f !== 'package.json') : res
  })
}
