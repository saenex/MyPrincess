// Manejar el botón de entrada
document.getElementById('enterButton').addEventListener('click', function () {
    const button = this;
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingGif = document.querySelector('.loading-gif');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContainer = document.getElementById('main-container');

    const bgMusic = document.getElementById('backgroundMusic');
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".contador-box");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let isDragging = false;
    let startX = 0;

    bgMusic.volume = 0.5;

    button.classList.add('clicked');

    
    // FECHA DE INICIO
  const fechaInicio = new Date("2024-11-21T00:00:00");

  // FUNCIONES DE TIEMPO
  function actualizarContador() {
    const ahora = new Date();
    const tiempo = ahora - fechaInicio;

    // TOTAL EN SEGUNDOS
    const totalSegundos = Math.floor(tiempo / 1000);
    const segundos = totalSegundos % 60;
    const totalMinutos = Math.floor(totalSegundos / 60);
    const minutos = totalMinutos % 60;
    const totalHoras = Math.floor(totalMinutos / 60);
    const horas = totalHoras % 24;
    const totalDias = Math.floor(totalHoras / 24);

    // Años, meses, días para vista 1
    let anios = 0;
    let meses = 0;
    let dias = 0;
    
    const fechaActual = new Date(ahora);
    const fechaTemp = new Date(fechaInicio);
    
    // Calcular años
    anios = fechaActual.getFullYear() - fechaTemp.getFullYear();
    
    // Calcular meses
    meses = fechaActual.getMonth() - fechaTemp.getMonth();
    if (meses < 0) {
      anios--;
      meses += 12;
    }
    
    // Calcular días
    dias = fechaActual.getDate() - fechaTemp.getDate();
    if (dias < 0) {
      meses--;
      if (meses < 0) {
        anios--;
        meses += 12;
      }
      const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
    }

    document.getElementById("anios2").textContent = anios;
    document.getElementById("meses2").textContent = meses;
    document.getElementById("diasSolo2").textContent = dias;
    document.getElementById("horas2").textContent = horas;
    document.getElementById("minutosSolo2").textContent = minutos;

    document.getElementById("totalDias").textContent = totalDias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
  }

  setInterval(actualizarContador, 1000);
  actualizarContador();

  // ENTRAR Y MOSTRAR CONTENIDO
  enterButton.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    mainContent.style.display = "flex";
    backgroundMusic.play();
  });

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      
      if (index === currentSlide) {
        slide.classList.add('active');
      } else if (index < currentSlide) {
        slide.classList.add('prev');
      }
      // Los slides que están después del actual quedan en su posición por defecto (derecha)
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // DESLIZAR MANUAL CON MOUSE / TOUCH
  slider.addEventListener("mousedown", startDrag);
  slider.addEventListener("touchstart", startDrag, { passive: false });

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    startX = e.type === "mousedown" ? e.pageX : e.touches[0].clientX;

    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchend", endDrag);
  }

  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
  }

  function endDrag(e) {
    isDragging = false;
    const x = e.type === "mouseup" ? e.pageX : e.changedTouches[0].clientX;
    const deltaX = x - startX;

    // Si se desliza más de 50px, cambiar de slide
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0 && currentSlide < slides.length - 1) {
        // Deslizar hacia la izquierda - siguiente slide
        currentSlide++;
      } else if (deltaX > 0 && currentSlide > 0) {
        // Deslizar hacia la derecha - slide anterior
        currentSlide--;
      }
    }

    updateSlider();
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchend", endDrag);
  }

  // Click en dots para navegar
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  // INICIAR CON PRIMERA VISTA
  updateSlider();
  
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



// Redimensionamiento
window.addEventListener('resize', () => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.body.style.overflow = '', 300);
});



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