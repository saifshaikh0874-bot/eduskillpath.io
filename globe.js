const container = document.getElementById("globe-container");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Deep navy background tone (important)
scene.background = null;

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 430;

// Softer, clean lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.9));

const dir = new THREE.DirectionalLight(0x6ea8ff, 0.6);
dir.position.set(200, 150, 300);
scene.add(dir);

// 🌍 Dark professional globe
const Globe = new ThreeGlobe()
  .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
  .showAtmosphere(true)
  .atmosphereColor("#3b82f6")   // Soft professional blue glow
  .atmosphereAltitude(0.22);

Globe.scale.set(190, 190, 190);
scene.add(Globe);



// ================= SOFT EDUCATION-STYLE DATA POINTS =================
const DOTS = 420;
const pointsData = [...Array(DOTS)].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() * 0.5 + 0.2,
  color: ["#93c5fd", "#ffffff"][Math.floor(Math.random() * 2)] // light blue + white
}));

Globe.pointsData(pointsData)
  .pointAltitude(0.018)
  .pointRadius(d => d.size)
  .pointColor(d => d.color);



// ================= CLEAN BLUE CONNECTION LINES =================
const arcs = [...Array(36)].map(() => {
  const s = pointsData[Math.floor(Math.random() * pointsData.length)];
  const e = pointsData[Math.floor(Math.random() * pointsData.length)];
  return {
    startLat: s.lat,
    startLng: s.lng,
    endLat: e.lat,
    endLng: e.lng,
    color: "#60a5fa" // soft blue only
  };
});

Globe.arcsData(arcs)
  .arcColor(d => d.color)
  .arcAltitude(0.22)
  .arcStroke(0.6)
  .arcDashLength(0.5)
  .arcDashGap(3)
  .arcDashAnimateTime(2600);



// ================= SLOW PROFESSIONAL ROTATION =================
function animate() {
  Globe.rotation.y += 0.0015; // slower, smoother
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();



// ================= RESPONSIVE =================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
