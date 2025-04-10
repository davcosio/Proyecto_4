// Mostrar la sección seleccionada y ocultar las demás
function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('.seccion');
    
    // Ocultar todas las secciones
    secciones.forEach((seccionElement) => {
        seccionElement.style.display = 'none';
    });
    
    // Mostrar la sección seleccionada
    const seccionSeleccionada = document.getElementById(seccion);
    seccionSeleccionada.style.display = 'block';

    // Desplazar hacia la sección seleccionada si no es la de inicio
    if (seccion !== 'inicio') {
        seccionSeleccionada.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicializamos la vista
window.onload = function() {
    mostrarSeccion('inicio'); // Muestra la sección de inicio al cargar la página
    mostrarAutos(); // Muestra todos los autos disponibles por defecto
};

// Filtrar autos por categoría
function filtrarPorCategoria(categoria) {
    const categorias = document.querySelectorAll('.categoria');
    
    // Mostrar u ocultar las categorías según la selección
    categorias.forEach((categoriaElement) => {
        if (categoria === 'todos' || categoriaElement.getAttribute('data-categoria') === categoria) {
            categoriaElement.style.display = 'block';
        } else {
            categoriaElement.style.display = 'none';
        }
    });
  
    // Desplazar hacia la sección de autos después de aplicar el filtro
    const seccionAutos = document.getElementById('autos');
    seccionAutos.scrollIntoView({ behavior: 'smooth' });
}

// Función para agregar autos al carrito
let carrito = [];

function agregarAlCarrito(nombre, precio, imagen) {
    const autoEnCarrito = carrito.find(auto => auto.nombre === nombre);
    
    if (autoEnCarrito) {
        autoEnCarrito.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1, imagen });
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoLista = document.querySelector('#carrito ul');
    const totalElement = document.getElementById('total');
    
    carritoLista.innerHTML = ''; // Limpiar la lista de carrito
    
    let total = 0;
  
    carrito.forEach(auto => {
        const li = document.createElement('li');
        
        // Crear contenedor para imagen y detalles del auto
        const divAuto = document.createElement('div');
        divAuto.classList.add('auto-carrito');
        
        // Crear imagen
        const img = document.createElement('img');
        img.src = auto.imagen;
        img.alt = auto.nombre;
        img.classList.add('imagen-carrito');
        
        // Crear detalles del auto (nombre, precio, cantidad, eliminar)
        const detalles = document.createElement('div');
        detalles.classList.add('detalles-auto');
        detalles.innerHTML = `${auto.nombre} - $${auto.precio} x ${auto.cantidad} <button onclick="eliminarDelCarrito('${auto.nombre}')">Eliminar</button>`;
        
        // Agregar imagen y detalles al contenedor
        divAuto.appendChild(img);
        divAuto.appendChild(detalles);
        
        // Agregar el contenedor al elemento de la lista
        li.appendChild(divAuto);
        carritoLista.appendChild(li);
        
        total += auto.precio * auto.cantidad;
    });
  
    totalElement.innerText = total.toFixed(2);
}

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(auto => auto.nombre !== nombre);
    mostrarCarrito();
}

function procesarPago() {
    alert('Pago procesado exitosamente.');
    carrito = [];
    mostrarCarrito();
}

// Llamada a la función que muestra todos los autos por defecto al cargar
function mostrarAutos() {
    filtrarPorCategoria('todos'); // Muestra todos los autos
}

// Filtrar autos por categoría desde el selector
function filtrarAutos() {
    const categoriaSeleccionada = document.getElementById('categoria').value;
    const categorias = document.querySelectorAll('.categoria');
    
    // Mostrar u ocultar las categorías según la selección
    categorias.forEach((categoriaElement) => {
        if (categoriaSeleccionada === 'todos' || categoriaElement.getAttribute('data-categoria') === categoriaSeleccionada) {
            categoriaElement.style.display = 'block';
        } else {
            categoriaElement.style.display = 'none';
        }
    });
  
    // Desplazar hacia la sección de autos después de aplicar el filtro
    const seccionAutos = document.getElementById('autos');
    seccionAutos.scrollIntoView({ behavior: 'smooth' });
}
