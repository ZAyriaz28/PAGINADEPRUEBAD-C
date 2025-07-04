// Marcar el thumbnail activo al cambiar la imagen principal
                        function changeMainImage(img) {
                            document.getElementById('mainImage').src = img.src;
                            document.getElementById('mainImage').alt = img.alt;
                            document.querySelectorAll('.album-thumb').forEach(function (el) {
                                el.classList.remove('selected');
                            });
                            img.classList.add('selected');
                        }