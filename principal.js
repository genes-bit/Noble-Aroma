document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  
  if (headerPlaceholder) {
    fetch("../html/header.html")
      .then(res => res.text())
      .then(data => {
        headerPlaceholder.innerHTML = data;

        let path = window.location.pathname;
        let paginaActual = path.substring(path.lastIndexOf("/") + 1);
        
        if (paginaActual === "" || paginaActual === "Noble_Aroma" || paginaActual === "html") {
          paginaActual = "index.html";
        }

        const enlacesNav = document.querySelectorAll(".nav .buttonHeader");
        
        enlacesNav.forEach(enlace => {
          const href = enlace.getAttribute("href");
          if (href === paginaActual) {
            enlace.classList.add("active");
          } else {
            enlace.classList.remove("active");
          }
        });

        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");
        if (menuToggle && navMenu) {
          menuToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
        }
      })
      .catch(error => console.error("Error cargando el header:", error));
  }

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("../html/footer.html")
      .then(res => res.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el footer:", error));
  }

  const contenedor = document.getElementById("carrusel-contenedor");
  const siguiente = document.getElementById("btn-next");
  const anterior = document.getElementById("btn-prev");
  const puntos = document.querySelectorAll(".punto");

  if (contenedor) {
    let indice = 0;
    let intervalo = null;
    const tiempoAutoplay = 4000;
    const totalImagenes = document.querySelectorAll(".carrusel-slide").length;

    function actualizarCarrusel() {
      contenedor.style.transform = `translateX(-${indice * 100}%)`;
      puntos.forEach((punto, i) => punto.classList.toggle("activo", i === indice));
    }

    function avanzarSiguiente() {
      indice = (indice + 1) % totalImagenes;
      actualizarCarrusel();
    }

    function retrocederAnterior() {
      indice = (indice - 1 + totalImagenes) % totalImagenes;
      actualizarCarrusel();
    }

    function iniciarAutoPlay() {
      if (intervalo) clearInterval(intervalo);
      intervalo = setInterval(avanzarSiguiente, tiempoAutoplay);
    }

    function detenerAutoPlay() {
      if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
      }
    }

    if (siguiente) siguiente.addEventListener("click", () => { detenerAutoPlay(); avanzarSiguiente(); iniciarAutoPlay(); });
    if (anterior) anterior.addEventListener("click", () => { detenerAutoPlay(); retrocederAnterior(); iniciarAutoPlay(); });
    puntos.forEach((punto, i) => {
      punto.addEventListener("click", () => { detenerAutoPlay(); indice = i; actualizarCarrusel(); iniciarAutoPlay(); });
    });
    contenedor.addEventListener("mouseenter", detenerAutoPlay);
    contenedor.addEventListener("mouseleave", iniciarAutoPlay);
    iniciarAutoPlay();
  }

  const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animar-scroll').forEach(el => observador.observe(el));
});

function mostrarHito(indice) {
  const nodos = document.querySelectorAll('.timeline-nodo');
  const hitos = document.querySelectorAll('.timeline-hito');
  nodos.forEach((nodo, i) => nodo.classList.toggle('active', i === indice));
  hitos.forEach((hito, i) => hito.classList.toggle('active', i === indice));
}

function cambiarTab(evt, nombreTab) {
  const contenidos = document.querySelectorAll('.tab-contenido');
  const botones = document.querySelectorAll('.btn-tab');
  contenidos.forEach(c => c.classList.remove('active'));
  botones.forEach(b => b.classList.remove('active'));
  document.getElementById(nombreTab).classList.add('active');
  evt.currentTarget.classList.add('active');
}