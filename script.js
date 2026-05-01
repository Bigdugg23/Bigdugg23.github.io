document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply animation to the about section
    const aboutSection = document.querySelector('.about-section');
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(50px)";
    aboutSection.style.transition = "all 1s ease-out";
    
    // Simple logic to show it
    window.addEventListener('scroll', () => {
        const sectionPos = aboutSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        if(sectionPos < screenPos) {
            aboutSection.style.opacity = "1";
            aboutSection.style.transform = "translateY(0)";
        }
    });
});
