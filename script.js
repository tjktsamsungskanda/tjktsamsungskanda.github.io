const burgerIcon = document.getElementById("burgerIcon");
const navList = document.getElementById("menu-list")

document.addEventListener('DOMContentLoaded', function() {
    alert("This web maybe will a bit lagging in some device, try from PC for best experience.");
    document.body.classList.add('start-animation'); 
});

burgerIcon.addEventListener("click", () => {
    navList.classList.toggle("hidden");
})

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach(el => {
    observer.observe(el);
});