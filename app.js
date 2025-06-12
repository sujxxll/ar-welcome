// Wait for A-Frame to load
window.addEventListener('load', () => {
  const marker = document.querySelector('a-marker');
  const dino = marker.querySelector('a-gltf-model');

  marker.addEventListener('markerFound', () => {
    console.log('🔍 Marker found!');
    dino.setAttribute('visible', true);
  });

  marker.addEventListener('markerLost', () => {
    console.log('❌ Marker lost!');
    dino.setAttribute('visible', false);
  });
});
