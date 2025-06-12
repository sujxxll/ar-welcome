<script>
  const locInfo = document.getElementById("location-info");
  const dinoModel = document.getElementById("dino");

  // 🧭 Target GPS coordinates (where placement is allowed)
  const targetLat = 18.595234;
  const targetLon = 73.726098;
  const visibilityThreshold = 15; // meters

  // 🦖 Hide model initially
  dinoModel.setAttribute("visible", "false");

  // 🌍 Calculate distance between user and target
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) ** 2 +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // 📍 Watch user position
  let isWithinLocation = false;

  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition((pos) => {
      const userLat = pos.coords.latitude;
      const userLon = pos.coords.longitude;
      const dist = calculateDistance(userLat, userLon, targetLat, targetLon);
      isWithinLocation = dist <= visibilityThreshold;

      locInfo.innerText = isWithinLocation
        ? "✅ You're in the target area. Tap a surface to place the dinosaur."
        : `🚫 Move closer to the target location.\n📏 ${dist.toFixed(1)} meters away.`;
    }, (err) => {
      locInfo.innerText = "⚠️ GPS error: " + err.message;
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    locInfo.innerText = "❌ Geolocation not supported by this browser.";
  }

  // 📦 On model load
  dinoModel.addEventListener("model-loaded", () => {
    dinoModel.setAttribute("visible", "false");
  });

  // 👆 Only allow placement if within GPS zone
  dinoModel.addEventListener("ar-hit-test-select", () => {
    if (isWithinLocation) {
      dinoModel.setAttribute("visible", "true");
      locInfo.innerText = "🦖 Dinosaur placed! Move your phone around to view.";
    } else {
      dinoModel.setAttribute("visible", "false");
      locInfo.innerText = "🚫 You must be at the correct GPS location to place the dinosaur.";
    }
  });
</script>
