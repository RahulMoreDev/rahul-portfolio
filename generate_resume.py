import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)

def create_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#0F172A")    # Deep slate navy
    accent_color = colors.HexColor("#2563EB")     # Professional royal blue
    text_dark = colors.HexColor("#1E293B")        # Charcoal body
    text_muted = colors.HexColor("#475569")       # Slate subtext

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=1 # Center
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=accent_color,
        alignment=1
    )

    contact_style = ParagraphStyle(
        'ContactText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_muted,
        alignment=1
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=primary_color,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=text_dark
    )

    bold_body_style = ParagraphStyle(
        'BoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=primary_color
    )

    meta_style = ParagraphStyle(
        'MetaStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=text_muted,
        alignment=2 # Right align
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_dark,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2.5
    )

    elements = []

    # 1. Header
    elements.append(Paragraph("RAHUL MORE", title_style))
    elements.append(Paragraph("SOFTWARE DEVELOPER | FULL STACK & REST API ENGINEER", subtitle_style))
    elements.append(Spacer(1, 4))
    
    contact_line1 = "Email: rahulmore.engineer@gmail.com &nbsp;|&nbsp; Location: Maharashtra, India"
    contact_line2 = "Portfolio: rahul-portfolio-eta-flax.vercel.app &nbsp;|&nbsp; GitHub: github.com/RahulMoreDev &nbsp;|&nbsp; LinkedIn: linkedin.com/in/rahulmore"
    elements.append(Paragraph(contact_line1, contact_style))
    elements.append(Paragraph(contact_line2, contact_style))
    elements.append(Spacer(1, 6))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceAfter=8, spaceBefore=2))

    # Helper function for section headings
    def add_section(heading):
        elements.append(Paragraph(heading.upper(), section_header_style))
        elements.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#CBD5E1"), spaceAfter=5, spaceBefore=1))

    # 2. Summary
    add_section("Professional Summary")
    summary_text = (
        "Computer Engineering graduate and Software Developer with hands-on industry experience engineering "
        "responsive full-stack web applications, robust RESTful APIs, and relational database systems. "
        "Skilled across frontend and backend development with <b>React.js, Java, Spring Boot, Node.js, and MySQL</b>. "
        "Adept at writing clean, maintainable code adhering to OOP architectural patterns, test-driven validation, and agile delivery."
    )
    elements.append(Paragraph(summary_text, body_style))
    elements.append(Spacer(1, 6))

    # 3. Technical Skills
    add_section("Technical Skills")
    skills_data = [
        [
            Paragraph("<b>Frontend:</b>", bold_body_style),
            Paragraph("React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Responsive Design", body_style)
        ],
        [
            Paragraph("<b>Backend & APIs:</b>", bold_body_style),
            Paragraph("Java, Spring Boot, Node.js, Express.js, REST APIs, Hibernate/JPA", body_style)
        ],
        [
            Paragraph("<b>Databases:</b>", bold_body_style),
            Paragraph("MySQL, MongoDB, SQL Schema Design, Relational Data Modeling", body_style)
        ],
        [
            Paragraph("<b>Tools & Practices:</b>", bold_body_style),
            Paragraph("Git, GitHub, Postman, IntelliJ IDEA, VS Code, Maven, Agile/Scrum", body_style)
        ],
        [
            Paragraph("<b>Core CS:</b>", bold_body_style),
            Paragraph("Object-Oriented Programming (OOP), Data Structures & Algorithms, API Testing", body_style)
        ]
    ]

    t_skills = Table(skills_data, colWidths=[95, 445])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    elements.append(t_skills)
    elements.append(Spacer(1, 6))

    # 4. Work Experience
    add_section("Work Experience")
    
    exp_header = [
        [
            Paragraph("<b>Software Developer / IT Engineer</b> &nbsp;|&nbsp; <b>Raveblue</b>", bold_body_style),
            Paragraph("Professional Experience", meta_style)
        ]
    ]
    t_exp = Table(exp_header, colWidths=[380, 160])
    t_exp.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    elements.append(t_exp)

    elements.append(Paragraph("• Architected responsive frontend components and dynamic web modules with React.js and Tailwind CSS.", bullet_style))
    elements.append(Paragraph("• Engineered and integrated secure RESTful API endpoints utilizing Spring Boot and Node.js for client-server communication.", bullet_style))
    elements.append(Paragraph("• Designed, normalized, and optimized relational database schemas in MySQL, writing efficient queries and ensuring ACID integrity.", bullet_style))
    elements.append(Paragraph("• Participated in regular code reviews, debugging production anomalies, and refining CI/CD deployment workflows.", bullet_style))
    elements.append(Spacer(1, 6))

    # 5. Key Engineering Projects
    add_section("Featured Engineering Projects")

    projects = [
        {
            "name": "CRM Application",
            "stack": "React.js, Node.js, Express, REST APIs, MySQL",
            "bullets": [
                "Engineered a web-based Customer Relationship Management platform to manage business leads, customer communication pipelines, and sales analytics.",
                "Constructed full RESTful CRUD endpoints with token-based access and integrated responsive dashboards for performance reporting."
            ]
        },
        {
            "name": "Journal Management System",
            "stack": "Spring Boot, REST APIs, MySQL, Postman",
            "bullets": [
                "Built a multi-tiered backend service using Controller-Service-Repository architecture for structured journal recording and retrieval.",
                "Implemented relational persistence via Spring Data JPA and validated 100% of API endpoints using comprehensive Postman collections."
            ]
        },
        {
            "name": "Student Management System",
            "stack": "Java, Hibernate ORM, MySQL",
            "bullets": [
                "Developed a desktop and database application streamlining student registration, course allocations, fee records, and grade reporting.",
                "Implemented Hibernate ORM to automate object-relational mapping, enhancing query execution and database consistency."
            ]
        },
        {
            "name": "Bank Management System",
            "stack": "Java, OOP Principles, SQL",
            "bullets": [
                "Architected a secure banking platform applying core OOP principles (inheritance, encapsulation, polymorphism, abstraction).",
                "Created transactional modules for account opening, balance verification, deposit, and withdrawal with SQL transaction safety."
            ]
        }
    ]

    for proj in projects:
        proj_header = [
            [
                Paragraph(f"<b>{proj['name']}</b> &nbsp;|&nbsp; <font color='#2563EB'><i>{proj['stack']}</i></font>", bold_body_style),
                Paragraph("Live / GitHub Available", meta_style)
            ]
        ]
        t_proj = Table(proj_header, colWidths=[400, 140])
        t_proj.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ]))
        elements.append(t_proj)
        for b in proj['bullets']:
            elements.append(Paragraph(f"• {b}", bullet_style))
        elements.append(Spacer(1, 2))

    elements.append(Spacer(1, 4))

    # 6. Education
    add_section("Education")
    
    edu_list = [
        {
            "degree": "Bachelor of Engineering in Computer Engineering",
            "school": "Sant Gadge Baba Amravati University",
            "year": "2022 – 2025",
            "grade": "CGPA: 8.0 / 10.0"
        },
        {
            "degree": "Diploma in Engineering (Computer / IT)",
            "school": "Government Polytechnic Hingoli",
            "year": "2020 – 2021",
            "grade": "Percentage: 70.0%"
        },
        {
            "degree": "Higher Secondary Certificate (HSC - Science)",
            "school": "Chhatrapati Sambhaji Gurukul, Parbhani",
            "year": "2018 – 2019",
            "grade": "Percentage: 54.30%"
        },
        {
            "degree": "Secondary School Certificate (SSC)",
            "school": "Maharashtra State Board of Secondary and Higher Secondary Education",
            "year": "2016 – 2017",
            "grade": "Percentage: 74.80%"
        }
    ]

    for item in edu_list:
        edu_row = [
            [
                Paragraph(f"<b>{item['degree']}</b> — {item['school']}", body_style),
                Paragraph(f"<b>{item['grade']}</b> &nbsp;|&nbsp; {item['year']}", meta_style)
            ]
        ]
        t_edu = Table(edu_row, colWidths=[380, 160])
        t_edu.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
            ('TOPPADDING', (0,0), (-1,-1), 1),
        ]))
        elements.append(t_edu)

    # Build the document
    doc.build(elements)
    print(f"Professional Resume PDF successfully generated at: {output_path}")

if __name__ == "__main__":
    out_file = os.path.abspath("public/Rahul-More-Resume.pdf")
    create_resume(out_file)
