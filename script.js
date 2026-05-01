// slight movement effect
document.addEventListener("mousemove", (e) => {
    const img = document.querySelector(".center-img img");

    let x = (window.innerWidth / 2 - e.pageX) / 40;
    let y = (window.innerHeight / 2 - e.pageY) / 40;

    img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});
