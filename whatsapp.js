document.body.insertAdjacentHTML("beforeend", `

<div id="waWidget" style="position:fixed;bottom:24px;right:24px;z-index:9999;">

  <div id="waBox"
       style="display:none;margin-bottom:10px;width:280px;background:white;border-radius:16px;box-shadow:0 20px 40px rgba(0,0,0,0.2);overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:#22c55e;color:white;padding:14px;font-weight:bold;font-size:14px;">
      Eduskillpath Support
    </div>

    <div style="padding:14px;display:flex;flex-direction:column;gap:10px;">

      <a href="https://wa.me/917781976959?text=Hi%20Eduskillpath,%20I%20need%20help%20with%20Resume%20Services"
         target="_blank"
         style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;text-decoration:none;color:#111;">

        <img src="https://randomuser.me/api/portraits/men/32.jpg"
             style="width:40px;height:40px;border-radius:50%;">

        <div>
          <div style="font-weight:600;font-size:14px;">Resume Team</div>
          <div style="font-size:12px;color:#64748b;">Typically replies in few minutes</div>
        </div>

      </a>

      <a href="https://wa.me/917494943858?text=Hi%20Eduskillpath,%20I%20need%20help%20with%20Resume%20Services"
         target="_blank"
         style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;text-decoration:none;color:#111;">

        <img src="https://randomuser.me/api/portraits/women/44.jpg"
             style="width:40px;height:40px;border-radius:50%;">

        <div>
          <div style="font-weight:600;font-size:14px;">Resume Team</div>
          <div style="font-size:12px;color:#64748b;">Career support specialist</div>
        </div>

      </a>

    </div>

  </div>

  <button id="waBtn"
          style="width:56px;height:56px;border-radius:50%;background:#22c55e;border:none;color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(0,0,0,0.25);cursor:pointer;">

    <svg xmlns="http://www.w3.org/2000/svg"
         width="28"
         height="28"
         fill="white"
         viewBox="0 0 16 16">

      <path d="M13.601 2.326A7.86 7.86 0 008.013 0C3.58 0 0 3.58 0 8.01c0 1.41.37 2.78 1.08 3.99L0 16l4.12-1.07a8.01 8.01 0 003.89 1c4.43 0 8.01-3.58 8.01-8.01a7.96 7.96 0 00-2.42-5.59z"/>

    </svg>

  </button>

</div>

`);

const waBtn = document.getElementById("waBtn");
const waBox = document.getElementById("waBox");

waBtn.addEventListener("click", () => {
  if (waBox.style.display === "block") {
    waBox.style.display = "none";
  } else {
    waBox.style.display = "block";
  }
});
