import { cpSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const standaloneRoot = join(projectRoot, '.next', 'standalone')
const serverPath = join(standaloneRoot, 'server.js')

if (!existsSync(serverPath)) {
  throw new Error('Standalone build not found. Run `pnpm build` first.')
}

const assets = [
  [join(projectRoot, '.next', 'static'), join(standaloneRoot, '.next', 'static')],
  [join(projectRoot, 'public'), join(standaloneRoot, 'public')],
]

for (const [source, destination] of assets) {
  if (existsSync(source)) cpSync(source, destination, { recursive: true })
}

process.env.HOSTNAME ||= '0.0.0.0'
process.env.PORT ||= '3000'

await import(pathToFileURL(serverPath).href)
