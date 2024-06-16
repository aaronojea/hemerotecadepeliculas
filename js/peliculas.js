/* CARGAR PELICULAS */

// Configuración inicial de los encabezados para realizar llamadas a la API
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjE0ZDc2NTUzZTI1NWYxYTY2YTQ2M2E5YWVlZjkzMCIsInN1YiI6IjY1M2Y3NThlY2M5NjgzMDBjOWU1MDEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FqH5iyYw7QDd-7ZydOPSYQ2UH_hA4OcEeF6JUK-Iz3M");

// Opciones de configuración para todas las solicitudes a la API, como método HTTP y encabezados
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// Inicializa un array para almacenar las películas seleccionadas por el usuario
let miLista = [];
 
// Variables para gestionar la paginación de resultados en la UI
let paginaActual = 1;
let paginasTotales = 1;

// Variable para mantener la categoría actual seleccionada por el usuario
let categoriaActual = {
    id: 0,
    name: ""
};

// Carga la página de inicio y las funciones asociadas al cargar el sitio web
cargarInicio();

// Función para cargar la página inicial y obtener categorías de películas
function cargarInicio() {
    // Realiza una solicitud para obtener las categorías de películas y las muestra en el menú
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=es", requestOptions)
        .then(response => response.json())
        .then(result => result.genres.forEach(elemento => {
            generarMenuCategorias(elemento);
        }))
        .catch(error => console.log('error', error));

    // Solicitud para obtener noticias relacionadas con películas
    url = `https://newsapi.org/v2/everything?q=película&language=es&sortBy=publishedAt&apiKey=e0781a7f704743d5815eff374a24212b`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer e0781a7f704743d5815eff374a24212b`
        }
    })
    .then(resultado => {
        padre = document.getElementById("contenido");
        padre.innerHTML = "";
        fila = document.createElement("div");
        fila.classList.add("row", "row-cols-1", "row-cols-md-1", "row-cols-lg-2", "justify-content-center", "margenes");

        tituloPagina = document.createElement("h1");
        tituloPagina.classList.add("mb-4", "text-center");
        tituloPagina.innerHTML = "Últimas noticias";
        padre.appendChild(tituloPagina);

        if (resultado.articles && resultado.articles.length > 0) {
            resultado.articles.forEach(article => {
                elementoNoticia = document.createElement('div');
                elementoNoticia.classList.add('col-md-8', 'noticia');

                img = article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}">` : '';
                noticiaContenido = `
                    ${img}
                    <h5>${article.title}</h5>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Leer más</a>
                `;

                elementoNoticia.innerHTML = noticiaContenido;
                fila.appendChild(elementoNoticia);
            });

            padre.appendChild(fila);
        } else {
            noticia = document.createElement('p');
            noticia.classList.add('text-center');
            noticia.innerHTML = "No hay noticias disponibles en este momento.";
            padre.appendChild(noticia);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        padre = document.getElementById("contenido");
    });
}

// Función para generar y mostrar información de contacto en la página
function generarContacto() {    
    padre = document.getElementById("contenido");
    padre.innerHTML = "";
    fila = document.createElement("div");
    fila.classList.add("row", "row-cols-1", "row-cols-md-1", "row-cols-lg-1", "justify-content-center");
    tituloPagina = document.createElement("h1");
    tituloPagina.classList.add("mb-4", "text-center");
    tituloPagina.innerHTML = "Información sobre nosotros";
    padre.appendChild(tituloPagina);

    infoParrafo = document.createElement("p");
    infoParrafo.classList.add("text-center", "margenTexto");
    infoParrafo.innerHTML = `Bienvenido a nuestra página de información de películas. Nos dedicamos a proporcionar información actualizada y precisa sobre las últimas películas, clásicos del cine, y todo lo relacionado con el mundo del entretenimiento. Nuestro objetivo es ser tu fuente confiable para todas tus necesidades de información cinematográfica.
    Estamos comprometidos a ofrecer contenido de alta calidad que satisfaga a los cinéfilos más exigentes. Además, contamos con una base de datos extensa que abarca desde películas de culto hasta los más recientes estrenos de Hollywood.
    Nuestro equipo está formado por expertos en cine que trabajan arduamente para brindarte análisis profundos y opiniones imparciales. Creemos que el cine es una forma de arte poderosa que merece ser explorada y apreciada en toda su diversidad. Gracias por visitarnos y esperamos que disfrutes de nuestro contenido. Si tienes alguna pregunta o sugerencia, no dudes en contactarnos a través de los medios proporcionados a continuación.`;
    fila.appendChild(infoParrafo);
            
    contactoTitulo = document.createElement("h2");
    contactoTitulo.classList.add("mb-4", "text-center");
    contactoTitulo.innerHTML = "Contacto";
    fila.appendChild(contactoTitulo);
            
    contactoInfo = [
        {
            icon: 'img/whatsapp.png',
            text: 'Teléfono: 685814319'
        },
        {
            icon: 'img/gmail.png',
            text: 'Correo electrónico: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aaronojeaolmos2@gmail.com" target="_blank">aaronojeaolmos2@gmail.com</a>'
        },
        {
            icon: 'img/instagram.png',
            text: 'Instagram: <a href="https://www.instagram.com/aaron.ojea" target="_blank">@aaron.ojea</a>'
        }
    ];
            
    contactoInfo.forEach(info => {
        contactoParrafo = document.createElement("p");
        contactoParrafo.classList.add("contactoInfo", "text-center");
                
        imagenIcono = document.createElement("img");
        imagenIcono.src = info.icon;
        imagenIcono.classList.add("contactoIcono");
                
        contactoParrafo.appendChild(imagenIcono);
        contactoParrafo.innerHTML += info.text;
        fila.appendChild(contactoParrafo);
     });

    padre.appendChild(fila);
}

// Función para obtener las categorías de películas de la API y procesarlas
function generarCategoriasJson() {
    paginaActual = 1;
    paginasTotales = 1;
    categoriaActual.id = 0;

    // Llamada a la API para obtener categorías de películas
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=es", requestOptions)
        .then(response => response.json())
        .then(result => generarBotonesJSON(result))
        .catch(error => console.log('error', error));
}

// Función para crear botones dinámicamente en base a las categorías obtenidas
function generarBotonesJSON(resultados) {
  padre = document.getElementById("contenido");
  padreCategorias = document.getElementById("menuCategorias");
  padre.innerHTML = "";
  padreCategorias.innerHTML = "";
  titulo = document.createElement("h1");
  titulo.classList.add("mb-3", "text-center");
  titulo.innerHTML = "Categorías";
  padre.appendChild(titulo);

  fila = document.createElement("div");
  fila.classList.add("row", "row-cols-2", "row-cols-md-3", "row-cols-lg-4", "justify-content-center");

  resultados.genres.forEach(elemento => {
      columna = document.createElement("div");
      columna.classList.add("col", "p-2");

      boton = document.createElement("button");
      boton.classList.add("btn", "w-100", "boton", "btnCategoria");
      boton.setAttribute("type", "button");
      boton.setAttribute("title", `${elemento.name}`);
      boton.setAttribute("alt", `${elemento.name}`);
      boton.innerHTML = `<img class="miicono" src="img/iconos/${elemento.id}.png"/> <p>${elemento.name}</p>`;

      fila.appendChild(columna).appendChild(boton);

      // Al hacer clic en una categoría llama al método generarPeliculasJson
      boton.addEventListener("click", function() {
          generarPeliculasJson(elemento, paginaActual);
      });

      generarMenuCategorias(elemento);
  });
  padre.appendChild(fila);
}

// Función para cargar películas basadas en una categoría específica y una página determinada
function generarPeliculasJson(categoria, pagina) {
  categoriaActual.id = categoria.id;
  categoriaActual.name = categoria.name;

  // Llamada a la API para obtener películas por categoría y página
  fetch(`https://api.themoviedb.org/3/discover/movie?language=es&with_genres=${categoria.id}&page=${pagina}`, requestOptions)
      .then(response => response.json())
      .then(result => mostrarTarjetas(result, categoria))
      .catch(error => console.log('error', error));
}

// Función para mostrar tarjetas de películas en la página, incluyendo la paginación
function mostrarTarjetas(resultados, categoria) {
    paginasTotales = resultados.total_pages;
    padre = document.getElementById("contenido");

    if (paginaActual == 1) {
        padre.innerHTML = "";
        fila = document.createElement("div");
        fila.classList.add("row", "row-cols-2", "row-cols-md-3", "row-cols-lg-4", "justify-content-center");
        tituloPagina = document.createElement("h1");
        tituloPagina.classList.add("mb-4", "text-center");
        tituloPagina.innerHTML = categoria.name;
        padre.appendChild(tituloPagina);
    }

    generarTarjetas(resultados);
    padre.appendChild(fila);
}

// Función para crear tarjetas individuales para cada película, incluyendo imagen y detalles
function generarTarjetas(resultados) {
    resultados.results.forEach(elemento => {
        columna = document.createElement("div");
        columna.classList.add("col", "p-2");

        tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        imagen = document.createElement("img");
        imagen.src = `https://image.tmdb.org/t/p/w500${elemento.poster_path}`;
        imagen.classList.add("card-img-top");
        imagen.setAttribute("data-bs-toggle", "modal");
        imagen.setAttribute("data-bs-target", "#modalPelicula");
        imagen.setAttribute("title", elemento.title);
        imagen.setAttribute("alt", elemento.title);

        imagen.addEventListener("click", function () {
            cargarModal(elemento);
        });

        bodyTarjeta = document.createElement("div");
        bodyTarjeta.classList.add("card-body");

        titulo = document.createElement("h6");
        titulo.classList.add("card-title");
        titulo.innerHTML = `${elemento.title}`;

        año = document.createElement("p");
        año.classList.add("card-text", "text-body-secondary", "mt-auto", "letraBlanca");
        año.innerHTML = `${elemento.release_date}`;

        fila.appendChild(columna);
        columna.appendChild(tarjeta);
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(bodyTarjeta);
        bodyTarjeta.appendChild(titulo);
        bodyTarjeta.appendChild(año);
    });
}

// Función para cargar detalles en un modal cuando se selecciona una película
function cargarModal(elemento) {
    padre = document.getElementById("contenidoModal");
    padre.innerHTML = "";

    tarjetaPelicula = document.createElement("div");
    tarjetaPelicula.classList.add("card", "mb-3");
    imagenPelicula = document.createElement("img");
    imagenPelicula.src = `https://image.tmdb.org/t/p/original${elemento.backdrop_path}`;
    cuerpoTarjeta = document.createElement("div");
    cuerpoTarjeta.classList.add("card-body");
    tituloPelicula = document.createElement("h5");
    tituloPelicula.classList.add("card-title");
    tituloPelicula.innerHTML = elemento.title;
    descripcion = document.createElement("p");
    descripcion.classList.add("card-text");
    descripcion.innerHTML = elemento.overview;
    añoPelicula = document.createElement("p");
    añoPelicula.classList.add("card-text", "text-body-secondary", "letraBlanca");
    añoPelicula.innerHTML = `${elemento.release_date}`;

    padre.appendChild(tarjetaPelicula);
    tarjetaPelicula.appendChild(imagenPelicula);
    tarjetaPelicula.appendChild(cuerpoTarjeta);
    cuerpoTarjeta.appendChild(tituloPelicula);
    cuerpoTarjeta.appendChild(descripcion);
    cuerpoTarjeta.appendChild(añoPelicula);

    // Botón de la ventana modal para añadir una película al array miLista
    botonLista = document.getElementById("añadirLista");
    botonLista.addEventListener("click", function() {
        añadirMiLista(elemento);
    });
}

// Función para generar automáticamente las categorías para el dropdown del menú categorías
function generarMenuCategorias(elemento) {
    padreCategorias = document.getElementById("menuCategorias");
    padreCategorias.classList.add("dropdown-menu");
    li = document.createElement("li");
    separador = document.createElement("li");
    hr = document.createElement("hr");
    hr.classList.add("dropdown-divider");
    a = document.createElement("a");
    a.classList.add("dropdown-item");
    a.innerHTML = elemento.name;

    //Al hacer clic en una categoría llama al método generarPeliculasJson
    a.addEventListener("click", function () {
        generarPeliculasJson(elemento, paginaActual);
    });
    
    padreCategorias.appendChild(li);
    li.appendChild(a);
    separador.appendChild(hr);
    padreCategorias.appendChild(separador);
}

// Función para comprobar que en la lista no existe el elemento y lo añade
function añadirMiLista(elemento) {
    if (!miLista.some(pelicula => pelicula.id === elemento.id)) {
        miLista.push(elemento);
    }
}

// Función para mostrar las películas que hay en mi lista.
function mostrarLista() {
    paginaActual = 1;
    paginasTotales = 1;
    categoriaActual.id = 0;
    padreLista = document.getElementById("contenido");
    padreLista.innerHTML = "";

    filaLista = document.createElement("div");
    filaLista.classList.add("row", "row-cols-2", "row-cols-md-3", "row-cols-lg-4", "justify-content-center");

    tituloPaginaLista = document.createElement("h1");
    tituloPaginaLista.classList.add("mb-4", "text-center");
    tituloPaginaLista.innerHTML = "Mi lista";
    padreLista.appendChild(tituloPaginaLista);

    miLista.forEach(elemento => {
        columna = document.createElement("div");
        columna.classList.add("col", "p-2");

        tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        imagen = document.createElement("img");
        imagen.src = `https://image.tmdb.org/t/p/w500${elemento.poster_path}`;
        imagen.classList.add("card-img-top");
        imagen.setAttribute("data-bs-toggle", "modal");
        imagen.setAttribute("data-bs-target", "#mostrarPelicula");
        imagen.setAttribute("title", elemento.title);
        imagen.setAttribute("alt", elemento.title);

        imagen.addEventListener("click", function() {
            cargarModal(elemento);
        });

        bodyTarjeta = document.createElement("div");
        bodyTarjeta.classList.add("card-body");

        titulo = document.createElement("h6");
        titulo.classList.add("card-title");
        titulo.innerHTML = `${elemento.title}`;

        año = document.createElement("p");
        año.classList.add("card-text", "text-body-secondary", "mt-auto", "letraBlanca");
        año.innerHTML = `${elemento.release_date}`;

        filaLista.appendChild(columna);
        columna.appendChild(tarjeta);
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(bodyTarjeta);
        bodyTarjeta.appendChild(titulo);
        bodyTarjeta.appendChild(año);
    });

    padreLista.appendChild(filaLista);
}

// Función para generar un resultado con los estrenos y llamar al método mostrarEstrenos
function generarEstrenosJSON() {
    fetch("https://api.themoviedb.org/3/movie/now_playing?language=es", requestOptions)
        .then(response => response.json())
        .then(result => mostrarEstrenos(result))
        .catch(error => console.log('error', error));
}

// Función para mostrar los estrenos en el contenido
function mostrarEstrenos(resultados) {
    paginaActual = 1;
    paginasTotales = 1;
    categoriaActual.id = 0;
    padre = document.getElementById("contenido");
    padre.innerHTML = "";
    fila = document.createElement("div");
    fila.classList.add("row", "row-cols-2", "row-cols-md-3", "row-cols-lg-4", "justify-content-center");
    tituloPagina = document.createElement("h1");
    tituloPagina.classList.add("mb-4", "text-center");
    tituloPagina.innerHTML = "Estrenos";
    padre.appendChild(tituloPagina);

    generarTarjetas(resultados);

    padre.appendChild(fila);
}

// Función para comprobar si es posible hacer scroll. Si es posible lo hace para continuar mostrando resultados.
window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (paginaActual <= paginasTotales && categoriaActual.id > 0) {
          paginaActual++;
          generarPeliculasJson(categoriaActual, paginaActual);
      }
  }
  scrollFunction();
};

// Función para cuando el usuario desciende y se pasa 200px desde el tope del documento, se muestra el botón
function scrollFunction() {
  let botonVolver = document.getElementById("btn-volver");
  if (
      document.body.scrollTop > 350 ||
      document.documentElement.scrollTop > 350
  ) {
      botonVolver.style.display = "block";
  } else {
      botonVolver.style.display = "none";
  }
}

// Función para cuando se pulsa en el botón llamamos a la función volverArriba
document.getElementById('btn-volver').onclick = function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
};
