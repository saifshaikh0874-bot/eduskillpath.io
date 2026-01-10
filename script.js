// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.style.display === "grid";
  mobileMenu.style.display = isOpen ? "none" : "grid";
  mobileMenu.setAttribute("aria-hidden", isOpen ? "true" : "false");
  hamburger.setAttribute("aria-expanded", isOpen ? "false" : "true");
});

// Close menu on click
mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.style.display = "none";
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
  });
});
