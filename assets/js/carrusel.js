document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.main-banner');

  // URLs de las imágenes de fondo (pueden ser tus enlaces directos)
  const backgrounds = [
    "https://lh3.googleusercontent.com/p/AF1QipPW6AYXThBdcr_Z_dBUzCV0sVvGydfZpWmH2ODt=w4000-h1848",
    "https://lh3.googleusercontent.com/p/AF1QipNh_hBuwLS3WsODPSmvNW3OE7u1vno7drmnYYjT=w4000-h1848",
    "https://lh3.googleusercontent.com/p/AF1QipNRksHy-Ani6spvqk3ANPXISqu7X_gI7i8eNehT=w4032-h3024"
  ];

  let currentIndex = 0;
  const intervalTime = 5000; // 5 segundos

  // Función para cambiar el fondo
  function changeBackground() {
    banner.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
    banner.style.backgroundSize = "cover";
    banner.style.backgroundPosition = "center";
    banner.style.backgroundRepeat = "no-repeat";

    currentIndex++;
    if (currentIndex >= backgrounds.length) {
      currentIndex = 0;
    }
  }

  // Cambiar inmediatamente y luego cada X segundos
  changeBackground();
  setInterval(changeBackground, intervalTime);
});
