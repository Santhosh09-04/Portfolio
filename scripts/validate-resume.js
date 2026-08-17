import { readFileSync } from 'node:fs'

const b = readFileSync('public/resume.pdf', 'latin1')
const startIdx = b.indexOf('startxref')
const sx = parseInt(b.slice(startIdx + 10).trim().split(/\s+/)[0], 10)
const tail = b.slice(sx)
const lines = tail.split('\n')
const [first, countStr] = lines[1].trim().split(/\s+/)
console.log('xref start:', sx, '| count:', countStr)

let allOk = true
for (let i = 1; i < Number(countStr); i += 1) {
  const entry = lines[i + 2]
  const off = parseInt(entry.slice(0, 10), 10)
  const actual = b.slice(off, off + 8)
  const expected = `${i} 0 obj`
  const ok = actual.startsWith(expected)
  if (!ok) allOk = false
  console.log(`obj ${i} @ ${off} -> ${JSON.stringify(actual)} ${ok ? 'OK' : 'MISMATCH'}`)
}
console.log('HEAD:', JSON.stringify(b.slice(0, 12)))
console.log('TAIL:', JSON.stringify(b.slice(-90)))
console.log('ALL_OK =', allOk)
