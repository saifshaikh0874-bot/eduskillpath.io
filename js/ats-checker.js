// STEP 1: Premium loading animation
function runPremiumLoading(done) {
  const loading = document.getElementById("loading");
  const results = document.getElementById("results");

  loading.classList.remove("hidden");
  results.classList.add("hidden");

  const steps = [
    "Reading resume structure…",
    "Ignoring header & contact info…",
    "Finding weak sentences…",
    "Calculating ATS score…"
  ];

  let i = 0;
  const text = loading.querySelector("p");

  const timer = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(timer);
      loading.classList.add("hidden");
      done();
    } else {
      text.innerText = steps[i];
      i++;
    }
  }, 800);
}

// STEP 2: When Analyze button is clicked
function analyzeATS() {
  runPremiumLoading(() => {
    document.getElementById("results").classList.remove("hidden");
    document.getElementById("score").innerText = 72; // demo score
  });
}
