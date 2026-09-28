# Rahul More - Developer Portfolio

A modern, high-performance developer portfolio built specifically for **Rahul More** (Computer Engineering Graduate & Software Developer).

![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20TailwindCSS-indigo)
![Design](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald)

---

## 🌟 Key Highlights & Sections

1. **Navbar**: Sticky glassmorphic bar with smooth scrolling, mobile drawer menu, resume download, and light/dark theme toggle.
2. **Hero Section**: Strong introduction highlighting Full Stack & REST API skills, social links, resume button, and an interactive developer IDE visual (no fake stock photos).
3. **About Section**: Full educational and engineering background with verified key achievement cards.
4. **Services / What I Do**: 4 cards covering Frontend, Backend, REST API, and Database development.
5. **Skills Section**: Categorized technical competencies (Frontend, Backend, Database, Tools, CS Fundamentals).
6. **Tech Stack Visual**: Grid of 10 key technologies (Java, Spring Boot, React, Node.js, JavaScript, MySQL, MongoDB, Git, GitHub, Postman).
7. **Experience Section**: Professional timeline featuring Software Developer / IT Engineer role at **Raveblue** with marked editable placeholders.
8. **Projects Section**: Interactive showcase for 4 core projects (CRM Application, Journal Management System, Student Management System, Bank Management System) with technology tags and full details modal.
9. **Education Section**: Complete academic timeline (Sant Gadge Baba Amravati University, Government Polytechnic Hingoli, HSC, and editable SSC placeholder).
10. **Contact Section**: "Let's Work Together" form with client-side validation, success alert, and direct email/LinkedIn/GitHub links.
11. **Footer**: Quick navigation, social links, back-to-top button, and 2026 copyright.

---

## 🚀 Getting Started

### 1. Install Dependencies
Open your terminal inside the `rahul-portfolio` directory and run:

```bash
npm install
```
*(On Windows PowerShell, if execution policy restricts scripts, run `cmd /c "npm install"` or `npm.cmd install`)*

### 2. Start the Development Server
```bash
npm run dev
```
*(or `npm.cmd run dev`)*

Open your browser and navigate to the local URL (usually `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
```

---

## 📝 Customization Guide

### 1. Updating Personal Information & Links
All data is centralized in **`src/data/portfolioData.js`**. You don't need to hunt through component files!
- **Email**: Update `personalInfo.email`
- **GitHub**: Update `personalInfo.github`
- **LinkedIn**: Update `personalInfo.linkedin`
- **Work Responsibilities**: Update `experience[0].responsibilities`
- **SSC Details**: Update `education[3]`

### 2. Adding Your Resume PDF
Place your actual resume PDF in the `public/` directory and name it:
```text
public/Rahul-More-Resume.pdf
```
The navbar and hero buttons will automatically link to and download this file.

### 3. Adding Your Profile Photo
If you wish to display a personal photo in the Hero section in place of or alongside the code visual:
1. Place your photo (e.g. `rahul-more.jpg`) in the `public/` or `src/assets/` folder.
2. In `src/sections/Hero.jsx`, replace `<DeveloperVisual />` with an `<img>` tag or add an avatar card.

### 4. Connecting the Contact Form to a Real Email Service
The contact form currently validates inputs and provides instant UI feedback. To forward submissions directly to your email inbox:
- **Option A (Formspree)**:
  1. Sign up at [formspree.io](https://formspree.io) and create a form.
  2. In `src/sections/Contact.jsx`, change the form submission to `fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: new FormData(e.target) })`.
- **Option B (EmailJS)**:
  Install `npm install @emailjs/browser` and trigger `emailjs.sendForm(...)`.

---

## 📁 Project Structure

```text
rahul-portfolio/
├── public/
│   └── Rahul-More-Resume.pdf      # Resume download file
├── src/
│   ├── components/
│   │   ├── DeveloperVisual.jsx     # Interactive Hero IDE visual
│   │   ├── Footer.jsx              # Footer & Back-to-top
│   │   ├── Navbar.jsx              # Responsive header & drawer
│   │   ├── ProjectModal.jsx        # Project details popup modal
│   │   └── ThemeToggle.jsx         # Dark / Light mode toggle
│   ├── data/
│   │   └── portfolioData.js        # Centralized information file
│   ├── sections/
│   │   ├── About.jsx               # About Me section & stats
│   │   ├── Contact.jsx             # Let's Work Together & form
│   │   ├── Education.jsx           # Academic milestones timeline
│   │   ├── Experience.jsx          # Raveblue experience timeline
│   │   ├── Hero.jsx                # Introduction & quick links
│   │   ├── Projects.jsx            # 4 featured project cards
│   │   ├── Services.jsx            # 4 service cards
│   │   ├── Skills.jsx              # Categorized technical skills
│   │   └── TechStackVisual.jsx     # Tech stack badge gallery
│   ├── App.jsx                     # Master page layout
│   ├── index.css                   # Tailwind styles & theme variables
│   └── main.jsx                    # React root entry point
├── index.html                      # SEO metadata & Google fonts
├── package.json                    # Project dependencies & scripts
├── vite.config.js                  # Vite & Tailwind configuration
└── README.md                       # Documentation
```

---

## 🌐 Deployment
This portfolio can be deployed for free in less than 2 minutes on:
- **Vercel**: Import the GitHub repo and click "Deploy".
- **Netlify**: Drag and drop the `dist/` folder or connect your Git repository.
- **GitHub Pages**: Build with `npm run build` and deploy the `dist/` output.
