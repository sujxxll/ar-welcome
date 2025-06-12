<script>
  const locInfo = document.getElementById("location-info");
  const dinoModel = document.getElementById("dino");

  // Show instructional text
  if (locInfo) {
    locInfo.innerText = "📱 Point your camera at a surface and tap to place the dinosaur.";
  }

  // Show the dinosaur once hit-test places it
  dinoModel.addEventListener("model-loaded", () => {
    dinoModel.setAttribute("visible", "false");
  });

  dinoModel.addEventListener("ar-hit-test-select", () => {
    dinoModel.setAttribute("visible", "true");
    if (locInfo) {
      locInfo.innerText = "🦖 Dinosaur placed! You can move your phone around it.";
    }
  });
</script>
