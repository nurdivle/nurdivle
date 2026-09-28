import { readFile, writeFile } from 'node:fs/promises'

const fileURL = new URL('../payload-types.ts', import.meta.url)
const source = await readFile(fileURL, 'utf8')
const compacted = source.replace(/\/\*\*[\s\S]*?\*\/\r?\n/g, '').replace(/\r\n/g, '\n')

await writeFile(fileURL, compacted)
