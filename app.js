<script>
  AFRAME.registerComponent('marker-handler', {
    init: function () {
      const marker = this.el;
      marker.addEventListener('markerFound', () => {
        console.log('QR marker found! Play dino roar.');
        // e.g., play a sound: marker.querySelector('[sound]').components.sound.playSound();
      });
      marker.addEventListener('markerLost', () => {
        console.log('QR marker lost!');
      });
    }
  });
</script>

<a-marker
  type="pattern"
  url="data:image/png;base64,iVBORw0K..."
  marker-handler
>
  <a-entity
    gltf-model="https://example.com/dino.glb"
    scale="0.5 0.5 0.5"
    position="0 0 0"
    sound="src: url(dino-roar.mp3); on: markerFound"
  ></a-entity>
</a-marker>
