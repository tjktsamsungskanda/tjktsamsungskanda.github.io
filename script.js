const burgerIcon = document.getElementById("burgerIcon");
const navList = document.getElementById("menu-list")

window.addEventListener('load', function() {
        alert("This web maybe will a bit lagging in some device, try from PC for best experience.");
        document.body.classList.add('start-animation'); 
    });


burgerIcon.addEventListener("click", () => {
    navList.classList.toggle("hidden");
})
