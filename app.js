<script>
  AFRAME.registerComponent('markerhandler', {
    init: function () {
      const marker = this.el;

      marker.addEventListener('markerFound', () => {
        console.log('QR code marker found!');
      });

      marker.addEventListener('markerLost', () => {
        console.log('QR code marker lost!');
      });
    }
  });
</script>

<a-marker type="pattern" url="qr-marker.patt" markerhandler>
  <!-- Model inside marker -->
</a-marker>

