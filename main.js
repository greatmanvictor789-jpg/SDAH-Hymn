var menuToggle = document.querySelector(".menu-toggle");
var menuLinksContainer = document.querySelector("#site-menu");
var menuLinks = menuLinksContainer.querySelectorAll("a");

function closeMenu() {
    menuToggle.classList.remove("is-open");
    menuLinksContainer.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", function () {
    var isOpen = menuToggle.classList.toggle("is-open");
    menuLinksContainer.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

menuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
});