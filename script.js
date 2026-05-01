// TYPING EFFECT
const text = "Hi, I'm Your Name";
let i = 0;

function typing() {
    if (i < text.length) {
        document.querySelector(".typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 60);
    }
}
typing();


// FADE-IN ON SCROLL
const elements = document.querySelectorAll(".fade-in");

function showOnScroll() {
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", showOnScroll);
