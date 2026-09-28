import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const migrationsDirectory = new URL('../migrations/', import.meta.url)

const compactSQL = (sql) => {
  const normalized = sql.replace(/\r?\n\s*/g, ' ').trim()
  return normalized.replace(/;\s+/g, ';\n  ')
}

for (const entry of await readdir(migrationsDirectory)) {
  const fileURL = new URL(entry, migrationsDirectory)

  if (path.extname(entry) === '.json') {
    const snapshot = JSON.parse(await readFile(fileURL, 'utf8'))
    await writeFile(fileURL, `${JSON.stringify(snapshot)}\n`)
  }

  if (path.extname(entry) === '.ts' && entry !== 'index.ts') {
    const source = await readFile(fileURL, 'utf8')
    const compacted = source
      .replaceAll('{ db, payload, req }', '{ db, payload: _payload, req: _req }')
      .replace(/sql`([\s\S]*?)`/g, (_, sql) => `sql\`\n  ${compactSQL(sql)}\``)
    await writeFile(fileURL, compacted.replace(/\r\n/g, '\n'))
  }
}
