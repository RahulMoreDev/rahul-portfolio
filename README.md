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

### 4. Running the AI Assistants
The floating assistant dock supports J.A.R.V.I.S. and F.R.I.D.A.Y. It uses browser speech recognition and speech synthesis when available; typed messages remain available if voice features are unsupported or microphone permission is declined.

The AI key belongs only in the Express backend environment. Never add it to the portfolio's Vite environment or frontend code.

1. Copy `backend/.env.example` to `backend/.env`, then fill in `OPENAI_API_KEY`, `MONGODB_URI`, and a random `JWT_SECRET` of at least 32 characters. The `.env.example` file is a template and is not loaded by the server.
2. Start the backend with `npm run dev` from `backend/`. Its startup also requires a reachable MongoDB instance and a valid JWT secret.
3. Start this portfolio with `npm run dev`. Vite proxies `/api/assistants` to `http://localhost:5000` by default. Override the destination with `ASSISTANT_API_PROXY_TARGET` if needed.
4. For a separately hosted frontend, set `VITE_ASSISTANT_API_BASE_URL` to the backend origin at build time, and set the backend's `PORTFOLIO_ORIGINS` to the exact comma-separated frontend origins.

The assistant endpoint is `POST /api/assistants/chat`. It accepts an `assistant` value of `jarvis` or `friday` and up to 10 user/assistant messages (maximum 1,200 characters each). Requests are rate-limited per client IP. The server uses a curated portfolio knowledge file in `backend/src/data/portfolioKnowledge.js`; keep it aligned with `src/data/portfolioData.js` when updating profile or project information.

Never put real credentials in `.env.example` or commit them. If a credential was exposed, revoke/rotate it with its provider before putting the replacement in the ignored `backend/.env`.

Backend route checks can be run with `npm test` from `backend/`.

#### Deploying both services

The repository is configured as a monorepo: deploy the Vite site from the repository root on Vercel, and deploy the API from `backend/` on Render using the included `render.yaml` Blueprint.

1. Push the repository to GitHub. Do not commit any `.env` file or real credentials.
2. Import the repository in Vercel with the project root set to the repository root and deploy once to obtain its `*.vercel.app` origin.
3. In Render, create a Blueprint from the same repository and provide `MONGODB_URI`, `OPENAI_API_KEY`, and `PORTFOLIO_ORIGINS` in the protected environment prompts. `PORTFOLIO_ORIGINS` must be the exact Vercel origin (for example `https://your-site.vercel.app`, without a trailing slash). Render generates `JWT_SECRET`.
4. Wait for the Render service to become healthy at `/api/health`, then copy its service URL.
5. In Vercel, set `VITE_ASSISTANT_API_BASE_URL` to the Render service origin (for example `https://your-api.onrender.com`) and redeploy the site.
6. Add the final Vercel custom/production origin to Render's `PORTFOLIO_ORIGINS` if it differs from the configured origin, then redeploy the backend.

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
