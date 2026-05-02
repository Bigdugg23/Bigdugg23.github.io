// script.js - Interactive Features with CV Download

// ==================== CV DATA (Your actual CV content) ====================
const cvData = {
    personal: {
        name: "Phetho Tsoeu",
        title: "Information Technology Student",
        email: "phethotoseu1@gmail.com",
        phone: "0682555140",
        address: "1988 Sudan Street Germiston, Katlehong South, 1431",
        linkedin: "www.linkedin.com/in/phetho-tsoeu-536b01363",
        instagram: "www.instagram.com/bigduggmustfall",
        gpa: "61.29",
        graduation: "2027"
    },
    education: [
        {
            degree: "Bachelor of Information Technology",
            institution: "North-West University (NWU VPC Campus)",
            location: "Vanderbijlpark",
            period: "Expected 2026",
            details: "Building 24, Hendrik van Eck Boulevard, Vanderbijlpark 5900"
        },
        {
            degree: "Matriculation",
            institution: "Phumulani Secondary School",
            location: "Katlehong",
            period: "2017-2021",
            details: "4th, Moloena, Katlehong, 1432"
        }
    ],
    experience: [
        {
            title: "Brand Ambassador",
            company: "Frenzyy Clothing",
            period: "March 2025",
            responsibilities: [
                "Represented and promoted the Frenzyz brand across various platforms",
                "Engaged with customers and built brand awareness",
                "Demonstrated strong communication and marketing skills"
            ]
        },
        {
            title: "Volleyball Team Captain",
            company: "NWU Volleyball Club",
            period: "2023-2024",
            responsibilities: [
                "Led team to tournament victory in 2024",
                "Developed leadership, strategic planning, and team coordination skills",
                "Previously served as Opponent in 2023"
            ]
        }
    ],
    skills: {
        technical: ["Structured Programming", "Object-Oriented Programming", "Database Management", "System Analysis & Design", "Data Structures & Algorithms", "Information Security"],
        professional: ["Leadership", "Teamwork and collaboration", "Marketing & Promotion", "Customer Engagement", "Friendly, positive attitude", "Flexible and adaptable", "Problem-solving"],
        tools: ["Microsoft Word", "Application Development"],
        languages: ["English (Native)", "Arabic (Fluent)", "Sesotho (Advanced)", "isiZulu (Advanced)"]
    },
    interests: ["Sports & Fitness", "Volleyball (Team Captain)", "Soccer", "Basketball", "Maintenance and DIY", "Collecting Sneakers"],
    about: "A dedicated North-West University Information Technology student with a strong academic record (61.29 GPA) and well-developed technical skills in programming. Demonstrated leadership as volleyball team captain and as a brand ambassador for Frenzyz. Fluent in multiple South African languages with strong communication and promotional abilities. Combines technical expertise with marketing experience and team leadership skills."
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
                .cv-header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #c7a05b; }
                .cv-name { font-size: 32px; font-weight: 700; margin: 0 0 5px; color: #1e2f3e; }
                .cv-title { font-size: 18px; color: #c7a05b; margin-bottom: 15px; }
                .cv-contact { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; font-size: 12px; color: #666; }
                .cv-section { margin-bottom: 25px; }
                .cv-section-title { font-size: 18px; font-weight: 600; color: #1e2f3e; border-left: 3px solid #c7a05b; padding-left: 12px; margin-bottom: 12px; }
                .cv-about { font-size: 13px; line-height: 1.5; color: #444; margin-bottom: 20px; }
                .cv-education-item, .cv-experience-item { margin-bottom: 15px; }
                .cv-item-title { font-weight: 600; font-size: 14px; margin-bottom: 3px; }
                .cv-item-subtitle { font-size: 12px; color: #c7a05b; margin-bottom: 5px; }
                .cv-item-date { font-size: 11px; color: #999; margin-bottom: 5px; }
                .cv-item-desc { font-size: 12px; color: #555; margin-left: 15px; }
                .cv-skills-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
                .cv-skill-tag { background: #f0f0f0; padding: 3px 10px; border-radius: 20px; font-size: 11px; }
                .cv-interests { font-size: 12px; color: #555; }
                hr { margin: 15px 0; border-color: #eee; }
            </style>
            <div class="cv-container">
                <div class="cv-header">
                    <h1 class="cv-name">${cvData.personal.name}</h1>
                    <div class="cv-title">${cvData.personal.title} | GPA: ${cvData.personal.gpa}</div>
                    <div class="cv-contact">
                        <span>📞 ${cvData.personal.phone}</span>
                        <span>✉️ ${cvData.personal.email}</span>
                        <span>📍 ${cvData.personal.address}</span>
                    </div>
                    <div class="cv-contact">
                        <span>📷 ${cvData.personal.instagram}</span>
                        <span>🔗 ${cvData.personal.linkedin}</span>
                    </div>
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">About Me</div>
                    <div class="cv-about">${cvData.about}</div>
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">Education</div>
                    ${cvData.education.map(edu => `
                        <div class="cv-education-item">
                            <div class="cv-item-title">${edu.degree}</div>
                            <div class="cv-item-subtitle">${edu.institution}</div>
                            <div class="cv-item-date">${edu.period}</div>
                            <div class="cv-item-desc">${edu.details}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">Experience</div>
                    ${cvData.experience.map(exp => `
                        <div class="cv-experience-item">
                            <div class="cv-item-title">${exp.title} - ${exp.company}</div>
                            <div class="cv-item-date">${exp.period}</div>
                            <ul class="cv-item-desc">
                                ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">Technical Skills</div>
                    <div class="cv-skills-grid">
                        ${cvData.skills.technical.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                    </div>
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">Professional Skills</div>
                    <div class="cv-skills-grid">
                        ${cvData.skills.professional.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                    </div>
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">Languages</div>
                    <div class="cv-skills-grid">
                        ${cvData.skills.languages.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
                    </div>
                </div>
                
                <div class="cv-section">
                    <div class="cv-section-title">Interests</div>
                    <div class="cv-interests">${cvData.interests.join(' · ')}</div>
                </div>
                
                <hr>
                <div style="text-align: center; font-size: 10px; color: #999; margin-top: 20px;">
                    References available upon request | Updated: ${new Date().toLocaleDateString()}
                </div>
            </div>
        `;
        
        // PDF options
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
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
