/**
 * Generates a small, dependency-free placeholder resume PDF at public/resume.pdf.
 * Run with: npm run make:resume
 *
 * Swap in your real CV whenever ready — just place resume.pdf into /public and
 * the "Download Resume" buttons will link to it.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'public', 'resume.pdf')

const esc = (s) =>
  String(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const BLUE = [0.357, 0.51, 0.902]
const LAV = [0.541, 0.435, 0.91]
const GRAY = [0.42, 0.41, 0.47]
const INK = [0.17, 0.16, 0.2]

const lineOps = []
let y = 748

function emit(text, { font = 'F1', size = 10, color = INK, gap = 26, indent = 52 } = {}) {
  const rgb = color.map((c) => c.toFixed(3)).join(' ')
  lineOps.push(`BT /${font} ${size} Tf ${rgb} rg ${indent} ${y} Td (${esc(text)}) Tj ET`)
  y = Math.round((y - size * 0.32 - gap) * 100) / 100
}

function name(text) {
  emit(text, { font: 'F2', size: 24, color: BLUE, gap: 48 })
}
function role(text) {
  emit(text, { font: 'F2', size: 12, color: LAV, gap: 22 })
}
function contact(text) {
  emit(text, { size: 9, color: GRAY, gap: 24 })
}
function sectionTitle(text) {
  emit(text, { font: 'F2', size: 12.5, color: BLUE, gap: 34 })
}
function body(text) {
  emit(text, { font: 'F2', size: 10.5, color: INK, gap: 24 })
}
function details(text) {
  emit(text, { size: 9.5, color: GRAY, gap: 24, indent: 62 })
}

/* ---- content -------------------------------------------------------------- */
name('Santhosh S V')
role('Front-End Developer  |  Software Engineer in Training')
contact('Email: santhoshsv0927@gmail.com   |   Phone: +91 8056436278   |   Salem, India')
contact('LinkedIn: linkedin.com/in/santhosh-s-v-8b29a')

sectionTitle('EDUCATION')
body('B.E. Computer Science and Engineering  -  Knowledge Institute of Technology (2022 - 2026)')
details('CGPA 7.73 / 10.0')
body('HSC  -  Kamarajar Matric Hr. Sec. School (2021 - 2022)')
details('70.8%')
body('SSLC  -  Sriswamy International School, CBSE (2019 - 2020)')
details('69.6%')

sectionTitle('TECHNICAL SKILLS')
body('Programming:  Python, Java, C, MySQL, HTML/CSS, JavaScript')
body('Data & Analytics:  Power BI, DAX, SQL, Excel, Power Query, Tableau')
body('Design:  UI/UX Design, Figma, Adobe XD, Wireframing, Prototyping')

sectionTitle('INTERNSHIP EXPERIENCE')
body('Java Programming Intern  -  DevSkillHub (Feb - Apr 2024)')
details('Built OOP-based Java applications covering exception handling, file I/O and multithreading using Eclipse/IntelliJ and Git.')
body('UI/UX Design Intern  -  CODSOFT (Feb - Mar 2024)')
details('Designed wireframes and prototypes with Figma and Adobe XD, focused on usability and user-centred design.')
body('App Development Intern  -  LITZ TECH (Jul 2024)')
details('Built mobile app fundamentals using Flutter and Dart in a fast-paced program.')
body('Data Analytics Intern  -  TECHNOHACKS (Mar - Apr 2025)')
details('Collected, cleaned and analysed datasets with Excel, Python (Pandas, NumPy, Matplotlib) and Power BI/Tableau.')

sectionTitle('PROJECTS')
body('Student Enterprise Resource Planning System')
details('Full student management platform for records, attendance, grades and enrolment using Java, MySQL and HTML/CSS.')
body('AI Desktop Voice Assistant')
details('Python voice assistant with SpeechRecognition, PyAudio, TTS and NLP for searches, reminders and system control.')
body('Power BI Dashboard  -  Blinkit Analytics')
details('Interactive BI dashboard for revenue, categories and regional performance using Power BI, DAX, SQL and Power Query.')
/* ---- assemble the PDF ---------------------------------------------------- */
const streamContent = lineOps.join('\n') // bytes between stream\n and \nendstream
const streamObj = `<< /Length ${streamContent.length} >>`

const objectBodies = [
  null, // 0
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  streamObj,
]

function byteLength(str) {
  return Buffer.byteLength(str, 'latin1')
}

let pdf = '%PDF-1.4\n'
const offsets = [0]
objectBodies.forEach((obj, i) => {
  if (i === 0 || i === 6) return
  offsets.push(byteLength(pdf))
  pdf += `${i} 0 obj\n${obj}\nendobj\n`
})
offsets.push(byteLength(pdf))
pdf += `6 0 obj\n${streamObj}\nstream\n${streamContent}\nendstream\nendobj\n`

const xrefStart = byteLength(pdf)
pdf += `xref\n0 ${offsets.length}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, pdf, 'latin1')
console.log(`Wrote placeholder resume -> ${outPath} (${byteLength(pdf)} bytes)`)