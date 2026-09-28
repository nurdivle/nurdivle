import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const maximumLines = 700
const includedExtensions = new Set(['.css', '.js', '.json', '.md', '.mjs', '.ts', '.tsx', '.yaml', '.yml'])
const ignoredDirectories = new Set(['.git', '.next', 'node_modules', 'playwright-report', 'test-results'])
const ignoredFiles = new Set(['pnpm-lock.yaml'])

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.isDirectory() && !ignoredDirectories.has(entry.name)) {
      files.push(...(await collectFiles(path.join(directory, entry.name))))
    } else if (
      entry.isFile() &&
      !ignoredFiles.has(entry.name) &&
      includedExtensions.has(path.extname(entry.name))
    ) {
      files.push(path.join(directory, entry.name))
    }
  }

  return files
}

const files = await collectFiles(process.cwd())
const violations = []

for (const file of files) {
  const source = await readFile(file, 'utf8')
  const lineCount = source.split(/\r?\n/).length
  if (lineCount > maximumLines) violations.push({ file: path.relative(process.cwd(), file), lineCount })
}

if (violations.length) {
  for (const violation of violations) {
    console.error(`${violation.file}: ${violation.lineCount} lines (maximum ${maximumLines})`)
  }
  process.exit(1)
}

console.log(`Line limit verified across ${files.length} files.`)
