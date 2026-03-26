export type JournalStackItem = {
  id: string
  name: string
}

export type JournalTestimonial = {
  id: string
  author: string
  position: string
  quote: string
  linkedin: string
  color: string
}

export type JournalExperience = {
  slug: string
  entryCode: string
  title: string
  company: string
  link_company?: string
  date: string
  description: string
  bodyParagraphs: string[]
  thumbnail: string
  image: string
  color: string
  location: string
  stack: JournalStackItem[]
  testimonials: JournalTestimonial[]
}

export const JOURNAL_STACK_CARD_LABELS = [
  'CORE',
  'FRAMEWORK',
  'STYLES',
  'STATE',
  'OPS',
  'DATA',
] as const

export const journalExperiences: JournalExperience[] = [
  {
    slug: 'banco-comafi',
    entryCode: '041',
    title: 'Fullstack Developer',
    company: 'Banco Comafi',
    link_company: 'https://www.comafi.com.ar/',
    date: 'Jun 2024 - Currently',
    description:
      'In my role on the team, I contribute to the creation of frontend components with Next.js and TypeScript, as well as backend development using AWS Serverless. I work within a microfrontend architecture, handling security profiles and permissions, and collaborating closely with business stakeholders to translate requirements into scalable solutions. My work includes designing and implementing user interfaces and managing cloud services to ensure seamless platform functionality.',
    bodyParagraphs: [
      'Operating at the intersection of performance and editorial UI inside a regulated banking context. I build interfaces with Next.js and TypeScript that need to stay fast, accessible, and consistent across teams, within a microfrontend architecture.',
      'On the backend side I work with AWS Serverless patterns: APIs, integrations, and operational glue that keeps releases predictable while the product surface keeps evolving. I also manage security profiles and access control to ensure compliance and data integrity.',
      'Working under Scrum methodology, I collaborate closely with business stakeholders to understand rules, translate requirements into technical solutions, and ensure that each feature aligns with both user needs and business goals.',
    ],
    thumbnail: '/images/company_logo/comafi-logo.jpg',
    image: '/images/company_logo/comafi.webp',
    color: '#0e5c02de',
    location: 'Buenos Aires, AR',
    stack: [
      { id: 'nextjs', name: 'NEXT.JS' },
      { id: 'typescript', name: 'TYPESCRIPT' },
      { id: 'aws', name: 'AWS' },
      { id: 'nodejs', name: 'NODE.JS' },
      { id: 'materialui', name: 'MATERIAL UI' },
      { id: 'tailwind', name: 'TAILWIND' },
      { id: 'figma', name: 'FIGMA' },
    ],
    testimonials: [],
  },
  {
    slug: 'crack-the-code',
    entryCode: '040',
    title: 'Frontend Consultant',
    company: 'Crack the Code',
    date: 'Jan 2024 - Apr 2024',
    description:
      'I developed educational materials for frontend courses within an educational institution and trained instructors delivering the program. The curriculum included technologies such as Git, HTML, CSS, JavaScript, ReactJS, Tailwind, and Bootstrap.',
    bodyParagraphs: [
      'I produced curriculum-ready frontend material for institutional courses and coached instructors who delivered the program in the classroom.',
      'The stack footprint was intentionally wide: Git workflows, semantic HTML, CSS architecture, JavaScript fundamentals, React for UI composition, plus Tailwind and Bootstrap where layout speed mattered.',
      'Beyond slides and demos, the focus was repeatable teaching patterns: exercises that scale, clear evaluation criteria, and guidance that helps tutors stay aligned across cohorts.',
    ],
    thumbnail: '/images/exp.png',
    image: '/images/exp.png',
    color: '#2a1f3d',
    location: 'Buenos Aires, AR',
    stack: [
      { id: 'reactjs', name: 'REACT' },
      { id: 'typescript', name: 'TYPESCRIPT' },
      { id: 'tailwind', name: 'TAILWIND' },
      { id: 'bootstrap', name: 'BOOTSTRAP' },
      { id: 'git', name: 'GIT' },
      { id: 'javascript', name: 'JAVASCRIPT' },
    ],
    testimonials: [],
  },
  {
    slug: 'proactive-talent-hub',
    entryCode: '039',
    title: 'Frontend Developer',
    company: 'Proactive Talent Hub',
    date: 'Feb 2023 - Apr 2024',
    link_company: 'https://www.linkedin.com/company/proactivetalenthub',
    description:
      'In my role as a frontend developer, I create and implement web platforms using ReactJS, focusing on delivering seamless layouts and user experiences.',
    bodyParagraphs: [
      'I shipped production UIs with React, turning loose product ideas into responsive layouts that stayed maintainable as requirements moved.',
      'The emphasis was craft at the layout layer: predictable components, cohesive spacing, and interaction states that felt intentional on real devices.',
      'I worked closely with stakeholders in an early-stage environment—balancing speed with structure so the frontend could keep absorbing new features without collapsing into ad-hoc patches.',
    ],
    thumbnail: '/images/company_logo/path.jpg',
    image: '/images/company_logo/proactive.avif',
    color: '#031b37c9',
    location: 'Buenos Aires, AR',
    stack: [
      { id: 'reactjs', name: 'REACT' },
      { id: 'javascript', name: 'JAVASCRIPT' },
      { id: 'bootstrap', name: 'BOOTSTRAP' },
      { id: 'css', name: 'CSS' },
    ],
    testimonials: [
      {
        id: 'caplan',
        author: 'Diego Caplan',
        position: 'Founder ID for Ideas',
        quote:
          'I had the pleasure of working with Fernando at the startup where he developed the frontend of our application. From day one, he showed great commitment and enthusiasm for learning, providing creative and effective solutions to the challenges of the project.\n\nDespite taking his first steps in the development world, his adaptability, proactive mindset and focus on quality made a big difference in the team. He was always willing to collaborate, receive feedback and continuously improve, which made him a key pillar in the development of the product.\n\nFernando not only brought technical frontend skills, but also left his mark with his excellent attitude and teamwork skills. I have no doubt that he will continue to grow and make a positive impact on any team he is on. Highly recommended!',
        linkedin: 'https://www.linkedin.com/in/caplandiego/',
        color: '#a00f3b',
      },
    ],
  },
  {
    slug: 'coderhouse',
    entryCode: '038',
    title: 'Web Development Teacher',
    company: 'Coderhouse',
    link_company: 'https://www.coderhouse.com/',
    date: 'October 2021 - December 2024',
    description:
      'I started as a tutor in 2021, was promoted to coordinator in 2022, and to professor the same year—designing lesson plans, guiding students and the tutoring team, teaching HTML, CSS, SASS, Bootstrap, JavaScript, and Git.',
    bodyParagraphs: [
      'I joined Coderhouse in 2021 as a tutor, working hands-on with students in weekly support cycles; in 2022 I moved up to coordinator to align tutors, pacing, and quality across cohorts, and later that year stepped into the professor role owning the full course arc.',
      'As professor I design syllabi and week-by-week delivery: concepts, practice sets, and checkpoints that keep beginners progressing without losing the “why”.',
      'The toolkit spans HTML, CSS, SASS, Bootstrap, JavaScript, and Git—enough breadth that students ship small real sites and see how those layers depend on each other.',
      'I still invest heavily in mentoring tutors: unblocking pedagogy, standardizing feedback, and keeping outcomes consistent across parallel classrooms.',
    ],
    thumbnail: '/images/company_logo/coder.jpg',
    image: '/images/company_logo/coderhouse.jpg',
    color: '#191919e0',
    location: 'Buenos Aires, AR',
    stack: [
      { id: 'html', name: 'HTML' },
      { id: 'css', name: 'CSS' },
      { id: 'javascript', name: 'JAVASCRIPT' },
      { id: 'bootstrap', name: 'BOOTSTRAP' },
      { id: 'git', name: 'GIT' },
      { id: 'scss', name: 'SCSS' },
      { id: 'python', name: 'PYTHON' },
      { id: 'django', name: 'DJANGO' },
    ],
    testimonials: [
      {
        id: 'lema',
        author: 'Nahuel Lema',
        position: 'Co-Founder Coderhouse',
        quote:
          'Fernando is a master of JavaScript. His ability to teach in a clear and motivating way is exceptional. Fernando excels in web development, JavaScript and effective teaching methods and I highly recommend Fernando as a teacher for those who want to master JavaScript!',
        linkedin: 'https://www.linkedin.com/in/nahuellema/',
        color: '#282022',
      },
      {
        id: 'massonnat',
        author: 'Mario Massonnat',
        position:
          "Technical Facilitator of 'Yo Puedo Programar' in Junior Achievement Santa Fe",
        quote:
          'Excellent tutor and great developer. He demonstrates a lot of knowledge and is also a very responsible and predisposed person for his work.',
        linkedin: 'https://www.linkedin.com/in/mario-massonnat/',
        color: '#312032',
      },
      {
        id: 'martin',
        author: 'Martin Manriquez Leon',
        position: 'Software Engineer in BlackLine',
        quote:
          'Fernando has been an incredible contributor to the projects he is involved in, being active with any questions or suggestions and bringing new topics to the discussions and meetings.',
        linkedin: 'https://www.linkedin.com/in/martin-manriquez/',
        color: '#342324',
      },
    ],
  },
]

export function getJournalBySlug(slug: string): JournalExperience | undefined {
  return journalExperiences.find((e) => e.slug === slug)
}
