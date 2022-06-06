const navToggle = document.querySelector(".nav__toggle")
const navMenu = document.querySelector(".nav__list")

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav__list--visible")
})