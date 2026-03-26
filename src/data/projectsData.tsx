export type ProjectTechEntry =
  | string
  | { name: string; category?: string; version?: string }

export function formatProjectTechLabel(entry: ProjectTechEntry): string {
  if (typeof entry === 'string') return entry.trim()
  const base = entry.name.trim()
  return entry.version ? `${base} ${entry.version}`.trim() : base
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  text: string[];
  secondary: string[];
  technologies: ProjectTechEntry[];
  thumbnail?: string;
  heroImage: string;
  images: {
    src: string;
    alt: string;
    caption?: string;
    aspect?: 'tall' | 'wide' | 'square';
  }[];
  mobileFirst: boolean;
  github: string;
  live: string;
  next: string;
  features: {
    title: string;
    description: string;
  }[];
  highlights: string[];
  role: string;
  duration: string;
  year: string;
  challenges?: string[];
  heroKicker?: string;
  heroTitleLines?: [string, string];
  heroDeco?: string;
  client?: string;
  visualQuote?: string;
  overviewBody?: string;
  solutionParagraphs?: string[];
  solutionAccentPhrase?: string;
  featureIcons?: string[];
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export const projectData: Project[] = [
  {
    id: "gastando",
    title: "Gastando",
    category: "Full Stack Development",
    summary: "An AI-powered personal finance management platform",
    description:
      "Gastando is a full-stack web application built for personal and household financial management. It centralizes expense tracking, income logging, savings goals, recurring bills, installment purchases, and service quotations under a single REST API — augmented by a multimodal AI agent (text, voice, and receipt images) and integrated with Mercado Pago for subscription billing.",
    text: [
      "Gastando is a full-stack personal finance platform built with Node.js, Express, TypeScript, and Next.js. The backend exposes a comprehensive REST API backed by PostgreSQL via Prisma ORM, handling everything from monthly expense tracking by category and subcategory to installment-based recurring charges, dynamic recurring services with variable amounts, savings jars with scheduled reminders, and professional service quotations. The frontend, built with Next.js 16 App Router and React 19, offers a polished PWA experience with sidebar navigation, mobile-first layouts, and rich dashboard analytics powered by Recharts.",
      "At the core of the product sits a multimodal AI agent — accessible via chat, voice, and image upload — that lets users log expenses, income, recurring transactions, and savings contributions through natural language. The agent supports guided confirmation flows, maintains per-user conversation history, and enforces daily and monthly usage limits tied to subscription plans (FREE, GASTO_PLUS, GASTO_BLACK, CUSTOM). Mercado Pago handles subscription lifecycle via webhooks, and the platform also supports Telegram bot integration for extending financial workflows outside the web interface.",
      "The system is designed for the Argentine market with ARS as the default currency and America/Argentina/Buenos_Aires as the cron timezone, but is architected to be extensible to other locales. Security is layered across JWT httpOnly cookies, OAuth (Google + X/Twitter), role-based authorization, per-route rate limiting, Helmet headers, Zod input validation, and a full audit log. Reports are exportable as Excel (ExcelJS) or PDF (PDFKit + Playwright-rendered), and bulk imports are accepted via Excel/CSV upload or through the AI agent."
    ],
    solutionAccentPhrase: "one ledger, every layer",
    solutionParagraphs: [
      "Rather than splitting money management across spreadsheets and apps, Gastando collapses the whole financial loop — logging, recurring rules, savings goals, analytics, and AI coaching — into one coherent API surface and a single dashboard that adapts to the user's plan tier.",
      "The AI agent removes the biggest barrier to consistent tracking: the friction of manual entry. Speaking or snapping a receipt is enough; the agent extracts intent, proposes the transaction, and waits for a one-tap confirmation before writing to the ledger.",
      "Subscription plans are enforced at the middleware level with live counters (PlanUsage), so premium features like advanced analytics, unlimited voice messages, and bulk imports gate naturally without bespoke UI toggles — the product scales its own surface area as users upgrade."
    ],
    secondary: [
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Zod",
      "JWT",
      "OAuth",
      "Mercado Pago",
      "Recharts",
      "TanStack Query",
      "Axios",
      "node-cron",
      "Nodemailer",
      "Resend",
      "Telegram Bot API",
      "Playwright",
      "PDFKit",
      "ExcelJS",
      "OpenAI",
      "Google Gemini",
      "Deepgram"
    ],
    technologies: [
      // Backend
      { name: "Node.js", category: "runtime", version: "18+" },
      { name: "Express.js", category: "framework" },
      { name: "TypeScript", category: "language", version: "5.5" },
      { name: "PostgreSQL", category: "database", version: "12+" },
      { name: "Prisma", category: "orm", version: "5" },
      { name: "Zod", category: "validation" },
      { name: "JWT (jsonwebtoken)", category: "auth" },
      { name: "Passport.js", category: "auth" },
      { name: "bcrypt", category: "auth" },
      { name: "Helmet", category: "security" },
      { name: "express-rate-limit", category: "security" },
      { name: "Multer", category: "file-handling" },
      { name: "ExcelJS", category: "reporting" },
      { name: "PDFKit", category: "reporting" },
      { name: "Playwright (Chromium)", category: "reporting" },
      { name: "node-cron", category: "scheduling" },
      { name: "node-cache", category: "caching" },
      { name: "Axios", category: "http" },
      { name: "Nodemailer", category: "email" },
      { name: "Resend", category: "email" },
      { name: "Mercado Pago SDK", category: "payments" },
      { name: "OpenAI SDK", category: "ai" },
      { name: "Google Generative AI (Gemini)", category: "ai" },
      { name: "Deepgram SDK", category: "ai/voice" },
      { name: "node-telegram-bot-api", category: "messaging" },
      { name: "swagger-jsdoc + swagger-ui-express", category: "documentation" },
      { name: "Next.js", category: "framework", version: "16 (App Router)" },
      { name: "React", category: "ui", version: "19" },
      { name: "Tailwind CSS", category: "styling", version: "4" },
      { name: "Radix UI", category: "ui-primitives" },
      { name: "TanStack Query", category: "data-fetching" },
      { name: "Recharts", category: "data-visualization" },
      { name: "Framer Motion / Motion", category: "animation" },
      { name: "Lucide React", category: "icons" },
      { name: "Vercel Analytics", category: "analytics" }
    ],
    images: [
      {
        src: "/images/projects/gasto-1.png",
        alt: "Gastando dashboard — financial overview with charts and expense breakdown"
      },
      {
        src: "/images/projects/gasto-2.png",
        alt: "Gastando AI agent — multimodal chat interface with voice and receipt upload"
      },
      {
        src: "/images/projects/gasto-3.png",
        alt: "Gastando analytics — period comparison, category trends and insights"
      },
      {
        src: "/images/projects/gasto-4.png",
        alt: "Gastando savings jars and recurring expenses management"
      }
    ],
    heroImage: "/images/projects/gasto-1.png",
    mobileFirst: true,
    github: "",
    live: "https://www.gastando.com.ar",
    next: "linkinpark",
    features: [
      {
        title: "Monthly Expense Tracking",
        description:
          "Expenses are organized by month, year, category, and subcategory with automatic totals. Supports bulk import from Excel/CSV and export to Excel or PDF."
      },
      {
        title: "Income Management",
        description:
          "Log income entries with source, type (daily / weekly / monthly), date, and currency. Full CRUD with pagination and date-range filtering."
      },
      {
        title: "Installment & Recurring Expenses",
        description:
          "Fixed recurring charges (daily / weekly / monthly) with an optional N-installment ceiling linked to a credit card. A nightly cron job advances counters and auto-creates the period entry."
      },
      {
        title: "Dynamic Recurring Services",
        description:
          "Variable-amount services (utilities, streaming) trigger configurable advance notices; the user confirms the exact amount for the month before the system commits the charge."
      },
      {
        title: "Savings Jars",
        description:
          "Goal-based savings buckets with a target amount, accumulated contributions, optional deadline, and daily scheduled reminders to keep users on track."
      },
      {
        title: "Multimodal AI Agent",
        description:
          "Chat, voice, and receipt-image endpoints backed by OpenAI and Google Gemini. The agent parses intent, proposes transactions, and waits for user confirmation before writing to the ledger. Usage is metered per plan."
      },
      {
        title: "Rich Analytics & Reports",
        description:
          "Dashboard, quick stats, charts (Recharts), period comparisons, category breakdowns, projections, and AI-generated insights. Exportable as Excel or Playwright-rendered PDF."
      },
      {
        title: "Subscription Plans & Mercado Pago",
        description:
          "FREE / GASTO_PLUS / GASTO_BLACK / CUSTOM plans with per-feature limits enforced via PlanUsage counters. Full Mercado Pago subscription lifecycle: creation, cancellation, payment history, and webhook sync."
      },
      {
        title: "Service Quotations",
        description:
          "CRUD module for professional service quotes including client info, time estimates, materials breakdown, and computed totals — scoped per user."
      },
      {
        title: "Telegram Integration",
        description:
          "Optional bot linking so users can interact with their financial data and receive notifications directly inside Telegram via webhook."
      },
      {
        title: "Notifications & Email",
        description:
          "In-app notification inbox with unread counters, plus transactional emails via SMTP (Nodemailer) or Resend: monthly summaries, inactivity nudges, subscription renewal warnings, jar reminders, and more."
      },
      {
        title: "Admin Panel",
        description:
          "Role-gated admin dashboard with full user management, manual subscription handling, plan configuration, audit logs, error logs, feedback review, and operational analytics including revenue summaries and top-usage rankings."
      }
    ],
    challenges: [
      "Designing a plan-enforcement layer that meters 10+ feature dimensions (chat, voice, receipts, imports, exports, jars, PDF reports, etc.) in real time without adding latency to hot paths",
      "Building a confirmation-flow protocol for the AI agent that handles six transaction types (expense, income, recurring, dynamic recurring, create jar, contribute to jar) in a stateless HTTP API while preserving conversation context",
      "Rendering pixel-accurate multi-page PDF reports server-side using both PDFKit for lightweight summaries and Playwright/Chromium for analytics pages with charts",
      "Keeping recurring-expense logic correct across monthly boundary cases (variable month lengths, N-installment termination, dynamic-service confirmation deadlines) in a single nightly cron run",
      "Integrating three AI providers (OpenAI, Gemini, Deepgram) behind a unified agent interface while keeping API keys, rate limits, and fallback logic manageable across environments",
      "Implementing Mercado Pago subscription webhooks reliably: verifying signatures, handling retries, syncing plan state, and reconciling manual admin overrides without race conditions"
    ],
    highlights: [
      "End-to-end full-stack architecture — REST API, relational DB with migrations, React SPA, cron jobs, webhooks, and AI integration — built and maintained as a solo project",
      "Multimodal AI agent with voice transcription, receipt OCR, guided confirmations, persistent history, and per-plan usage throttling",
      "PWA-ready Next.js 16 frontend with App Router, mobile-first sidebar layout, Recharts dashboards, and plan-aware theming (GASTO_BLACK dark theme)",
      "Eight scheduled cron jobs covering recurring expense generation, AI insights, email summaries, inactivity nudges, jar reminders, and agent history cleanup",
      "Layered security: JWT httpOnly cookies, OAuth (Google + X), Helmet, per-route rate limiting, Zod validation, ownership middleware, and full audit trail",
      "Flexible plan system with hard-coded FREE/PLUS/BLACK limits in code and fully dynamic CUSTOM plans stored in the database and synced with Mercado Pago"
    ],
    role: "Full Stack Developer",
    duration: "6 months",
    year: "2025-2026",
    colors: {
      primary: "rgb(99, 102, 241)",       // indigo-500 — main brand accent
      secondary: "rgb(167, 139, 250)",    // violet-400 — secondary accent
      background: "rgb(15, 23, 42)",      // slate-900 — dark dashboard bg
      text: "rgb(226, 232, 240)"          // slate-200 — body text on dark
    }
  },
  {
    id: "linkinpark",
    title: "Linkin Park",
    category: "Web Development",
    summary: "A tribute to Linkin Park",
    description: "A tribute to Linkin Park",
    text: [
      "Proyecto Final CoderHouse is a final project created for the Web Development course at Coderhouse. The project is a fan page dedicated to the band Linkin Park. It features real content extracted from their official page, including detailed information about the band members, their discography, and a media gallery with photos and videos. The project aims to provide a comprehensive and engaging experience for fans of Linkin Park.",
      "The project heavily utilizes HTML for structure, CSS for styling, and SCSS for advanced styling features, ensuring a responsive and visually appealing design across various devices."
    ],
    solutionAccentPhrase: "living media spine",
    solutionParagraphs: [
      "Instead of a flat tribute wall, the site is built as a living media spine: discography, member arcs, and visuals share one rhythm so fans scan eras without getting lost in noise.",
      "Approved copy from the official channel anchors trust—dates stay accurate, galleries stay ordered, and the story reads like a timeline rather than a random dump of assets.",
      "HTML carries structure, SCSS carries the system, and Bootstrap only appears where velocity matters, keeping the interface calm while the content does the shouting."
    ],
    secondary: ["HTML", "CSS", "SCSS", "BOOTSTRAP", "JAVASCRIPT"],
    technologies: [],
    images: [
      {
        src: "/images/projects/lp-1.png",
        alt: "Linkin Park project image 1"
      },
      {
        src: "/images/projects/lp-2.png",
        alt: "Linkin Park project image 2"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "https://github.com/feralarcon1995/ProyectoFinalCoderHouse",
    live: "https://feralarcon1995.github.io/ProyectoFinalCoderHouse/",
    next: "handcode",
    features: [
      {
        title: "Fan Page Creation",
        description: "Developed a fan page for the band Linkin Park, featuring real content extracted from their official site."
      },
      {
        title: "Member Information",
        description: "Provides detailed information about the band members."
      },
      {
        title: "Discography",
        description: "Includes an extensive discography of the band."
      },
      {
        title: "Media Gallery",
        description: "Features a gallery of photos and videos of the band."
      }
    ],
    challenges: [
      "Integrating real content from the official site",
      "Ensuring responsive design across various devices",
      "Organizing extensive media content",
      "Maintaining up-to-date information"
    ],
    highlights: [
      "Successfully developed a comprehensive fan page for Linkin Park",
      "Achieved a responsive design that works on multiple devices",
      "Organized and presented a large collection of media content",
      "Provided detailed and accurate information about the band and its members"
    ],
    role: "Developer",
    duration: "2 months",
    year: "2023",
    colors: {
      primary: "rgb(61, 61, 61)",
      secondary: "rgba(191, 191, 191, 1)",
      background: "rgba(255, 255, 255, 1)",
      text: "rgba(51, 51, 51, 1)"
    }
  },
  {
    id: "handcode",
    title: "Handcode",
    category: "Web Development",
    summary: "A web development company",
    description: "A web development company",
    text: [
      "Hand Code is a comprehensive web development project designed to provide a wide range of reusable components and assets for creating modern and responsive web applications. The project includes a collection of SCSS, JavaScript, and CSS files, as well as organized assets such as images and fonts."
    ],
    solutionAccentPhrase: "drop-in production kit",
    solutionParagraphs: [
      "The goal was not another theme folder but a drop-in production kit: tokens, utilities, and JS helpers that teams can paste into a sprint without rewriting the same primitives.",
      "SCSS layers define spacing, type, and surfaces once; JavaScript modules handle the small interactions that usually sprawl across anonymous script tags.",
      "Assets stay namespaced and documented so the library scales from a landing page to a multi-section product without turning into an unmaintainable grab bag."
    ],
    secondary: ["HTML", "CSS", "SCSS", "BOOTSTRAP", "JAVASCRIPT"],
    technologies: [],
    images: [
      {
        src: "/images/projects/hand-1.png",
        alt: "Handcode project image 1"
      },
      {
        src: "/images/projects/hand-2.png",
        alt: "Handcode project image 2"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "https://handcode.com.ar/",
    live: "https://handcode.com.ar/",
    next: "tiendablu",
    features: [{
      title: "Custom SCSS",
      description: "A collection of SCSS files for building custom styles for your web projects."
    },
    {
      title: "JavaScript Utilities",
      description: "A set of JavaScript utilities to enhance interactivity and functionality of web pages."
    },
    {
      title: "Predefined CSS",
      description: "Ready-to-use CSS files to quickly style your web pages with a professional look."
    },
    {
      title: "Asset Management",
      description: "Organized asset folders for images and fonts to keep your project neat and scalable."
    }],
    highlights: ["Successfully implemented a modular SCSS architecture",
      "Developed reusable JavaScript components",
      "Achieved a consistent design language across the project",
      "Organized assets for better project management and scalability"],
    challenges: ["Ensuring cross-browser compatibility",
      "Managing dependencies and version control",
      "Maintaining a scalable and organized project structure",
      "Optimizing performance for large-scale projects"],
    role: "Developer",
    duration: "3 months",
    year: "2023",
    colors: {
      primary: "rgba(255, 93, 209, 1)",
      secondary: "rgba(178, 51, 136, 1)",
      background: "rgba(26, 26, 26, 1)",
      text: "rgba(255, 255, 255, 1)"
    }
  },
  {
    id: "tiendablu",
    title: "Tienda Blu",
    category: "Ecommerce",
    summary: "An Ecommerce of sportswear",
    description: "An Ecommerce of sportswear",
    text: [
      "Tienda Blu is an e-commerce platform for sportswear developed using React Js. The application allows users to browse through various categories of sportswear, view detailed product descriptions, and make purchases. The project leverages Firebase for backend services, including user authentication, data storage, and order management."
    ],
    solutionAccentPhrase: "checkout clarity",
    solutionParagraphs: [
      "Retail UX here hinges on checkout clarity: categories stay shallow, product cards stay scannable, and the path from size selection to confirmation never hides behind mystery steps.",
      "Firebase handles auth, catalog persistence, and orders so the React layer can stay declarative—components reflect state instead of fighting ad-hoc fetches.",
      "Responsive rules were baked in from the first layout pass so merchandising imagery and sizing tables remain legible on phones, where most sessions actually start."
    ],
    secondary: ["HTML", "CSS", "SCSS", "BOOTSTRAP", "JAVASCRIPT", "REACTJS", "FIREBASE"],
    technologies: [],
    images: [
      {
        src: "/images/projects/tienda-1.png",
        alt: "Tienda Blu project image 1"
      },
      {
        src: "/images/projects/tienda-2.png",
        alt: "Tienda Blu project image 2"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "https://github.com/feralarcon1995/TiendaBlu",
    live: "https://feralarcon1995.github.io/TiendaBlu/",
    next: "pinder",
    features: [{
      title: "E-commerce Platform",
      description: "An e-commerce platform for sportswear developed in React Js, where users can browse and purchase items from various categories."
    },
    {
      title: "Firebase Integration",
      description: "Utilizes Firebase for backend services, including user authentication, data storage, and order management."
    },
    {
      title: "Responsive Design",
      description: "Implemented with CSS to ensure the application is responsive and accessible across different devices."
    },
    {
      title: "Component-Based Architecture",
      description: "Built with a component-based architecture in React Js, allowing for modular and reusable code."
    }],
    challenges: [
      "Ensuring seamless integration with Firebase services",
      "Maintaining responsive design across various devices",
      "Managing state and data flow within a component-based architecture",
      "Deploying the application on Vercel for smooth user experience"
    ],
    highlights: ["Successfully integrated Firebase for backend services",
      "Achieved a fully responsive design",
      "Developed a modular and reusable component-based architecture",
      "Deployed the application on Vercel, ensuring high availability and performance"],
    role: "Developer",
    duration: "4 months",
    year: "2023",
    colors: {
      primary: "#2f79ff",
      secondary: "#1e52b3",
      background: "#e3ecff",
      text: "#1a1a1a"
    }
  },
  {
    id: "pinder",
    title: "Pinder",
    category: "Pet Blog",
    summary: "A Pet Blog made in Django",
    description: "A Pet Blog made in Django",
    text: [
      "Pinder is an innovative web application developed using Python and the Django framework. The project is designed to help users find and adopt pets, making it easier to match with their next four-legged companion. The application provides a comprehensive platform where users can register, create profiles, and browse through available pets."
    ],
    solutionAccentPhrase: "adoption-first storytelling",
    solutionParagraphs: [
      "Listings only work when empathy leads, so the interface follows adoption-first storytelling: animals get context, not just filenames, and humans see pathways instead of empty forms.",
      "Django keeps models, permissions, and admin workflows honest—moderation, profiles, and posts stay tied to real database relations instead of brittle shortcuts.",
      "Bootstrap supplies the responsive skeleton while custom templates tune spacing and hierarchy so reading a pet profile feels closer to a magazine spread than a spreadsheet row."
    ],
    secondary: ["HTML", "CSS", "BOOTSTRAP", "PYTHON", "DJANGO", "SQLITE"],
    technologies: [],
    images: [
      {
        src: "/images/projects/pinder/pinder.png",
        alt: "Pinder project image"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "https://github.com/feralarcon1995/Pinder",
    live: "https://github.com/feralarcon1995/Pinder",
    next: "viajaya",
    features: [{
      title: "Find pets",
      description: "An app made with Python and its web framework Django, designed to help you find a pet, make a match with your next four-legged companion. You will register, have a profile, and browse through pets."
    },
    {
      title: "Responsive Design",
      description: "The app is designed to be responsive, working seamlessly on mobile phones, tablets, and desktops."
    },
    {
      title: "User Profiles",
      description: "Users can create profiles, view posts, and interact with other users."
    },
    {
      title: "Post and Comment",
      description: "Users can create posts about pets, comment on posts, and manage their posts and comments."
    }],
    challenges: ["Implementing responsive design for different devices",
      "Managing user authentication and profiles",
      "Handling CRUD operations for posts and comments",
      "Ensuring data persistence with SQLite"],
    highlights: ["Successfully implemented user authentication and profile management",
      "Achieved a responsive design that works across multiple devices",
      "Developed a functional CRUD system for posts and comments",
      "Deployed the app and made it accessible online"],
    role: "Developer",
    duration: "3 months",
    year: "2023",
    colors: {
      primary: "rgba(251, 255, 0, 1)",
      secondary: "rgba(165, 159, 0, 1)",
      background: "rgba(26, 26, 26, 1)",
      text: "rgba(255, 255, 255, 1)"
    }

  },
  {
    id: "viajaya",
    title: "Viajaya",
    category: "Expense Simulator",
    summary: "An expense simulator with the theme of travel",
    description: "An expense simulator with the theme of travel",
    text: [
      "ViajaYa is a final project created for the JavaScript course at Coderhouse. It is a fictional website that functions as a travel cost estimator. The site uses user-entered data and dynamically updates with the daily exchange rate of the Argentine peso to the US dollar. It includes various functionalities to make the site dynamic and interactive."
    ],
    solutionAccentPhrase: "peso-aware estimates",
    solutionParagraphs: [
      "Travel math breaks when currency lies, so the whole tool orbits peso-aware estimates: every slider and input re-runs against the live ARS→USD tape the moment the user breathes.",
      "jQuery wires DOM updates without ceremony—totals, breakdowns, and warnings stay in sync while the script stays readable for classmates auditing the coursework.",
      "The fictional brief became a sandbox for form validation, fetch rhythms, and optimistic UI feedback, proving the concept before touching a real payments API."
    ],
    secondary: ["HTML", "CSS", "BOOTSTRAP", "JAVASCRIPT", "JQUERY"],
    technologies: [],
    images: [
      {
        src: "/images/projects/viaja-1.png",
        alt: "Viajaya project image 1"
      },
      {
        src: "/images/projects/viaja-2.png",
        alt: "Viajaya project image 2"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "https://github.com/feralarcon1995/ViajaYa",
    live: "https://feralarcon1995.github.io/ViajaYa/",
    next: "lachinafutbol",
    features: [{
      title: "Travel Quote Calculator",
      description: "A dynamic and intuitive web application that functions as a travel quote calculator, using current Argentine peso exchange rates and user inputs."
    }],
    highlights: ["Real-time exchange rate updates",
      "User-friendly interface"],
    challenges: ["Dynamic currency conversion",
      "User input validation"],
    role: "Developer",
    duration: "3 months",
    year: "2023",
    colors: {
      primary: "rgba(0, 255, 157, 1)",
      secondary: "rgba(0, 122, 94, 1)",
      background: "rgba(18, 18, 18, 1)",
      text: "rgba(255, 255, 255, 1)"
    }
  },
  {
    id: "lachinafutbol",
    title: "LA CHINA FUTBOL",
    category: "Football Tournaments",
    summary: "Dynamic venues of each tournament",
    description: "Dynamic venues of each tournament",
    text: [
      "This project is a comprehensive football application designed to enhance the experience of football enthusiasts. It features a match schedule that allows users to view upcoming matches, detailed team statistics, and player profiles. The application also provides live scores of ongoing matches, ensuring fans stay updated in real-time.",
      "The project faced several challenges, including integrating live match updates, ensuring data accuracy, handling high traffic during major events, and providing real-time notifications."
    ],
    solutionAccentPhrase: "match-day rhythm",
    solutionParagraphs: [
      "Fans do not read databases—they feel match-day rhythm, so schedules, live markers, and player cards share one pulse instead of three disconnected widgets.",
      "WordPress and PHP glue editorial workflows with the custom JS layers that refresh scores and stats without forcing editors to touch deploy scripts.",
      "High-traffic weekends stress caching, query batching, and honest fallbacks; the layout keeps critical fixtures visible even when auxiliary feeds hiccup."
    ],
    secondary: ["HTML", "CSS", "WORDPRESS", "JAVASCRIPT", "JQUERY", "PHP"],
    technologies: [],
    images: [
      {
        src: "/images/projects/china-1.png",
        alt: "LA CHINA FUTBOL project image 1"
      },
      {
        src: "/images/projects/china-2.png",
        alt: "LA CHINA FUTBOL project image 2"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "empty",
    live: "https://lachinafutbol.com/",
    next: "guia-git",
    features: [
      { title: "Match Schedule", description: "View the schedule of upcoming matches" },
      { title: "Team Stats", description: "Check the statistics of your favorite teams" },
      { title: "Player Profiles", description: "Detailed profiles of players" },
      { title: "Live Scores", description: "Get live scores of ongoing matches" }
    ],
    challenges: [
      "Integrating live match updates",
      "Ensuring data accuracy",
      "Handling high traffic during major events",
      "Providing real-time notifications"
    ],
    highlights: [
      "Launched live match feature",
      "Reached 10,000 active users",
      "Partnered with major football leagues",
      "Implemented real-time notifications"
    ],
    role: "Developer",
    duration: "3 months",
    year: "2023",
    colors: {
      primary: "rgba(255, 93, 209, 1)",
      secondary: "rgba(178, 51, 136, 1)",
      background: "rgba(26, 26, 26, 1)",
      text: "rgba(255, 255, 255, 1)"
    }

  },
  {
    id: 'guia-git',
    title: "Guia Git",
    category: "Git Guide",
    summary: "A centralized Git guide for beginners",
    description: "A centralized Git guide for beginners",
    text: [
      "My website is a centralized Git guide designed for beginners, covering everything from setting up Git to mastering both basic and advanced commands. It explains how to install and configure Git, create repositories, and use essential commands like commits, branching, and merging. Additionally, it introduces GitHub as a key collaboration tool, teaching how to connect local projects to remote repositories, manage pull requests, and optimize workflows. This guide is meant to be a practical and accessible resource to help users confidently navigate version control and improve their software development skills."
    ],
    solutionAccentPhrase: "progressive command map",
    solutionParagraphs: [
      "Documentation fails when it reads like a dictionary, so the guide is a progressive command map: install, branch, merge, and remote flows build on each other with copy-pasteable snippets.",
      "Next.js keeps navigation instant while Tailwind keeps the reading experience calm—code blocks stay the hero, chrome stays quiet.",
      "Syntax highlighting turns opaque flags into legible recipes, and static generation keeps the whole reference deployable anywhere students already host class projects."
    ],
    secondary: ["NEXTJS", "TAILWIND", "JAVASCRIPT"],
    technologies: [],
    images: [
      {
        src: "/images/projects/guia-1.png",
        alt: "Guia Git project image 1"
      },
      {
        src: "/images/projects/guia-2.png",
        alt: "Guia Git project image 2"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "https://github.com/feralarcon1995/guia-git",
    live: "https://guia-git.vercel.app/",
    next: "moron",
    features: [{
      title: "Next.js Framework",
      description: "This project is built using the Next.js framework, providing server-side rendering and static site generation for improved performance and SEO."
    },
    {
      title: "React Integration",
      description: "Utilizes React for building interactive user interfaces with component-based architecture."
    },
    {
      title: "Code Highlighting",
      description: "Integrates 'react-code-blocks' for syntax highlighting in code snippets, enhancing readability."
    },
    {
      title: "Tailwind CSS",
      description: "Uses Tailwind CSS for efficient styling, allowing for rapid UI development with utility-first CSS classes."
    },
    {
      title: "Vercel Analytics",
      description: "Incorporates Vercel Analytics for monitoring and analyzing the application's performance and user interactions."
    }],
    challenges: [
      "Ensuring seamless integration with Next.js and React",
      "Managing state and data flow in a component-based architecture",
      "Implementing efficient styling with Tailwind CSS",
      "Optimizing performance for server-side rendering and static site generation",
      "Deploying and maintaining the application on Vercel"
    ],
    highlights: [
      "Successfully implemented server-side rendering and static site generation with Next.js",
      "Integrated React for interactive and dynamic user interfaces",
      "Enhanced code readability with syntax highlighting using 'react-code-blocks'",
      "Achieved efficient and scalable styling with Tailwind CSS",
      "Monitored application performance and user interactions with Vercel Analytics"
    ],
    role: "Frontend Developer",
    duration: "1 month",
    year: "2023",
    colors: {
      primary: "rgba(255, 91, 10, 1)",
      secondary: "rgba(179, 67, 7, 1)",
      background: "rgba(26, 26, 26, 1)",
      text: "rgba(255, 255, 255, 1)"
    }
  },
  {
    id: 'moron',
    title: "Presupuesto Participativo Moron",
    category: "Full Stack Development",
    summary: "A comprehensive digital democracy platform that enables citizens to participate in municipal budget allocation through transparent voting and project tracking.",
    description: "A comprehensive digital democracy platform that enables citizens to participate in municipal budget allocation through transparent voting and project tracking.",
    text: [
      "The Participatory Budgeting Platform revolutionizes how citizens engage with municipal budget decisions. Built with modern web technologies, it offers an intuitive interface for exploring, voting, and tracking community projects.",
      "This platform features real-time project tracking, secure voting mechanisms, and interactive data visualizations that help citizens understand the impact of their participation.",
      "The system integrates with municipal databases to provide accurate, up-to-date information about project progress, budget allocation, and community impact metrics."
    ],
    solutionAccentPhrase: "transparent civic ledger",
    solutionParagraphs: [
      "Municipal budgets need legitimacy, not just forms, so the product behaves like a transparent civic ledger: proposals, votes, and outcomes stay traceable from citizen screen to admin audit.",
      "Next.js and TypeScript carry the public experience while Django REST and PostgreSQL guard permissions, exports, and the relational graph between headquarters, users, and projects.",
      "Shadcn-backed UI patterns keep dense operational data approachable—filters, roles, and CSV exports stay one click away for staff without drowning residents in dashboards."
    ],
    secondary: ["NEXTJS", "TYPESCRIPT", "TAILWIND", "SHADCN", "PYTHON", "DJANGORESTFRAMEWORK", "POSTGRESQL"],
    technologies: [],
    images: [
      {
        src: "/images/projects/moron.png",
        alt: "Presupuesto Participativo Moron project image"
      },
      {
        src: "/images/projects/moron-1.png",
        alt: "Presupuesto Participativo Moron project image 1"
      },
      {
        src: "/images/projects/moron-2.png",
        alt: "Presupuesto Participativo Moron project image 2"
      }
    ],
    heroImage: "",
    mobileFirst: true,
    github: "empty",
    live: "https://presupuestoparticipativomoron.com/",
    next: "gastando",
    features: [
      {
        title: "Headquarters and Project Management",
        description: "Administer headquarters with proposal, project, and vote counts. View and filter projects by status and headquarters."
      },
      {
        title: "Community Participation",
        description: "Encourage community involvement through meetings and assemblies to strengthen the bond with the state."
      },
      {
        title: "Budget Transparency",
        description: "Ensure transparency in the allocation and use of the participatory budget."
      },
      {
        title: "User and Permission Management",
        description: "Manage users with roles and assign them to specific headquarters."
      },
      {
        title: "Data Export",
        description: "Export proposal and vote data in CSV format."
      }
    ],
    highlights: [
      "Integration with Django Admin for efficient management",
      "Using import-export for data export",
      "Customizing the admin interface",
      "Implementing inlines for managing project images",
      "Successful community meetings and transparent budget allocation"
    ],
    role: "Full Stack Developer",
    duration: "4 months",
    year: "2023",
    challenges: [
      "Implementing data export in different formats",
      "Optimizing queries for vote and proposal counting",
      "Managing user permissions and roles",
      "Handling complex relationships between models",
      "Engaging diverse community members",
      "Ensuring equitable distribution of resources"
    ],
    colors: {
      primary: "rgba(255, 41, 41, 1)",
      secondary: "rgba(179, 33, 33, 1)",
      background: "rgba(26, 26, 26, 1)",
      text: "rgba(255, 255, 255, 1)"
    }
  }
];
