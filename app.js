<script>
  // This script is optional if you don't need dynamic interactions.
  // AR.js handles marker detection and model rendering automatically.

  document.addEventListener("DOMContentLoaded", () => {
    console.log("AR scene ready. Point camera at the QR marker to view the dinosaur.");
  });

  // Optional: Add visibility feedback when marker is detected
  const sceneEl = document.querySelector("a-scene");
  sceneEl.addEventListener("markerFound", (e) => {
    console.log("✅ Marker found:", e.target);
  });

  sceneEl.addEventListener("markerLost", (e) => {
    console.log("❌ Marker lost:", e.target);
  });
</script>
