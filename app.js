<script>
  const locInfo = document.getElementById("location-info");
  const welcomeText = document.getElementById("welcome-text");

  function updateLocationUI(lat, lon) {
    locInfo.innerText = `📍 Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
  }

  function handlePosition(pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    // Update AR object position
    if (welcomeText) {
      welcomeText.setAttribute("gps-entity-place", `latitude: ${lat}; longitude: ${lon};`);
    }

    updateLocationUI(lat, lon);
  }

  function handleError(error) {
    console.warn("Geolocation error:", error.message);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        locInfo.innerText = "❌ Location access denied. Please allow GPS.";
        break;
      case error.POSITION_UNAVAILABLE:
        locInfo.innerText = "📡 Location unavailable.";
        break;
      case error.TIMEOUT:
        locInfo.innerText = "⌛ Location request timed out.";
        break;
      default:
        locInfo.innerText = "⚠️ Unable to access GPS location.";
        break;
    }
  }

  // Start watching the position for real-time updates
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    locInfo.innerText = "❌ Geolocation not supported.";
  }
</script>
