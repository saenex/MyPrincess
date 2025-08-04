// Manejar el botón de entrada
document.getElementById('enterButton').addEventListener('click', function () {
    const button = this;
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingGif = document.querySelector('.loading-gif');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContainer = document.getElementById('main-container');

    const bgMusic = document.getElementById('backgroundMusic');

    bgMusic.volume = 0.5;

    button.classList.add('clicked');

    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        loadingScreen.style.display = 'flex';
        loadingGif.classList.add('active');

        bgMusic.play().catch(() => {
            bgMusic.muted = true;
            bgMusic.play().then(() => bgMusic.muted = false);
        });

        setTimeout(() => {
            loadingGif.classList.remove('active');
            loadingGif.classList.add('finish');

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                 mainContainer.classList.add('active');
                document.body.style.filter = 'none';

                const video = document.getElementById('introVideo');
                if (video) {
                    video.muted = false;
                    video.play().catch(() => {
                        video.muted = true;
                        video.play();
                    });
                }
            }, 800);
        }, 2000);
    }, 800);
});

// Voltear la tarjeta excepto si es un botón, showreel o presentación
document.getElementById('interactiveCard').addEventListener('click', function (e) {
    if (!e.target.closest('.btn-cambiar-video') && 
        !e.target.closest('#showReelBtn') && 
        !e.target.closest('#presentacionBtn')) {
        this.classList.toggle('flipped');
    }
});

// Redimensionamiento
window.addEventListener('resize', () => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.body.style.overflow = '', 300);
});

// Precargar video
window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('introVideo');
    if (video) video.load();
});

// Cambiar video en la tarjeta
function cambiarVideo(ruta) {
    const video = document.getElementById("introVideo");
    const source = video.querySelector("source");

    video.classList.remove("video-avatar", "video-showreel", "video-presentacion");

    if (ruta.includes('video.mp4')) {
        video.classList.add('video-avatar');
    } else if (ruta.includes('video2.mp4')) {
        video.classList.add('video-showreel');
    } else if (ruta.includes('video3.mp4')) {
        video.classList.add('video-presentacion');
    }

    video.pause();
    source.setAttribute("src", ruta);
    video.load();
    video.play();
}

// Mostrar Show Reel en modal
document.getElementById('showReelBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    const modalElement = document.getElementById('showReelModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();

    const showReelVideo = document.getElementById('showReelVideo');
    if (showReelVideo) {
        showReelVideo.currentTime = 0;
        showReelVideo.play();
    }
});

// Pausar Show Reel al cerrar modal
document.getElementById('showReelModal').addEventListener('hidden.bs.modal', function () {
    const showReelVideo = document.getElementById('showReelVideo');
    if (showReelVideo) showReelVideo.pause();
});

// Mostrar Presentación en modal
document.getElementById('presentacionBtn').addEventListener('click', function (e) {
    e.stopPropagation();
    const modalElement = document.getElementById('presentacionModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();

    const presentacionVideo = document.getElementById('presentacionVideo');
    if (presentacionVideo) {
        presentacionVideo.currentTime = 0;
        presentacionVideo.play();
    }
});

// Pausar Presentación al cerrar modal
document.getElementById('presentacionModal').addEventListener('hidden.bs.modal', function () {
    const presentacionVideo = document.getElementById('presentacionVideo');
    if (presentacionVideo) presentacionVideo.pause();
});
const beeGif = document.getElementById('beeGif');
const enterDiv = document.getElementById('enterButton');

// Al pasar el mouse, reinicia el gif
enterDiv.addEventListener('mouseenter', () => {
    beeGif.src = 'img/abeja.gif?' + new Date().getTime(); // recarga gif
});

// Clic para iniciar
enterDiv.addEventListener('click', function () {
    const button = this;
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingGif = document.querySelector('.loading-gif');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const bgMusic = document.getElementById('backgroundMusic');

    bgMusic.volume = 0.5;

    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        loadingScreen.style.display = 'flex';
        loadingGif.classList.add('active');

        bgMusic.play().catch(() => {
            bgMusic.muted = true;
            bgMusic.play().then(() => bgMusic.muted = false);
        });

        setTimeout(() => {
            loadingGif.classList.remove('active');
            loadingGif.classList.add('finish');

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.getElementById('main-container').classList.add('active');
                document.body.style.filter = 'none';

                const video = document.getElementById('introVideo');
                if (video) {
                    video.muted = false;
                    video.play().catch(() => {
                        video.muted = true;
                        video.play();
                    });
                }
            }, 800);
        }, 2000);
    }, 800);
});