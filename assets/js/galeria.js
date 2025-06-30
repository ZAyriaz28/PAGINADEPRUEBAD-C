function changeMainImage(imgElement) {
  const mainImage = document.getElementById('mainImage');
  mainImage.src = imgElement.src;

  // Quitar la clase 'selected' de todas
  document.querySelectorAll('.album-thumb').forEach(thumb => {
    thumb.classList.remove('selected');
  });

  // Agregar la clase 'selected' a la que fue clickeada
  imgElement.classList.add('selected');
}

