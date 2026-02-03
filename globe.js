const container = document.getElementById("globe-container");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Dark luxury background tone
scene.background = null;

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 430;

// Softer premium lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.9));

const dir = new THREE.DirectionalLight(0x88ccff, 0.6);
dir.position.set(200, 150, 300);
scene.add(dir);

// 🌍 Globe with darker premium night texture
const Globe = new ThreeGlobe()
  .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
  .showAtmosphere(true)
  .atmosphereColor("#2563eb")   // deep brand blue glow
  .atmosphereAltitude(0.28);

Globe.scale.set(190, 190, 190);
scene.add(Globe);



// ================= PREMIUM GLOWING DATA POINTS =================
const DOTS = 520;
const pointsData = [...Array(DOTS)].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() * 0.6 + 0.2,
  color: ["#60a5fa", "#ffffff", "#38bdf8"][Math.floor(Math.random() * 3)]
}));

Globe.pointsData(pointsData)
  .pointAltitude(0.02)
  .pointRadius(d => d.size)
  .pointColor(d => d.color);



// ================= LUXURY GOLD CONNECTION ARCS =================
const arcs = [...Array(42)].map(() => {
  const s = pointsData[Math.floor(Math.random() * pointsData.length)];
  const e = pointsData[Math.floor(Math.random() * pointsData.length)];
  return {
    startLat: s.lat,
    startLng: s.lng,
    endLat: e.lat,
    endLng: e.lng,
    color: ["#facc15", "#fde68a"] // gold tones
  };
});

Globe.arcsData(arcs)
  .arcColor(d => d.color)
  .arcAltitude(0.26)
  .arcStroke(0.9)
  .arcDashLength(0.6)
  .arcDashGap(3)
  .arcDashAnimateTime(2800);



// ================= SLOW LUXURY ROTATION =================
function animate() {
  Globe.rotation.y += 0.0014;   // slower = more premium feel
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
