window.onload = function () {
  const text = document.querySelector(".whatsapp-text");
  if (text) {
    setTimeout(() => {
      text.style.display = "block";
    }, 3000);
  }
};
