// script.js - Interactive Features

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const moonIcon = document.querySelector('.fa-moon');
const sunIcon = document.querySelector('.fa-sun');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (moonIcon && sunIcon) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline-block';
    }
}

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

// Active Navigation Link on Scroll
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

// Smooth Scroll for Navigation Links
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

// Mobile Menu Toggle (add this if you want mobile menu functionality)
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
        } else {
            navLinksContainer.style.display = '';
        }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animate elements on scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries
