document.addEventListener("DOMContentLoaded", () => {

  const WHATSAPP = "5492291466679";

  const autos = [
    {
      marca: "Volkswagen",
      modelo: "Golf",
      año: 2016,
      km: 120000,
      precio: 12500,
      imagen: "https://via.placeholder.com/400x250",
      destacado: true
    },
    {
      marca: "Ford",
      modelo: "Focus",
      año: 2018,
      km: 90000,
      precio: 11000,
      imagen: "https://via.placeholder.com/400x250",
      destacado: false
    },
    {
      marca: "Toyota",
      modelo: "Corolla",
      año: 2019,
      km: 70000,
      precio: 14500,
      imagen: "https://via.placeholder.com/400x250",
      destacado: true
    }
  ];

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
          ${auto.destacado ? `<span class="badge">DESTACADO</span>` : ""}
          <img src="${auto.imagen}">
          <h3>${auto.marca} ${auto.modelo}</h3>
          <p>${auto.año} • ${auto.km.toLocaleString()} km</p>
          <strong>USD ${auto.precio.toLocaleString()}</strong>
        `;

        card.addEventListener("click", () => {
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
