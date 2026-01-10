// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Resume preview generation
function generateResume() {
  const name = document.getElementById("name").value || "Your Name";
  const phone = document.getElementById("phone").value || "Phone";
  const email = document.getElementById("email").value || "Email";
  const linkedin = document.getElementById("linkedin").value || "LinkedIn";
  const summary = document.getElementById("summary").value || "Your professional summary will appear here.";
  const skills = document.getElementById("skills").value || "";
  const education = document.getElementById("education").value || "";
  const experience = document.getElementById("experience").value || "";

  document.getElementById("pName").innerText = name;
  document.getElementById("pContact").innerText = `${phone} | ${email}`;
  document.getElementById("pLinkedIn").innerText = linkedin;

  document.getElementById("pSummary").innerText = summary;
  document.getElementById("pEducation").innerText = education;
  document.getElementById("pExperience").innerText = experience;

  const skillsList = document.getElementById("pSkills");
  skillsList.innerHTML = "";

  skills.split(",").map(s => s.trim()).filter(Boolean).forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  alert("✅ Resume Preview Generated!");
}

// PDF download
function downloadPDF() {
  const element = document.getElementById("resumePreview");
  if (!element) return alert("Please generate preview first!");

  const opt = {
    margin: 0.3,
    filename: "Eduskillpath-Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opt).from(element).save();
}
