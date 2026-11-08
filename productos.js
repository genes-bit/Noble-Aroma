const productos = [
  { id: 1, nombre: "Galletas NY", categoria: "reposteria", precio: 6500, imagen: "img/productos/galletasNY.jpeg" },
  { id: 2, nombre: "Torta de zanahoria", categoria: "reposteria", precio: 8500, imagen: "img/productos/Torta-de-zanahoria.jpeg" },
  { id: 3, nombre: "Cheesecake", categoria: "reposteria", precio: 12000, imagen: "img/productos/cheesecake.jpeg" },
  { id: 4, nombre: "Espiral de queso", categoria: "reposteria", precio: 5000, imagen: "img/productos/Espiral-de-queso.jpeg" },
  { id: 5, nombre: "Mini croissant", categoria: "pan", precio: 800, imagen: "img/productos/Mini-Croissant.jpeg" },
  { id: 6, nombre: "Pan de queso", categoria: "pan", precio: 2000, imagen: "img/productos/Pan-de-queso.webp" },
  { id: 7, nombre: "Croissant de chocolate", categoria: "pan", precio: 12000, imagen: "img/productos/pan-de-chocolate.png" },
  { id: 8, nombre: "Croissant de arequipe", categoria: "pan", precio: 12000, imagen: "img/productos/Croissant-de-arequipe.jpeg" },
  { id: 9, nombre: "Pan de mantequilla", categoria: "pan", precio: 3000, imagen: "img/productos/Pan-de-mantequilla.jpeg" },
  { id: 10, nombre: "Deditos horneados", categoria: "pan", precio: 4000, imagen: "img/productos/Deditos-horneados.jpg" },
  { id: 11, nombre: "Brownie", categoria: "reposteria", precio: 8000, imagen: "img/productos/Brownie.jpg" },
  { id: 12, nombre: "Sandwich", categoria: "pan", precio: 13500, imagen: "img/productos/sandwich.png" },
  { id: 13, nombre: "Pan súper queso", categoria: "pan", precio: 5000, imagen: "img/productos/Pan-super-queso.webp" },
  { id: 14, nombre: "Aromática de manzanilla", categoria: "aromaticas", precio: 3000, imagen: "img/productos/Aromatica-de-manzanilla.jpeg" },
  { id: 15, nombre: "Aromática de hierbabuena", categoria: "aromaticas", precio: 3000, imagen: "img/productos/Aromatica-de-hierbabuena.jpeg" },
  { id: 16, nombre: "Té negro", categoria: "aromaticas", precio: 3000, imagen: "img/productos/Te-negro.jpg" },
  { id: 17, nombre: "Aromática natural de frutos rojos", categoria: "aromaticas", precio: 3000, imagen: "img/productos/aromaticas.jpeg" },
  { id: 18, nombre: "Café tinto", categoria: "cafe", precio: 3000, imagen: "img/productos/Cafe-tinto.webp" },
  { id: 19, nombre: "Espresso", categoria: "cafe", precio: 4000, imagen: "img/productos/Espresso.webp" },
  { id: 20, nombre: "Café Amaretto", categoria: "cafe", precio: 5000, imagen: "img/productos/Cafe-Amaretto.webp" },
  { id: 21, nombre: "Cappuccino", categoria: "cafe", precio: 10000, imagen: "img/productos/Cappuccino.png" },
  { id: 22, nombre: "Cappuccino Coco", categoria: "cafe", precio: 10000, imagen: "img/productos/Cappuccino-Coco.jpg" },
  { id: 23, nombre: "Cappuccino Frutos Rojos", categoria: "cafe", precio: 10000, imagen: "img/productos/Cappuccino-Frutos-Rojos.png" },
  { id: 24, nombre: "Latte", categoria: "cafe", precio: 7000, imagen: "img/productos/Latte.jpg" },
  { id: 25, nombre: "Mocaccino caliente", categoria: "cafe", precio: 3000, imagen: "img/productos/Mocaccino-caliente.avif" },
  { id: 26, nombre: "Mocaccino frío", categoria: "cafe", precio: 11000, imagen: "img/productos/Mocaccino-frio.png" },
  { id: 27, nombre: "Latte frío", categoria: "cafe", precio: 8000, imagen: "img/productos/Latte-frio.webp" },
  { id: 28, nombre: "Coca Cola", categoria: "bebidas", precio: 3000, imagen: "img/productos/Coca-Cola.jpg" },
  { id: 29, nombre: "Néctar en caja", categoria: "bebidas", precio: 3000, imagen: "img/productos/Nectar-en-caja.jpeg" },
  { id: 30, nombre: "Agua", categoria: "bebidas", precio: 2000, imagen: "img/productos/Agua.png" },
  { id: 31, nombre: "Jugo natural en agua", categoria: "bebidas", precio: 7000, imagen: "img/productos/jugo.png" },
  { id: 32, nombre: "Jugo natural en leche", categoria: "bebidas", precio: 9000, imagen: "img/productos/jugo-en-leche.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaProductos");
  const listaDestacados = document.getElementById("listaDestacados");
  const modal = document.getElementById("modal-pedido");
  const formPedido = document.getElementById("form-pedido");
  const sinProductos = document.getElementById("sinProductos");
  const contadorProductos = document.getElementById("contadorProductos");

  const inputBuscar = document.getElementById("buscarProducto");
  const radiosCategoria = document.querySelectorAll('input[name="categoria"]');
  const rangoPrecio = document.getElementById("precioMaximo");
  const valorPrecioLabel = document.getElementById("valorPrecio");
  const selectOrden = document.getElementById("orden");
  const btnLimpiar = document.getElementById("limpiarFiltros");
  const btnLimpiarMobile = document.getElementById("limpiarFiltros-mobile");
  const btnVerTodos = document.getElementById("verTodos");

  const btnAbrirFiltros = document.getElementById("btn-abrir-filtros");
  const panelFiltros = document.getElementById("panel-filtros");
  const cerrarFiltros = document.getElementById("cerrar-filtros");
  const overlayFiltros = document.getElementById("overlay-filtros");

  let productoSeleccionado = null;

  function pesos(valor) {
    return valor.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
  }

  function obtenerRutaImagen(imgPath) {
    return imgPath.startsWith("../") ? imgPath : `../${imgPath}`;
  }

  function abrirModalProducto(prod) {
    productoSeleccionado = prod;
    if (productoSeleccionado && modal) {
      const modalImg = document.getElementById("modal-img");
      const modalNombre = document.getElementById("modal-nombre");
      const modalPrecio = document.getElementById("modal-precio");
      const cantidadInput = document.getElementById("cantidad");

      if (modalImg) modalImg.src = obtenerRutaImagen(productoSeleccionado.imagen);
      if (modalNombre) modalNombre.textContent = productoSeleccionado.nombre;
      if (modalPrecio) modalPrecio.textContent = pesos(productoSeleccionado.precio);
      if (cantidadInput) cantidadInput.value = 1;

      document.querySelectorAll('input[name="preferencia"]').forEach(chk => chk.checked = false);
      const inst = document.getElementById("instrucciones");
      if (inst) inst.value = "";

      modal.classList.add("active");
      modal.style.display = "flex";
    }
  }

  function cerrarModalProducto() {
    if (modal) {
      modal.classList.remove("active");
      modal.style.display = "none";
    }
  }

  function renderizarLista(arreglo) {
    if (!lista) return;

    if (arreglo.length === 0) {
      lista.innerHTML = "";
      if (sinProductos) sinProductos.hidden = false;
      if (contadorProductos) contadorProductos.textContent = "0 productos disponibles";
      return;
    }

    if (sinProductos) sinProductos.hidden = true;
    if (contadorProductos) contadorProductos.textContent = `${arreglo.length} productos disponibles`;

    lista.innerHTML = arreglo.map(p => `
      <article class="tarjeta-producto">
        <div class="imagen-producto"><img src="${obtenerRutaImagen(p.imagen)}" alt="${p.nombre}" loading="lazy"></div>
        <div class="info-producto">
          <span class="categoria-producto">${p.categoria}</span>
          <h3>${p.nombre}</h3>
          <p class="precio-producto">${pesos(p.precio)}</p>
          <button type="button" class="boton-producto" data-id="${p.id}">Agregar al carrito</button>
        </div>
      </article>
    `).join("");
  }

  document.addEventListener("click", (e) => {
    const btnProducto = e.target.closest(".boton-producto");
    if (btnProducto) {
      e.preventDefault();
      const id = Number(btnProducto.dataset.id);
      const prod = productos.find(p => p.id === id);
      if (prod) abrirModalProducto(prod);
      return;
    }

    const tarjetaDest = e.target.closest(".tarjeta-destacado");
    if (tarjetaDest) {
      e.preventDefault();
      const id = Number(tarjetaDest.dataset.id);
      const prod = productos.find(p => p.id === id);
      if (prod) abrirModalProducto(prod);
    }
  });

  function aplicarFiltros() {
    let resultado = [...productos];

    if (inputBuscar && inputBuscar.value.trim() !== "") {
      const busqueda = inputBuscar.value.toLowerCase().trim();
      resultado = resultado.filter(p => p.nombre.toLowerCase().includes(busqueda));
    }

    const catSeleccionada = document.querySelector('input[name="categoria"]:checked')?.value;
    if (catSeleccionada && catSeleccionada !== "Todas") {
      resultado = resultado.filter(p => p.categoria.toLowerCase() === catSeleccionada.toLowerCase());
    }

    if (rangoPrecio) {
      const maxP = Number(rangoPrecio.value);
      resultado = resultado.filter(p => p.precio <= maxP);
    }

    if (selectOrden) {
      const criterio = selectOrden.value;
      if (criterio === "menor") resultado.sort((a, b) => a.precio - b.precio);
      if (criterio === "mayor") resultado.sort((a, b) => b.precio - a.precio);
      if (criterio === "nombre") resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    renderizarLista(resultado);
  }

  function resetearFiltros() {
    if (inputBuscar) inputBuscar.value = "";
    document.querySelectorAll('input[name="categoria"]').forEach(r => r.checked = (r.value === "Todas"));
    if (rangoPrecio) {
      rangoPrecio.value = 13800;
      if (valorPrecioLabel) valorPrecioLabel.textContent = pesos(13800);
    }
    if (selectOrden) selectOrden.value = "destacados";
    aplicarFiltros();
  }

  if (inputBuscar) inputBuscar.addEventListener("input", aplicarFiltros);
  radiosCategoria.forEach(r => r.addEventListener("change", aplicarFiltros));
  if (rangoPrecio) {
    rangoPrecio.addEventListener("input", (e) => {
      if (valorPrecioLabel) valorPrecioLabel.textContent = pesos(Number(e.target.value));
      aplicarFiltros();
    });
  }
  if (selectOrden) selectOrden.addEventListener("change", aplicarFiltros);
  if (btnLimpiar) btnLimpiar.addEventListener("click", resetearFiltros);
  if (btnLimpiarMobile) btnLimpiarMobile.addEventListener("click", () => {
    resetearFiltros();
    if (panelFiltros) panelFiltros.classList.remove("active");
    if (overlayFiltros) overlayFiltros.classList.remove("active");
  });
  if (btnVerTodos) btnVerTodos.addEventListener("click", resetearFiltros);

  if (btnAbrirFiltros && panelFiltros && overlayFiltros) {
    btnAbrirFiltros.addEventListener("click", () => {
      panelFiltros.classList.add("active");
      overlayFiltros.classList.add("active");
    });
  }
  if (cerrarFiltros && panelFiltros && overlayFiltros) {
    cerrarFiltros.addEventListener("click", () => {
      panelFiltros.classList.remove("active");
      overlayFiltros.classList.remove("active");
    });
  }
  if (overlayFiltros && panelFiltros) {
    overlayFiltros.addEventListener("click", () => {
      panelFiltros.classList.remove("active");
      overlayFiltros.classList.remove("active");
    });
  }

  const params = new URLSearchParams(window.location.search);
  const catUrl = params.get("categoria");
  if (catUrl) {
    const radioTarget = document.querySelector(`input[name="categoria"][value="${catUrl}"]`);
    if (radioTarget) radioTarget.checked = true;
  }

  aplicarFiltros();

  if (listaDestacados) {
    const destacadosIds = [1, 3, 7, 21, 24, 26];
    const prodsDestacados = productos.filter(p => destacadosIds.includes(p.id));
    listaDestacados.innerHTML = prodsDestacados.map(p => `
      <article class="tarjeta-destacado" data-id="${p.id}">
        <img src="${obtenerRutaImagen(p.imagen)}" alt="${p.nombre}" loading="lazy">
        <div class="overlay-destacado"><h3>${p.nombre}</h3></div>
      </article>
    `).join("");
  }

  const cerrarModalBtn = document.getElementById("cerrar-modal");
  if (cerrarModalBtn) {
    cerrarModalBtn.onclick = cerrarModalProducto;
  }

  if (formPedido) {
    formPedido.onsubmit = (e) => {
      e.preventDefault();
      if (!productoSeleccionado) return;

      const cantidadInput = document.getElementById("cantidad");
      const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;
      const checkboxes = document.querySelectorAll('input[name="preferencia"]:checked');
      let preferencias = [];
      checkboxes.forEach(chk => preferencias.push(chk.value));
      const notas = preferencias.length > 0 ? preferencias.join(", ") : "Normal";

      const pedido = {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        imagen: productoSeleccionado.imagen,
        cantidad: cantidad,
        notas: notas,
        total: productoSeleccionado.precio * cantidad
      };

      let carrito = JSON.parse(localStorage.getItem("carritoNobleAroma")) || [];
      carrito.push(pedido);
      localStorage.setItem("carritoNobleAroma", JSON.stringify(carrito));

      cerrarModalProducto();

      const panel = document.getElementById("panel-carrito");
      const overlay = document.getElementById("overlay-carrito");
      if (panel && overlay) {
        panel.classList.add("active");
        overlay.classList.add("active");
      }
      document.dispatchEvent(new Event("carritoActualizado"));
    };
  }
});