// Al cargar la página, hacer scroll automático al div de la galería
        document.addEventListener('DOMContentLoaded', function () {
            var galeriaDiv = document.getElementById('galeria-div');
            if (galeriaDiv) {
                galeriaDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });