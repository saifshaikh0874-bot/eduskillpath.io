const container = document.getElementById("globe-container");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 430;

scene.add(new THREE.AmbientLight(0xffffff, 1.25));
const dir = new THREE.DirectionalLight(0xffffff, 0.55);
dir.position.set(250, 200, 400);
scene.add(dir);

const Globe = new ThreeGlobe()
  .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-night.jpg")
  .showAtmosphere(true)
  .atmosphereColor("#3da5ff")
  .atmosphereAltitude(0.30);

Globe.scale.set(190, 190, 190);
scene.add(Globe);

// Points
const DOTS = 520;
const pointsData = [...Array(DOTS)].map(() => ({
  lat: (Math.random() - 0.5) * 180,
  lng: (Math.random() - 0.5) * 360,
  size: Math.random() * 0.7 + 0.15,
  color: ["#3da5ff", "#b8ff3b", "#ffffff"][Math.floor(Math.random() * 3)]
}));

Globe.pointsData(pointsData)
  .pointAltitude(0.02)
  .pointRadius(d => d.size)
  .pointColor(d => d.color);

// Arcs
const arcs = [...Array(42)].map(() => {
  const s = pointsData[Math.floor(Math.random() * pointsData.length)];
  const e = pointsData[Math.floor(Math.random() * pointsData.length)];
  return {
    startLat: s.lat,
    startLng: s.lng,
    endLat: e.lat,
    endLng: e.lng,
    color: ["#3da5ff", "#b8ff3b"]
  };
});

Globe.arcsData(arcs)
  .arcColor(d => d.color)
  .arcAltitude(0.24)
  .arcStroke(0.75)
  .arcDashLength(0.55)
  .arcDashGap(3)
  .arcDashAnimateTime(2400);

// Animate
function animate() {
  Globe.rotation.y += 0.0021;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

