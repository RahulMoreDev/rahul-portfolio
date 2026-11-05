const portfolioKnowledge = {
  personalInfo: {
    name: "Rahul More",
    role: "Software Developer",
    tagline:
      "Computer Engineering graduate and software developer passionate about building modern web applications, REST APIs and scalable backend systems.",
    about:
      "Rahul More is a Computer Engineering graduate and software developer interested in building reliable and user-friendly web applications. His listed technologies include React.js, Node.js, Java, Spring Boot, REST APIs and databases. He enjoys learning new technologies, solving programming problems and turning ideas into practical applications.",
    location: "Maharashtra, India",
    email: "rahulm3503@gmail.com",
    github: "https://github.com/RahulMoreDev",
    linkedin: "https://www.linkedin.com/in/rahul-more-3849a4377",
  },
  skills: {
    frontend: [
      "HTML (Advanced)",
      "CSS (Advanced)",
      "JavaScript (Advanced)",
      "React.js (Advanced)",
      "Tailwind CSS (Advanced)",
    ],
    backend: [
      "Java (Advanced)",
      "Spring Boot (Intermediate)",
      "Node.js (Intermediate)",
      "Express.js (Intermediate)",
      "REST APIs (Advanced)",
    ],
    database: [
      "MySQL (Advanced)",
      "MongoDB (Intermediate)",
      "SQL (Advanced)",
      "Hibernate/JPA (Intermediate)",
    ],
    tools: [
      "Git (Advanced)",
      "GitHub (Advanced)",
      "Postman (Advanced)",
      "IntelliJ IDEA (Advanced)",
      "VS Code (Advanced)",
      "Maven (Intermediate)",
    ],
    other: [
      "OOP (Advanced)",
      "Data Structures (Intermediate)",
      "API Testing (Advanced)",
    ],
  },
  experience: [
    {
      role: "Software Developer / IT Engineer",
      company: "Raveblue",
      period: "Professional Experience",
      responsibilities: [
        "Engineered responsive user interfaces and modular frontend components using React.js and modern JavaScript standards.",
        "Developed and tested secure RESTful APIs with Spring Boot and Node.js to power data exchange between client applications and server layers.",
        "Architected database schemas, optimized SQL queries, and maintained relational data integrity in MySQL.",
        "Participated actively in agile development cycles, code reviews, debugging, and continuous improvement of core software modules.",
      ],
    },
  ],
  education: [
    {
      degree: "Computer Engineering",
      institution: "Sant Gadge Baba Amravati University",
      period: "2022 - 2025",
      grade: "CGPA: 8.0",
    },
    {
      degree: "Diploma in Engineering",
      institution: "Government Polytechnic Hingoli",
      period: "2020 - 2021",
      grade: "Percentage: 70%",
    },
    {
      degree: "HSC (Higher Secondary Certificate)",
      institution: "Chhatrapati Sambhaji Gurukul, Parbhani",
      period: "2018 - 2019",
      grade: "Percentage: 54.30%",
    },
    {
      degree: "SSC (Secondary School Certificate)",
      institution:
        "Maharashtra State Board of Secondary and Higher Secondary Education",
      period: "2016 - 2017",
      grade: "Percentage: 74.80%",
    },
  ],
  projects: [
    {
      title: "CRM Application",
      category: "Full Stack",
      description:
        "A web-based CRM application designed to manage business information and workflows.",
      longDescription:
        "A full-featured Customer Relationship Management (CRM) application engineered to organize client pipelines, streamline business communication, and automate workflows. Built with a responsive React frontend connected to a robust Node.js REST API with database persistence.",
      technologies: ["React.js", "Node.js", "REST APIs", "Database"],
      metrics: [
        { label: "Architecture", value: "Full Stack" },
        { label: "API Design", value: "RESTful" },
        { label: "Interface", value: "Responsive UI" },
      ],
      features: [
        "Client profile management and interaction tracking",
        "Dynamic workflow pipelines with status updates",
        "Secure RESTful API integration for CRUD operations",
        "Responsive analytics dashboards for business metrics",
      ],
      github: "https://github.com/RahulMoreDev/crm-application",
      liveDemo: "https://crm-rahulmore.vercel.app",
    },
    {
      title: "Journal Management System",
      category: "Backend & APIs",
      description:
        "A backend application for managing journal entries using REST APIs and CRUD operations.",
      longDescription:
        "A backend service architected with Java and Spring Boot that allows users to seamlessly create, read, update, and delete journal records. Implements clean layered architecture (Controller, Service, Repository), tested extensively using Postman.",
      technologies: ["Spring Boot", "REST APIs", "MySQL", "Postman"],
      metrics: [
        { label: "Core Framework", value: "Spring Boot" },
        { label: "Persistence", value: "Spring Data JPA" },
        { label: "API Quality", value: "Postman Tested" },
      ],
      features: [
        "RESTful API architecture following standard HTTP methods",
        "Full CRUD functionality for user journal entries",
        "Relational database persistence using MySQL and JPA",
        "API testing and validation with Postman collections",
      ],
      github: "https://github.com/RahulMoreDev/journal-management-system",
      liveDemo: "https://journal-api-demo.up.railway.app",
    },
    {
      title: "Student Management System",
      category: "Java Systems",
      description: "A CRUD-based student management application.",
      longDescription:
        "A robust student administration system developed to streamline academic management. Facilitates student enrollment, course allocation, fee status, and grade records with automated database synchronization via Hibernate ORM.",
      technologies: ["Java", "Hibernate", "MySQL"],
      metrics: [
        { label: "Language", value: "Java" },
        { label: "ORM Mapping", value: "Hibernate" },
        { label: "Database", value: "MySQL" },
      ],
      features: [
        "Student registration, profile update, and search operations",
        "Object-Relational Mapping powered by Hibernate",
        "Relational integrity and SQL queries in MySQL",
        "Modular code structure adhering to OOP patterns",
      ],
      github: "https://github.com/RahulMoreDev/student-management-system",
      liveDemo: "https://student-mgmt-rahul.vercel.app",
    },
    {
      title: "Bank Management System",
      category: "Java Systems",
      description:
        "A banking management application demonstrating object-oriented programming and database concepts.",
      longDescription:
        "A secure banking solution showcasing core Object-Oriented Programming (OOP) principles—encapsulation, inheritance, polymorphism, and abstraction. Handles account creation, deposit, withdrawal, and transaction logging backed by a structured SQL database.",
      technologies: ["Java", "OOP", "SQL"],
      metrics: [
        { label: "Principles", value: "Core OOP" },
        { label: "Transactions", value: "ACID Safe" },
        { label: "Queries", value: "SQL RDBMS" },
      ],
      features: [
        "Account lifecycle handling (creation, deposit, withdrawal, balance inquiry)",
        "OOP implementation for maintainability and extensibility",
        "Transaction history tracking with SQL",
        "Data validation to prevent unauthorized overdrafts and anomalies",
      ],
      github: "https://github.com/RahulMoreDev/bank-management-system",
      liveDemo: "https://bank-system-rahul.vercel.app",
    },
  ],
};

module.exports = portfolioKnowledge;
