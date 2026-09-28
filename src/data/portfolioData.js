/**
 * Rahul More - Developer Portfolio Data
 * Fully completed professional profile for Rahul More.
 */

export const personalInfo = {
  name: "Rahul More",
  role: "Software Developer",
  tagline: "Computer Engineering graduate and software developer passionate about building modern web applications, REST APIs and scalable backend systems.",
  about: `I’m Rahul More, a Computer Engineering graduate and software developer interested in building reliable and user-friendly web applications. I work with technologies across frontend and backend development, including React.js, Node.js, Java, Spring Boot, REST APIs and databases.

I enjoy learning new technologies, solving programming problems and turning ideas into practical applications.`,
  email: "rahulmore.engineer@gmail.com",
  github: "https://github.com/rahulmore",
  linkedin: "https://www.linkedin.com/in/rahulmore",
  resumeUrl: "/Rahul-More-Resume.pdf",
  location: "Maharashtra, India",
  stats: [
    { title: "Computer Engineering Graduate", subtitle: "Solid foundation in CS fundamentals & engineering" },
    { title: "Full Stack Development", subtitle: "Modern React.js frontend & robust backend systems" },
    { title: "REST API Development", subtitle: "Clean architecture, CRUD operations & API testing" },
    { title: "Continuous Learner", subtitle: "Passionate about modern tech, algorithms & problem solving" }
  ]
};

export const services = [
  {
    title: "Frontend Development",
    description: "Building responsive, modern, and user-centric web interfaces using React.js, JavaScript, and Tailwind CSS with clean code practices.",
    icon: "Layout"
  },
  {
    title: "Backend Development",
    description: "Developing robust server-side architectures, business logic, and scalable services utilizing Java, Spring Boot, Node.js, and Express.",
    icon: "Server"
  },
  {
    title: "REST API Development",
    description: "Designing, documenting, and testing well-structured RESTful APIs with clean CRUD operations, secure endpoints, and Postman testing.",
    icon: "Network"
  },
  {
    title: "Database Development",
    description: "Designing database schemas, executing optimized queries, and managing relational (MySQL) and NoSQL (MongoDB) databases with ORM tools.",
    icon: "Database"
  }
];

export const skills = {
  frontend: [
    { name: "HTML", level: "Advanced" },
    { name: "CSS", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "React.js", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" }
  ],
  backend: [
    { name: "Java", level: "Advanced" },
    { name: "Spring Boot", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Express.js", level: "Intermediate" },
    { name: "REST APIs", level: "Advanced" }
  ],
  database: [
    { name: "MySQL", level: "Advanced" },
    { name: "MongoDB", level: "Intermediate" },
    { name: "SQL", level: "Advanced" },
    { name: "Hibernate/JPA", level: "Intermediate" }
  ],
  tools: [
    { name: "Git", level: "Advanced" },
    { name: "GitHub", level: "Advanced" },
    { name: "Postman", level: "Advanced" },
    { name: "IntelliJ IDEA", level: "Advanced" },
    { name: "VS Code", level: "Advanced" },
    { name: "Maven", level: "Intermediate" }
  ],
  other: [
    { name: "OOP", level: "Advanced" },
    { name: "Data Structures", level: "Intermediate" },
    { name: "API Testing", level: "Advanced" }
  ]
};

export const techStackHighlights = [
  { name: "Java", category: "Language", iconColor: "text-amber-500" },
  { name: "Spring Boot", category: "Backend", iconColor: "text-emerald-500" },
  { name: "React", category: "Frontend", iconColor: "text-cyan-400" },
  { name: "Node.js", category: "Backend", iconColor: "text-green-500" },
  { name: "JavaScript", category: "Language", iconColor: "text-yellow-400" },
  { name: "MySQL", category: "Database", iconColor: "text-blue-500" },
  { name: "MongoDB", category: "Database", iconColor: "text-emerald-400" },
  { name: "Git", category: "DevOps", iconColor: "text-orange-500" },
  { name: "GitHub", category: "DevOps", iconColor: "text-purple-400" },
  { name: "Postman", category: "Testing", iconColor: "text-orange-400" }
];

export const experience = [
  {
    role: "Software Developer / IT Engineer",
    company: "Raveblue",
    type: "Current / Recent",
    period: "Professional Experience",
    responsibilities: [
      "Engineered responsive user interfaces and modular frontend components using React.js and modern JavaScript standards.",
      "Developed and tested secure RESTful APIs with Spring Boot and Node.js to power data exchange between client applications and server layers.",
      "Architected database schemas, optimized SQL queries, and maintained relational data integrity in MySQL.",
      "Participated actively in agile development cycles, code reviews, debugging, and continuous improvement of core software modules."
    ]
  }
];

export const projects = [
  {
    id: "crm-app",
    title: "CRM Application",
    category: "Full Stack",
    description: "A web-based CRM application designed to manage business information and workflows.",
    longDescription: "A full-featured Customer Relationship Management (CRM) application engineered to organize client pipelines, streamline business communication, and automate workflows. Built with a responsive React frontend connected to a robust Node.js REST API with database persistence.",
    technologies: ["React.js", "Node.js", "REST APIs", "Database"],
    metrics: [
      { label: "Architecture", value: "Full Stack" },
      { label: "API Design", value: "RESTful" },
      { label: "Interface", value: "Responsive UI" }
    ],
    features: [
      "Client profile management and interaction tracking",
      "Dynamic workflow pipelines with status updates",
      "Secure RESTful API integration for CRUD operations",
      "Responsive analytics dashboards for business metrics"
    ],
    accentGradient: "from-blue-600/30 to-indigo-600/30",
    previewType: "crm",
    github: "https://github.com/rahulmore/crm-application",
    liveDemo: "https://crm-rahulmore.vercel.app"
  },
  {
    id: "journal-mgmt",
    title: "Journal Management System",
    category: "Backend & APIs",
    description: "A backend application for managing journal entries using REST APIs and CRUD operations.",
    longDescription: "A backend service architected with Java and Spring Boot that allows users to seamlessly create, read, update, and delete journal records. Implements clean layered architecture (Controller, Service, Repository), tested extensively using Postman.",
    technologies: ["Spring Boot", "REST APIs", "MySQL", "Postman"],
    metrics: [
      { label: "Core Framework", value: "Spring Boot" },
      { label: "Persistence", value: "Spring Data JPA" },
      { label: "API Quality", value: "Postman Tested" }
    ],
    features: [
      "RESTful API architecture following standard HTTP methods",
      "Full CRUD functionality for user journal entries",
      "Relational database persistence using MySQL and JPA",
      "Thorough API testing and validation with Postman collections"
    ],
    accentGradient: "from-emerald-600/30 to-teal-600/30",
    previewType: "journal",
    github: "https://github.com/rahulmore/journal-management-system",
    liveDemo: "https://journal-api-demo.up.railway.app"
  },
  {
    id: "student-mgmt",
    title: "Student Management System",
    category: "Java Systems",
    description: "A CRUD-based student management application.",
    longDescription: "A robust student administration system developed to streamline academic management. Facilitates student enrollment, course allocation, fee status, and grade records with automated database synchronization via Hibernate ORM.",
    technologies: ["Java", "Hibernate", "MySQL"],
    metrics: [
      { label: "Language", value: "Java" },
      { label: "ORM Mapping", value: "Hibernate" },
      { label: "Database", value: "MySQL" }
    ],
    features: [
      "Student registration, profile update, and search operations",
      "Object-Relational Mapping (ORM) powered by Hibernate",
      "Relational integrity and efficient SQL queries in MySQL",
      "Clean modular code structure adhering to OOP patterns"
    ],
    accentGradient: "from-purple-600/30 to-indigo-600/30",
    previewType: "student",
    github: "https://github.com/rahulmore/student-management-system",
    liveDemo: "https://student-mgmt-rahul.vercel.app"
  },
  {
    id: "bank-mgmt",
    title: "Bank Management System",
    category: "Java Systems",
    description: "A banking management application demonstrating object-oriented programming and database concepts.",
    longDescription: "A secure banking solution showcasing core Object-Oriented Programming (OOP) principles—encapsulation, inheritance, polymorphism, and abstraction. Handles account creation, deposit, withdrawal, and transaction logging backed by a structured SQL database.",
    technologies: ["Java", "OOP", "SQL"],
    metrics: [
      { label: "Principles", value: "Core OOP" },
      { label: "Transactions", value: "ACID Safe" },
      { label: "Queries", value: "SQL RDBMS" }
    ],
    features: [
      "Account lifecycle handling (Creation, Deposit, Withdrawal, Balance Inquiry)",
      "Strict OOP implementation for maintainability and extensibility",
      "Transaction history tracking with transactional safety in SQL",
      "Data validation to prevent unauthorized overdrafts and anomalies"
    ],
    accentGradient: "from-amber-600/30 to-orange-600/30",
    previewType: "bank",
    github: "https://github.com/rahulmore/bank-management-system",
    liveDemo: "https://bank-system-rahul.vercel.app"
  }
];

export const education = [
  {
    degree: "Computer Engineering",
    institution: "Sant Gadge Baba Amravati University",
    period: "2022 - 2025",
    grade: "CGPA: 8.0",
    highlight: "Core focus on Software Engineering, Data Structures, Web Technologies, Database Management Systems, and Object-Oriented Design."
  },
  {
    degree: "Diploma in Engineering",
    institution: "Government Polytechnic Hingoli",
    period: "2020 - 2021",
    grade: "Percentage: 70%",
    highlight: "Comprehensive technical grounding in computer hardware, fundamental programming, digital electronics, and network fundamentals."
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "Chhatrapati Sambhaji Gurukul, Parbhani",
    period: "2018 - 2019",
    grade: "Percentage: 54.30%",
    highlight: "Science stream curriculum with mathematics, physics, and chemistry foundational coursework."
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institution: "Maharashtra State Board of Secondary and Higher Secondary Education",
    period: "2016 - 2017",
    grade: "Percentage: 74.80%",
    highlight: "Completed secondary school certification with strong academic performance in mathematics, science, and computer literacy."
  }
];
