<script>
  const locInfo = document.getElementById("location-info");
  const welcomeText = document.getElementById("welcome-text");

  // Target location for AR entity
  const targetLat = 18.5344;
  const targetLon = 73.883;
  const visibilityThreshold = 10; // meters

  function updateLocationUI(lat, lon, distance = null) {
    let msg = `📍 Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
    if (distance !== null) {
      msg += `\n📏 Distance to AR: ${distance.toFixed(1)} m`;
    }
    if (locInfo) locInfo.innerText = msg;
  }

  // Haversine formula to calculate distance in meters
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) ** 2 +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
  }

  function handlePosition(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const distance = calculateDistance(lat, lon, targetLat, targetLon);

    // Show/hide AR entity based on proximity
    if (welcomeText) {
      if (distance <= visibilityThreshold) {
        welcomeText.setAttribute("visible", "true");
      } else {
        welcomeText.setAttribute("visible", "false");
      }
    }

    updateLocationUI(lat, lon, distance);
  }

  function handleError(error) {
    console.warn("Geolocation error:", error.message);
    const msg = {
      1: "📵 Location access denied.\nPlease enable location in browser settings.",
      2: "📡 Location unavailable.",
      3: "⌛ Location request timed out."
    }[error.code] || "⚠️ Unable to access GPS location.";

    if (locInfo) locInfo.innerText = msg;
  }

  // Hide the AR entity initially
  if (welcomeText) {
    welcomeText.setAttribute("visible", "false");
  }

  // Start tracking user's location
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    if (locInfo) locInfo.innerText = "❌ Geolocation not supported.";
  }
</script>
