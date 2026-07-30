// script.js - Interactive Features with CV Download

// ==================== CV DATA (Your actual CV content) ====================
const cvData = {
    personal: {
        name: "Phetho Tsoeu",
        title: "Aspiring Data Analyst | Front-End Developer",
        email: "phethotsoeu1@gmail.com",
        phone: "+27 68 255 5140",
        address: "Katlehong South, Gauteng, South Africa",
        license: "Code 10 (C1) Driver's Licence",
        github: "https://github.com/Bigdugg23",
        portfolio: "https://bigdugg23.github.io",
        linkedin: "https://www.linkedin.com/in/phetho-tsoeu-536b01363/",
        gpa: "63.46%",
        graduation: "2023 - Present (Final Year)"
    },
    summary: "Final-year Bachelor of Science in Information Technology student at North-West University with a strong interest in Data Analytics and Front-End Development. Passionate about turning raw data into meaningful insights and building intuitive, responsive web applications. Skilled in Python, SQL, Power BI, Tableau, Java, C#, C++, HTML, CSS, and Git/GitHub, with a solid academic foundation in databases, artificial intelligence, decision support systems, and computer networks. Seeking an internship or graduate opportunity where I can contribute analytical thinking, technical skills, and a commitment to continuous learning.",
    education: [
        {
            degree: "Bachelor of Science in Information Technology",
            institution: "North-West University",
            location: "",
            period: "2023 - Present",
            details: "Current Qualification GPA: 63.46%",
            coursework: ["Artificial Intelligence", "Data Analytics", "Decision Support Systems", "Databases & Advanced Databases", "Data Structures & Algorithms", "Object-Oriented Programming", "Information Security", "Computer Networks", "System Analysis & Design", "User Interface Programming"]
        }
    ],
    skills: {
        programming: ["Python", "Java", "C#", "C++", "HTML5", "CSS3", "JavaScript (Learning)"],
        dataAnalytics: ["SQL", "Microsoft Excel", "Power BI", "Tableau", "Apache Kafka", "Data Cleaning", "Data Visualisation", "Dashboard Development", "Database Design", "Business Intelligence Fundamentals"],
        frontEnd: ["HTML5", "CSS3", "Responsive Web Design", "Git", "GitHub"],
        tools: ["Visual Studio Code", "Visual Studio", "Cisco Packet Tracer", "GitHub Pages"]
    },
    projects: [
        {
            title: "Personal Portfolio Website",
            description: "Developed and deployed a responsive personal portfolio website to showcase projects, technical skills, and professional experience.",
            technologies: "HTML, CSS, GitHub Pages"
        },
        {
            title: "Enterprise Network Design",
            description: "Designed and configured a secure enterprise network using Cisco Packet Tracer, implementing VLANs, DHCP, routing, and access control lists (ACLs).",
            technologies: "Cisco Packet Tracer"
        },
        {
            title: "Database & Decision Support Projects",
            description: "Designed relational databases, developed SQL queries, and applied decision support techniques to analyse business problems and support data-driven decisions.",
            technologies: "SQL, Database Design"
        }
    ],
    experience: [
        {
            title: "Brand Ambassador",
            company: "Frenzyy Clothing Brand",
            period: "",
            responsibilities: [
                "Represent the Frenzyy brand through promotional campaigns and community engagement",
                "Promote products across digital and social platforms to increase brand awareness",
                "Build relationships with customers and communicate the brand's values professionally",
                "Support marketing initiatives and contribute ideas for brand growth"
            ]
        }
    ],
    certifications: ["Introduction to Cybersecurity"],
    softSkills: ["Data Analysis", "Analytical Thinking", "Problem Solving", "Communication", "Teamwork", "Leadership", "Adaptability", "Time Management"],
    languages: ["Sesotho (Native)", "English (Professional)"],
    additional: ["South African Citizen", "Code 10 (C1) Driver's Licence", "Available for internship and graduate opportunities"]
};

// Function to generate and download PDF
async function downloadCVAsPDF() {
    // Show loading state
    const downloadBtns = document.querySelectorAll('#downloadCVBtn, #heroDownloadBtn');
    downloadBtns.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;
    });

    try {
        // Dynamically load html2pdf library
        if (typeof html2pdf === 'undefined') {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');
        }
        
        // Create a temporary div for CV content
        const cvElement = document.createElement('div');
        cvElement.style.padding = '40px';
        cvElement.style.backgroundColor = 'white';
        cvElement.style.fontFamily = 'Inter, Arial, sans-serif';
        cvElement.style.color = '#111';
        cvElement.style.maxWidth = '800px';
        cvElement.style.margin = '0 auto';
        
        cvElement.innerHTML = `
            <style>
                .cv-container { font-family: 'Inter', Arial, sans-serif; max-width: 800px; margin: 0 auto; }
                .cv-header { text-align: center; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 2px solid #c7a05b; }
                .cv-name { font-size: 30px; font-weight: 700; margin: 0 0 5px; color: #1e2f3e; }
                .cv-title { font-size: 16px; color: #c7a05b; margin-bottom: 12px; }
                .cv-contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; font-size: 11px; color: #666; }
                .cv-section { margin-bottom: 20px; }
                .cv-section-title { font-size: 16px; font-weight: 600; color: #1e2f3e; border-left: 3px solid #c7a05b; padding-left: 12px; margin-bottom: 10px; }
                .cv-about { font-size: 12.5px; line-height: 1.55; color: #444; margin-bottom: 18px; }
                .cv-education-item, .cv-experience-item, .cv-project-item { margin-bottom: 14px; }
                .cv-item-title { font-weight: 600; font-size: 13.5px; margin-bottom: 3px; }
                .cv-item-subtitle { font-size: 12px; color: #c7a05b; margin-bottom: 4px; }
                .cv-item-date { font-size: 11px; color: #999; margin-bottom: 5px; }
                .cv-item-desc { font-size: 12px; color: #555; margin-left: 15px; }
                .cv-item-plain-desc { font-size: 12px; color: #555; margin-left: 0; }
                .cv-skills-grid { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 6px; }
                .cv-skill-tag { background: #f0f0f0; padding: 3px 10px; border-radius: 20px; font-size: 10.5px; }
                .cv-skills-subheading { font-size: 11.5px; font-weight: 600; color: #333; margin-top: 10px; margin-bottom: 2px; }
                .cv-two-col { display: flex; gap: 24px; }
                .cv-two-col > div { flex: 1; }
                hr { margin: 12px 0; border-color: #eee; }
            </style>
            <div class="cv-container">
                <div class="cv-header">
                    <h1 class="cv-name">${cvData.personal.name}</h1>
                    <div class="cv-title">${cvData.personal.title}</div>
                    <div class="cv-contact">
                        <span>📍 ${cvData.personal.address}</span>
                        <span>📞 ${cvData.personal.phone}</span>
                        <span>📧 ${cvData.personal.email}</span>
                        <span>🚗 ${cvData.personal.license}</span>
                    </div>
                    <div class="cv-contact" style="margin-top: 6px;">
                        <span>GitHub: ${cvData.personal.github}</span>
                        <span>Portfolio: ${cvData.personal.portfolio}</span>
                        <span>LinkedIn: ${cvData.personal.linkedin}</span>
                    </div>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">Professional Summary</div>
                    <div class="cv-about">${cvData.summary}</div>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">Education</div>
                    ${cvData.education.map(edu => `
                        <div class="cv-education-item">
                            <div class="cv-item-title">${edu.institution}</div>
                            <div class="cv-item-subtitle">${edu.degree}</div>
                            <div class="cv-item-date">${edu.period}</div>
                            <div class="cv-item-plain-desc">${edu.details}</div>
                            <div class="cv-skills-subheading">Relevant Coursework</div>
                            <div class="cv-skills-grid">
                                ${edu.coursework.map(c => `<span class="cv-skill-tag">${c}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">Technical Skills</div>
                    <div class="cv-skills-subheading">Programming</div>
                    <div class="cv-skills-grid">
                        ${cvData.skills.programming.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                    </div>
                    <div class="cv-skills-subheading">Data Analytics & Business Intelligence</div>
                    <div class="cv-skills-grid">
                        ${cvData.skills.dataAnalytics.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                    </div>
                    <div class="cv-skills-subheading">Front-End Development</div>
                    <div class="cv-skills-grid">
                        ${cvData.skills.frontEnd.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                    </div>
                    <div class="cv-skills-subheading">Tools</div>
                    <div class="cv-skills-grid">
                        ${cvData.skills.tools.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                    </div>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">Projects</div>
                    ${cvData.projects.map(p => `
                        <div class="cv-project-item">
                            <div class="cv-item-title">${p.title}</div>
                            <div class="cv-item-plain-desc">${p.description}</div>
                            <div class="cv-item-date">Technologies: ${p.technologies}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">Experience</div>
                    ${cvData.experience.map(exp => `
                        <div class="cv-experience-item">
                            <div class="cv-item-title">${exp.title} - ${exp.company}</div>
                            ${exp.period ? `<div class="cv-item-date">${exp.period}</div>` : ''}
                            <ul class="cv-item-desc">
                                ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <div class="cv-two-col">
                    <div>
                        <div class="cv-section">
                            <div class="cv-section-title">Certifications</div>
                            <div class="cv-skills-grid">
                                ${cvData.certifications.map(c => `<span class="cv-skill-tag">${c}</span>`).join('')}
                            </div>
                        </div>
                        <div class="cv-section">
                            <div class="cv-section-title">Languages</div>
                            <div class="cv-skills-grid">
                                ${cvData.languages.map(l => `<span class="cv-skill-tag">${l}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="cv-section">
                            <div class="cv-section-title">Soft Skills</div>
                            <div class="cv-skills-grid">
                                ${cvData.softSkills.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cv-section">
                    <div class="cv-section-title">Additional Information</div>
                    <div class="cv-item-plain-desc">${cvData.additional.join(' · ')}</div>
                </div>

                <hr>
                <div style="text-align: center; font-size: 10px; color: #999; margin-top: 16px;">
                    References available upon request | Updated: ${new Date().toLocaleDateString()}
                </div>
            </div>
        `;
        
        // PDF options
        const opt = {
            margin: [0.4, 0.5, 0.4, 0.5],
            filename: `Phetho_Tsoeu_CV_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        // Generate and download PDF
        html2pdf().set(opt).from(cvElement).save();
        
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Error generating PDF. Please try again or contact support.');
    } finally {
        // Reset buttons
        setTimeout(() => {
            downloadBtns.forEach(btn => {
                btn.innerHTML = '<i class="fas fa-download"></i> Download CV';
                btn.disabled = false;
            });
        }, 1000);
    }
}

// Helper function to load scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ==================== Dark Mode Toggle ====================
const darkModeToggle = document.getElementById('darkModeToggle');
const moonIcon = document.querySelector('.fa-moon');
const sunIcon = document.querySelector('.fa-sun');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (moonIcon && sunIcon) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline-block';
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'inline-block';
            } else {
                moonIcon.style.display = 'inline-block';
                sunIcon.style.display = 'none';
            }
        }
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ==================== Active Navigation Link ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Mobile Menu ====================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '70px';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.right = '0';
            navLinksContainer.style.background = 'var(--bg-secondary)';
            navLinksContainer.style.padding = '2rem';
            navLinksContainer.style.gap = '1rem';
            navLinksContainer.style.zIndex = '1000';
            navLinksContainer.style.borderBottom = '1px solid var(--border-light)';
        } else {
            navLinksContainer.style.display = '';
        }
    });
}

// ==================== Contact Form ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ==================== Download CV Buttons ====================
const downloadBtns = document.querySelectorAll('#downloadCVBtn, #heroDownloadBtn');
downloadBtns.forEach(btn => {
    btn.addEventListener('click', downloadCVAsPDF);
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .timeline-item, .skills-category, .interest-item, .contact-info-card, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
