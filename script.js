// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when clicking a link (mobile)
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("show"));
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Lead form demo (no backend)
const leadForm = document.getElementById("leadForm");
leadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const interest = document.getElementById("interest").value;

  alert(`Thanks ${name}! ✅\nWe received your request for: ${interest}\nOur team will contact you soon.`);

  leadForm.reset();
});
