// Central content for the portfolio. Edit anything here to update the site.

export const profile = {
  name: 'SANTHOSH S V',
  firstName: 'SANTHOSH',
  role: 'Full Stack Developer',
  roleSecondary: 'Software Engineering Student',
  tagline: 'Crafting clean interfaces and solving problems with code.',
  email: 'santhoshsv0927@gmail.com',
  phone: '+91 80564 36278',
  phoneHref: 'tel:+918056436278',
  location: 'Salem, India',
  linkedin: 'https://www.linkedin.com/in/santhosh-s-v-8b29a',
  resumePath: '/resume.pdf',
  photoPath: '/santhosh.jpeg.jpeg', // profile photo used across the site (Hero overlay + About)
  photoPlaceholderText:
    'Profile photo goes here — add a JPEG/PNG and name it "profile.jpg" inside the public folder.',
  about: [
    'A Computer Science undergraduate passionate about building intuitive, user-focused software.',
    'I enjoy turning ideas into functional products — from voice assistants to data dashboards — and I am constantly expanding my skill set across front-end development, UI/UX design, and data-driven problem solving.',
  ],
}

export const heroSocials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/santhosh-s-v-8b29a',
    icon: 'linkedin',
    aria: 'Open Santhosh for trying LinkedIn profile',
  },
  {
    label: 'Email',
    href: 'mailto:santhoshsv0927@gmail.com',
    icon: 'mail',
    aria: 'Send Santhosh an email',
  },
  {
    label: 'Phone',
    href: 'tel:+918056436278',
    icon: 'phone',
    aria: 'Call Santhosh',
  },
]

export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Education', id: 'education' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
]

export const education = [
  {
    degree: 'B.E. Computer Science and Engineering',
    school: 'Knowledge Institute of Technology',
    period: '2022 – 2026',
    detail: 'CGPA 7.73 / 10.0',
    icon: 'graduationCap',
  },
  {
    degree: 'Higher Secondary (HSC)',
    school: 'Kamarajar Matric Hr. Sec. School',
    period: '2021 – 2022',
    detail: '70.8%',
    icon: 'bookOpen',
  },
  {
    degree: 'Secondary School (SSLC) · CBSE',
    school: 'Sriswamy International School',
    period: '2019 – 2020',
    detail: '69.6%',
    icon: 'school',
  },
]

export const skillGroups = [
  {
    id: 'programming',
    title: 'Programming',
    blurb: 'Strong fundamentals with modern tooling.',
    icon: 'code',
    tint: 'bg-lilac',
    skills: ['Python', 'Java', 'C', 'MySQL', 'HTML / CSS', 'JavaScript'],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    blurb: 'Turning raw data into decisions.',
    icon: 'chart',
    tint: 'bg-mist',
    skills: ['Power BI', 'DAX', 'SQL', 'Excel', 'Power Query', 'Tableau'],
  },
  {
    id: 'design',
    title: 'Design',
    blurb: 'Wires, prototypes & pixel-perfect UI.',
    icon: 'palette',
    tint: 'bg-blush',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Wireframing', 'Prototyping'],
  },
]

export const projects = [
  {
    title: 'Student Enterprise Resource Planning System',
    summary:
      'A full student management platform handling personal records, attendance, grades, and course enrollment — built with Java, MySQL, and a lightweight HTML/CSS front end.',
    tags: ['Java', 'MySQL', 'HTML', 'CSS'],
    accent: 'from-ac-blue to-ac-lav',
  },
  {
    title: 'WomenSafety & POSH Platform',
    summary:
      'Developed a digital solution to foster secure, inclusive environments by streamlining POSH compliance and women-safety protocols. Features an anonymous grievance reporting system and real-time emergency alerts for legal documentation — improved incident reporting transparency by 30%.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    accent: 'from-ac-lav to-ac-peach',
  },
  {
    title: 'Ticket Booking Site',
    summary:
      'Built a responsive, user-friendly ticket booking platform as a Full Stack Developer, handling frontend design, backend logic, database integration, and seamless booking flow end-to-end.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    accent: 'from-ac-blue to-ac-sky',
  },
  {
    title: 'Power BI Dashboard — Blinkit Analytics',
    summary:
      'An interactive business intelligence dashboard analyzing revenue trends, product categories, and regional performance, built with Power BI, DAX, SQL, and Power Query for end-to-end data cleaning and visualization.',
    tags: ['Power BI', 'DAX', 'SQL', 'Power Query'],
    accent: 'from-ac-peach to-ac-sky',
  },
]

export const experiences = [
  {
    role: 'Java Programming Intern',
    company: 'DevSkillHub',
    period: 'Feb – Apr 2024',
    points: [
      'Built OOP-based Java applications with exception handling, file I/O, and multithreading.',
      'Developed with Eclipse / IntelliJ and managed source control with Git.',
    ],
    icon: 'coffee',
  },
  {
    role: 'UI/UX Design Intern',
    company: 'CODSOFT',
    period: 'Feb – Mar 2024',
    points: [
      'Designed wireframes and interactive prototypes with Figma and Adobe XD.',
      'Focused on usability and user-centered design principles.',
    ],
    icon: 'palette',
  },
  {
    role: 'App Development Intern',
    company: 'LITZ TECH',
    period: 'Jul 2024',
    points: ['Built mobile app fundamentals using Flutter and Dart in a fast-paced program.'],
    icon: 'phone',
  },
  {
    role: 'Data Analytics Intern',
    company: 'TECHNOHACKS',
    period: 'Mar – Apr 2025',
    points: [
      'Collected, cleaned, and analyzed datasets using Excel and Python (Pandas, NumPy, Matplotlib).',
      'Presented insights with Power BI and Tableau dashboards.',
    ],
    icon: 'chart',
  },
]

export const certificates = [
  { title: 'Java Programming', icon: 'code', tint: 'bg-lilac text-ac-lav' },
  { title: 'App Development', icon: 'smartphone', tint: 'bg-mist text-ac-blue' },
  { title: 'UI & UX Design', icon: 'palette', tint: 'bg-blush text-ac-peach' },
  { title: 'Data Analytics', icon: 'pie', tint: 'bg-mist text-ac-lav' },
]

export const languages = [
  { name: 'Tamil', level: 'Native', proficiency: 100 },
  { name: 'English', level: 'Fluent', proficiency: 90 },
  { name: 'Hindi', level: 'Conversational', proficiency: 65 },
  { name: 'Japanese', level: 'Pursuing JLPT N5', proficiency: 20 },
]

export const interests = [
  {
    title: 'Design',
    text: 'Crafting clean, intuitive interfaces and delightful micro-interactions.',
    icon: 'palette',
  },
  {
    title: 'Software Testing',
    text: 'Ensuring quality and reliability through thoughtful test strategies.',
    icon: 'shield',
  },
  {
    title: 'Web Development',
    text: 'Building fast, accessible, and responsive experiences for the web.',
    icon: 'globe',
  },
]

export const stats = [
  { value: '3+', label: 'Years of CS study' },
  { value: '4', label: 'Internships completed' },
  { value: '3+', label: 'Functional projects' },
  { value: '4', label: 'Languages & counting' },
]