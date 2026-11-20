// CONTENEDORES
const contenedorProductos = document.querySelector("#contenedor-productos");
const contenedorOfertas = document.querySelector("#contenedor-ofertas");
const contenedorVendidos = document.querySelector("#contenedor-vendidos");
const resultadoBotones = document.querySelector("#resultado-botones");

//BOTONES

const btnModoOscuro = document.querySelector("#btnModoOscuro");
const btnMostrarTodos = document.querySelector("#btnMostrarTodos");
const btnMostrarOfertas = document.querySelector("#btnMostrarOfertas");
const btnMostrarCaros = document.querySelector("#btnMostrarCaros");
const btnLimpiar = document.querySelector("#btnLimpiar");
const buscador = document.querySelector("#buscador");

// MOSTRAR PRODUCTOS

function crearHTMLProducto(producto) {
  return `
    <div class="producto-card">
    <h3>${producto.nombre}</h3>
    <span class="categoria">${producto.categoria}</span>
    ${
      producto.enOferta
        ? `
      <div>
        <span class="precio-original">${producto.precioOriginal}€</span>
        <div class="precio">${producto.precio}€</div>
        <span class="oferta">OFERTA</span>
      </div>`
        : `<div class="precio">${producto.precio}€</div>`
    }
    <p class="stock">${producto.stock} unidades</p>
    </div>
    `;
}

const htmlProductos = productos.map(crearHTMLProducto).join("");

contenedorProductos.innerHTML = htmlProductos;

//MOSTRAR PRODUCTOS EN OFERTA

const productosEnOferta = productos.filter((producto) => producto.enOferta);
const htmlOfertas = productosEnOferta.map(crearHTMLProducto).join("");
contenedorOfertas.innerHTML = htmlOfertas;

//MOSTRAR MAS VENDIDOS CON CREATE ELEMENT

function crearElementProducto(producto) {
  const divCard = document.createElement("div");
  divCard.className = "producto-card";

  const h3 = document.createElement("h3");
  h3.textContent = producto.nombre;
  divCard.appendChild(h3);

  const spanCategoria = document.createElement("span");
  spanCategoria.className = "categoria";
  spanCategoria.textContent = producto.categoria;
  divCard.appendChild(spanCategoria);

  const divPrecio = document.createElement("div");
  divPrecio.className = "precio";
  divPrecio.textContent = producto.precio + "€";
  divCard.appendChild(divPrecio);

  if (producto.enOferta) {
    const spanOriginal = document.createElement("span");
    spanOriginal.className = "precio-original";
    spanOriginal.textContent = producto.precioOriginal + "€";
    divCard.insertBefore(spanOriginal, divPrecio);

    const spanOferta = document.createElement("span");
    spanOferta.className = "oferta";
    spanOferta.textContent = "OFERTA";
    divCard.appendChild(spanOferta);
  }

  const stock = document.createElement("p");
  stock.className = "stock";
  stock.textContent = `Stock: ${producto.stock} unidades`;
  divCard.appendChild(stock);

  return divCard;
}

const masVendidos = productos.slice(0, 4);

masVendidos.forEach((producto) => {
  const productoMasVendido = crearElementProducto(producto);
  contenedorVendidos.appendChild(productoMasVendido);
});

//BOTONES

//MODO OSCURO

btnModoOscuro.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");

  const modoOscuroActivo = document.body.classList.contains("modo-oscuro");

  if (modoOscuroActivo) {
    btnModoOscuro.textContent = "Modo Claro";
  } else {
    btnModoOscuro.textContent = "Modo Oscuro";
  }
});

//FILTRAR PRODUCTOS

btnMostrarTodos.addEventListener("click", () => {
  const html = productos.map(crearHTMLProducto).join("");
  resultadoBotones.innerHTML = `
  <h3>Todos los productos (${productos.length})</h3>
  <div class="grid-productos">${html}
  `;
});

btnMostrarOfertas.addEventListener("click", () => {
  const ofertas = productos.filter((producto) => producto.enOferta);
  const html = ofertas.map(crearHTMLProducto).join("");
  resultadoBotones.innerHTML = `
  <h3>Todas las ofertas (${ofertas.length})</h3>
  <div class="grid-productos">${html}
  `;
});

btnMostrarCaros.addEventListener("click", () => {
  const premium = productos.filter((producto) => producto.precio > 500);
  const html = premium.map(crearHTMLProducto).join("");
  resultadoBotones.innerHTML = `
   <h3>Productos Premium (${premium.length})</h3>
  <div class="grid-productos">${html}
  `;
});

btnLimpiar.addEventListener("click", () => {
  resultadoBotones.innerHTML = "";
});

// BUSCADOR

buscador.addEventListener("input", () => {
  const inputValue = buscador.value.toLowerCase();

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(inputValue),
  );

  const html = productosFiltrados.map(crearHTMLProducto).join("");
  resultadoBotones.innerHTML = `
  <h3>Productos (${productosFiltrados.length})</h3>
  <div class="grid-productos">${html}
  `;
});
