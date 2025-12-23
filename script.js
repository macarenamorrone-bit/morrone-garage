document.addEventListener("DOMContentLoaded", () => {
const autos = JSON.parse(localStorage.getItem("autos")) || [];


  const WHATSAPP = "5492291466679";

  // ELEMENTOS
  const autosContainer = document.getElementById("autosContainer");
  const marcaFiltro = document.getElementById("marcaFiltro");
  const precioFiltro = document.getElementById("precioFiltro");

  // MODAL
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalInfo = document.getElementById("modalInfo");
  const modalPrecio = document.getElementById("modalPrecio");
  const modalWhatsapp = document.getElementById("modalWhatsapp");

  // CARGAR MARCAS
  const marcas = [...new Set(autos.map(a => a.marca))];
  marcas.forEach(marca => {
    const option = document.createElement("option");
    option.value = marca;
    option.textContent = marca;
    marcaFiltro.appendChild(option);
  });

  // MOSTRAR AUTOS
  function mostrarAutos(lista) {
    autosContainer.innerHTML = "";

    lista
      .sort((a, b) => b.destacado - a.destacado)
      .forEach(auto => {
        const card = document.createElement("div");
        card.className = auto.destacado ? "card destacado" : "card";

        card.innerHTML = `
          ${auto.destacado && !auto.vendido ? `<span class="badge">DESTACADO</span>` : ""}
          ${auto.vendido ? `<span class="badge vendido">VENDIDO</span>` : ""}

          <img src="${auto.imagen}">
          <h3>${auto.marca} ${auto.modelo}</h3>
          <p>${auto.año} • ${auto.km.toLocaleString()} km</p>
          <strong>USD ${auto.precio.toLocaleString()}</strong>
        `;

        card.addEventListener("click", () => {
          if (auto.vendido) return;

          modalImg.src = auto.imagen;
          modalTitulo.textContent = `${auto.marca} ${auto.modelo}`;
          modalInfo.textContent = `${auto.año} • ${auto.km.toLocaleString()} km`;
          modalPrecio.textContent = `USD ${auto.precio.toLocaleString()}`;
          modalWhatsapp.href =
            `https://wa.me/${WHATSAPP}?text=Hola! Me interesa el ${auto.marca} ${auto.modelo}`;

          modal.classList.remove("hidden");
        });

        autosContainer.appendChild(card);
      });
  }

  // FILTROS
  function filtrarAutos() {
    let filtrados = autos;

    if (marcaFiltro.value !== "all") {
      filtrados = filtrados.filter(a => a.marca === marcaFiltro.value);
    }

    if (precioFiltro.value !== "all") {
      filtrados = filtrados.filter(a => a.precio <= precioFiltro.value);
    }

    mostrarAutos(filtrados);
  }

  marcaFiltro.addEventListener("change", filtrarAutos);
  precioFiltro.addEventListener("change", filtrarAutos);

  // CERRAR MODAL
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // INICIAL
  mostrarAutos(autos);

});



