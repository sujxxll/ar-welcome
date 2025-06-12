const locInfo = document.getElementById("location-info");
const welcomeText = document.getElementById("welcome-text");

// Function to update location text in the UI
function updateLocationUI(lat, lon) {
  locInfo.innerText = `📍 Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
}

// Get current position once on page load
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Set the AR entity's GPS position
    welcomeText.setAttribute("gps-entity-place", `latitude: ${lat}; longitude: ${lon};`);


    // Show the coordinates on the screen
    updateLocationUI(lat, lon);
  },
  (error) => {
    locInfo.innerText = "⚠️ Unable to access GPS location.";
  },
  {
    enableHighAccuracy: true
  }
);

// Update coordinates every second for real-time feedback
setInterval(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      updateLocationUI(pos.coords.latitude, pos.coords.longitude);
    });
  }
}, 1000);
