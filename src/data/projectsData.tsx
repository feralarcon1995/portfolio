export interface Project {
  id: string;
  sequence: number;
  title: string;
  category: string;
  summary: string;
  text: string[];
  secondary: string[];
  thumbnail?: string;
  firstImg: string;
  secondImg: string;
  mobileFirst: boolean;
  githubLink: string;
  liveLink: string;
  next: string;
  features: {
    title: string;
    description: string;
  }[];
  highlights: string[];
  role: string;
  duration: string;
  challenges?: string[];
}

export const projectData: Project[] = [
  {
    id: "linkinpark",
    sequence: 1,
    title: "Linkin Park",
    category: "Web Development",
    summary: "A tribute to Linkin Park",
    text: [
      "ProyectoFinalCoderHouse is a final project created for the Web Development course at Coderhouse. The project is a fan page dedicated to the band Linkin Park. It features real content extracted from their official page, including detailed information about the band members, their discography, and a media gallery with photos and videos. The project aims to provide a comprehensive and engaging experience for fans of Linkin Park.",
      "The project heavily utilizes HTML for structure, CSS for styling, and SCSS for advanced styling features, ensuring a responsive and visually appealing design across various devices."
    ],
    secondary: ["HTML", "CSS", "SCSS", "BOOTSTRAP", "JAVASCRIPT"],
    firstImg: "/images/projects/lp-1.png",
    secondImg: "/images/projects/lp-2.png",
    mobileFirst: true,
    githubLink: "https://github.com/feralarcon1995/ProyectoFinalCoderHouse",
    liveLink: "https://feralarcon1995.github.io/ProyectoFinalCoderHouse/",
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
    duration: "2 months"
  },
  {
    id: "handcode",
    sequence: 2,
    title: "Handcode",
    category: "Web Development",
    summary: "A web development company",
    text: [
      "Hand Code is a comprehensive web development project designed to provide a wide range of reusable components and assets for creating modern and responsive web applications. The project includes a collection of SCSS, JavaScript, and CSS files, as well as organized assets such as images and fonts."
    ],
    secondary: ["HTML", "CSS", "SCSS", "BOOTSTRAP", "JAVASCRIPT"],
    firstImg: "/images/projects/hand-1.png",
    secondImg: "/images/projects/hand-2.png",
    mobileFirst: true,
    githubLink: "https://handcode.com.ar/",
    liveLink: "https://handcode.com.ar/",
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
    duration: "3 months"
  },
  {
    id: "tiendablu",
    sequence: 3,
    title: "Tienda Blu",
    category: "Ecommerce",
    summary: "An Ecommerce of sportswear",
    text: [
      "Tienda Blu is an e-commerce platform for sportswear developed using React Js. The application allows users to browse through various categories of sportswear, view detailed product descriptions, and make purchases. The project leverages Firebase for backend services, including user authentication, data storage, and order management."
    ],
    secondary: ["HTML", "CSS", "SCSS", "BOOTSTRAP", "JAVASCRIPT", "REACTJS", "FIREBASE"],
    firstImg: "/images/projects/tienda-1.png",
    secondImg: "/images/projects/tienda-2.png",
    mobileFirst: true,
    githubLink: "https://github.com/feralarcon1995/TiendaBlu",
    liveLink: "https://feralarcon1995.github.io/TiendaBlu/",
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
    duration: "4 months"
  },
  {
    id: "pinder",
    sequence: 4,
    title: "Pinder",
    category: "Pet Blog",
    summary: "A Pet Blog made in Django",
    text: [
      "Pinder is an innovative web application developed using Python and the Django framework. The project is designed to help users find and adopt pets, making it easier to match with their next four-legged companion. The application provides a comprehensive platform where users can register, create profiles, and browse through available pets."
    ],
    secondary: ["HTML", "CSS", "BOOTSTRAP", "PYTHON", "DJANGO", "SQLITE"],
    firstImg: "/images/projects/pinder/pinder.png",
    secondImg: "/images/projects/pinder/pinder.png",
    mobileFirst: true,
    githubLink: "https://github.com/feralarcon1995/Pinder",
    liveLink: "https://github.com/feralarcon1995/Pinder",
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
    duration: "3 months"
  },
  {
    id: "viajaya",
    sequence: 5,
    title: "Viajaya",
    category: "Expense Simulator",
    summary: "An expense simulator with the theme of travel",
    text: [
      "ViajaYa is a final project created for the JavaScript course at Coderhouse. It is a fictional website that functions as a travel cost estimator. The site uses user-entered data and dynamically updates with the daily exchange rate of the Argentine peso to the US dollar. It includes various functionalities to make the site dynamic and interactive."
    ],
    secondary: ["HTML", "CSS", "BOOTSTRAP", "JAVASCRIPT", "JQUERY"],
    firstImg: "/images/projects/viaja-1.png",
    secondImg: "/images/projects/viaja-2.png",
    mobileFirst: true,
    githubLink: "https://github.com/feralarcon1995/ViajaYa",
    liveLink: "https://feralarcon1995.github.io/ViajaYa/",
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
    duration: "2 months"
  },
  {
    id: "lachinafutbol",
    sequence: 6,
    title: "LA CHINA FUTBOL",
    category: "Football Tournaments",
    summary: "Dynamic venues of each tournament",
    text: [
      "This project is a comprehensive football application designed to enhance the experience of football enthusiasts. It features a match schedule that allows users to view upcoming matches, detailed team statistics, and player profiles. The application also provides live scores of ongoing matches, ensuring fans stay updated in real-time.",
      "The project faced several challenges, including integrating live match updates, ensuring data accuracy, handling high traffic during major events, and providing real-time notifications."
    ],
    secondary: ["HTML", "CSS", "WORDPRESS", "JAVASCRIPT", "JQUERY", "PHP"],
    firstImg: "/images/projects/china-1.png",
    secondImg: "/images/projects/china-2.png",
    mobileFirst: true,
    githubLink: "empty",
    liveLink: "https://lachinafutbol.com/",
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
    duration: "2 months"
  },
  {
    id: 'guia-git',
    sequence: 7,
    title: "Guia Git",
    category: "Git Guide",
    summary: "A centralized Git guide for beginners",
    text: [
      "My website is a centralized Git guide designed for beginners, covering everything from setting up Git to mastering both basic and advanced commands. It explains how to install and configure Git, create repositories, and use essential commands like commits, branching, and merging. Additionally, it introduces GitHub as a key collaboration tool, teaching how to connect local projects to remote repositories, manage pull requests, and optimize workflows. This guide is meant to be a practical and accessible resource to help users confidently navigate version control and improve their software development skills."
    ],
    secondary: ["NEXTJS", "TAILWIND", "JAVASCRIPT"],
    firstImg: "/images/projects/guia-1.png",
    secondImg: "/images/projects/guia-2.png",
    mobileFirst: true,
    githubLink: "empty",
    liveLink: "https://guia-git.vercel.app/",
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
    duration: "2 months"
  },
  {
    id: 'moron',
    sequence: 8,
    title: "Presupuesto Participativo Morón",
    category: "Full Stack Development",
    summary: "A comprehensive digital democracy platform that enables citizens to participate in municipal budget allocation through transparent voting and project tracking.",
    text: [
      "The Participatory Budgeting Platform revolutionizes how citizens engage with municipal budget decisions. Built with modern web technologies, it offers an intuitive interface for exploring, voting, and tracking community projects.",
      "This platform features real-time project tracking, secure voting mechanisms, and interactive data visualizations that help citizens understand the impact of their participation.",
      "The system integrates with municipal databases to provide accurate, up-to-date information about project progress, budget allocation, and community impact metrics."
    ],
    secondary: ["NEXTJS", "TYPESCRIPT", "TAILWIND", "SHADCN", "PYTHON", "DJANGORESTFRAMEWORK", "POSTGRESQL"],
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
    challenges: [
      "Implementing data export in different formats",
      "Optimizing queries for vote and proposal counting",
      "Managing user permissions and roles",
      "Handling complex relationships between models",
      "Engaging diverse community members",
      "Ensuring equitable distribution of resources"
    ],
    thumbnail: "/images/projects/moron.png",
    firstImg: "/images/projects/moron-1.png",
    secondImg: "/images/projects/moron-2.png",
    mobileFirst: true,
    githubLink: "empty",
    liveLink: "https://presupuestoparticipativomoron.com//",
    next: "linkinpark"
  }
];
