// Efecto de zoom al pasar el cursor por las miniaturas con icono de aumentar
        document.addEventListener('DOMContentLoaded', function () {
            const thumbs = document.querySelectorAll('.album-thumb');
            thumbs.forEach(function (thumb) {
                // Crear icono de aumentar (lupa) solo si no existe ya
                if (!thumb.parentElement.querySelector('.zoom-icon-album')) {
                    const zoomIcon = document.createElement('span');
                    zoomIcon.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" style="pointer-events:none;"><circle cx="11" cy="11" r="7" stroke="#ff4d4f" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#ff4d4f" stroke-width="2" stroke-linecap="round"/></svg>';
                    zoomIcon.style.position = 'absolute';
                    zoomIcon.style.top = '50%';
                    zoomIcon.style.left = '50%';
                    zoomIcon.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    zoomIcon.style.opacity = '0';
                    zoomIcon.style.transition = 'opacity 0.18s, transform 0.18s';
                    zoomIcon.style.pointerEvents = 'none';
                    zoomIcon.className = 'zoom-icon-album';
                    // Contenedor relativo para el icono
                    thumb.parentElement.style.position = 'relative';
                    thumb.parentElement.appendChild(zoomIcon);

                    thumb.addEventListener('mouseenter', function () {
                        zoomIcon.style.opacity = '1';
                        zoomIcon.style.transform = 'translate(-50%, -50%) scale(1)';
                    });
                    thumb.addEventListener('mouseleave', function () {
                        zoomIcon.style.opacity = '0';
                        zoomIcon.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    });
                }
                thumb.style.cursor = 'pointer';
            });
        });

        // Lightbox simple con navegación por flechas
        document.addEventListener('DOMContentLoaded', function () {
            const images = Array.from(document.querySelectorAll('.album-thumb'));
            let currentIndex = 0;

            // Crear lightbox
            const lightbox = document.createElement('div');
            lightbox.id = 'custom-lightbox';
            lightbox.style.display = 'none';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100vw';
            lightbox.style.height = '100vh';
            lightbox.style.background = 'rgba(0,0,0,0.8)';
            lightbox.style.justifyContent = 'center';
            lightbox.style.alignItems = 'center';
            lightbox.style.zIndex = '9999';
            lightbox.innerHTML = `
            <span id="close-lightbox" style="position:absolute;top:30px;right:40px;font-size:40px;color:#fff;cursor:pointer;">&times;</span>
            <span id="prev-lightbox" style="position:absolute;top:50%;left:40px;font-size:60px;color:#fff;cursor:pointer;user-select:none;">&#10094;</span>
            <img id="lightbox-img" src="" alt="" style="max-width:80vw;max-height:80vh;border-radius:10px;box-shadow:0 0 30px #000;">
            <span id="next-lightbox" style="position:absolute;top:50%;right:40px;font-size:60px;color:#fff;cursor:pointer;user-select:none;">&#10095;</span>
            `;
            document.body.appendChild(lightbox);

            function showLightbox(index) {
                currentIndex = index;
                const img = images[currentIndex];
                document.getElementById('lightbox-img').src = img.src;
                document.getElementById('lightbox-img').alt = img.alt;
                lightbox.style.display = 'flex';
            }

            images.forEach((img, idx) => {
                img.addEventListener('click', function () {
                    showLightbox(idx);
                });
            });

            document.getElementById('close-lightbox').onclick = function () {
                lightbox.style.display = 'none';
            };

            document.getElementById('prev-lightbox').onclick = function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showLightbox(currentIndex);
            };

            document.getElementById('next-lightbox').onclick = function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % images.length;
                showLightbox(currentIndex);
            };

            // Cerrar lightbox al hacer click fuera de la imagen
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });

            // Navegación con flechas del teclado
            document.addEventListener('keydown', function (e) {
                if (lightbox.style.display === 'flex') {
                    if (e.key === 'ArrowLeft') {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        showLightbox(currentIndex);
                    } else if (e.key === 'ArrowRight') {
                        currentIndex = (currentIndex + 1) % images.length;
                        showLightbox(currentIndex);
                    } else if (e.key === 'Escape') {
                        lightbox.style.display = 'none';
                    }
                }
            });
        });
        // Cambia la imagen principal al hacer clic en una miniatura
        // function changeMainImage(img) {
        //     document.getElementById('mainImage').src = img.src;
        //     document.getElementById('mainImage').alt = img.alt;
        // }