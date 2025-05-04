document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre-producto');
    const cantidadInput = document.getElementById('cantidad-producto');
    const precioInput = document.getElementById('precio-producto');
    const agregarBtn = document.getElementById('agregar-producto-btn');
    const listaProductos = document.getElementById('lista-productos');
    const totalVentasSpan = document.getElementById('total-ventas');
    const resumenVentasDiv = document.createElement('div');
    const container = document.querySelector('.container');
    container.appendChild(resumenVentasDiv);
    const resetVentasBtn = document.createElement('button');

    let productos = cargarProductos();
    let ventasHoy = cargarVentas();
    let totalVentasHoy = cargarTotalVentas();

    resetVentasBtn.textContent = 'Resetear Ventas del Día';
    resetVentasBtn.classList.add('reset-ventas-btn');
    container.appendChild(resetVentasBtn);
    resetVentasBtn.addEventListener('click', resetearTotalVentas);

    actualizarInventario();
    actualizarTotalVentas();
    mostrarResumenVentas();

    function guardarProductos() {
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function cargarProductos() {
        const almacenados = localStorage.getItem('productos');
        return almacenados ? JSON.parse(almacenados) : [];
    }

    function guardarVentas() {
        localStorage.setItem('ventasHoy', JSON.stringify(ventasHoy));
    }

    function cargarVentas() {
        const almacenadas = localStorage.getItem('ventasHoy');
        return almacenadas ? JSON.parse(almacenadas) : [];
    }

    function guardarTotalVentas() {
        localStorage.setItem('totalVentasHoy', totalVentasHoy.toString());
    }

    function cargarTotalVentas() {
        const almacenado = localStorage.getItem('totalVentasHoy');
        return almacenado ? parseFloat(almacenado) : 0;
    }

    function agregarProducto() {
        const nombre = nombreInput.value.trim();
        const cantidad = parseInt(cantidadInput.value);
        const precio = parseFloat(precioInput.value);

        if (nombre && !isNaN(cantidad) && !isNaN(precio) && cantidad > 0 && precio > 0) {
            const nuevoProducto = {
                id: Date.now(),
                nombre,
                cantidad,
                precio
            };
            productos.push(nuevoProducto);
            guardarProductos();
            actualizarInventario();
            nombreInput.value = '';
            cantidadInput.value = '';
            precioInput.value = '';
            nombreInput.focus(); // Volver el foco al primer campo para el siguiente producto
        } else {
            alert('Por favor, ingresa un nombre, cantidad y precio válidos.');
        }
    }

    function venderProducto(id) {
        const productoIndex = productos.findIndex(producto => producto.id === id);

        if (productoIndex !== -1 && productos[productoIndex].cantidad > 0) {
            productos[productoIndex].cantidad--;
            const precioVendido = productos[productoIndex].precio;
            ventasHoy.push({ nombre: productos[productoIndex].nombre, precio: precioVendido });
            totalVentasHoy += precioVendido;
            guardarProductos();
            guardarVentas();
            guardarTotalVentas();
            actualizarInventario();
            actualizarTotalVentas();
            mostrarResumenVentas();
        } else if (productoIndex !== -1 && productos[productoIndex].cantidad === 0) {
            alert(`No hay más unidades de ${productos[productoIndex].nombre} disponibles.`);
        }
    }

    function eliminarProducto(id) {
        const productoAEliminar = productos.find(producto => producto.id === id);
        if (productoAEliminar) {
            ventasHoy = ventasHoy.filter(venta => venta.nombre !== productoAEliminar.nombre);
            totalVentasHoy = ventasHoy.reduce((total, venta) => total + venta.precio, 0);
            productos = productos.filter(producto => producto.id !== id);
            guardarProductos();
            guardarVentas();
            guardarTotalVentas();
            actualizarInventario();
            actualizarTotalVentas();
            mostrarResumenVentas();
        }
    }

    function actualizarInventario() {
        listaProductos.innerHTML = '';
        productos.forEach(producto => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="product-info">
                    <span>${producto.nombre}</span>
                    <span>Cantidad: ${producto.cantidad}</span>
                    <span>Precio: $${producto.precio.toFixed(2)}</span>
                </div>
                <div class="actions">
                    <button class="sell-btn" data-id="${producto.id}">Vender</button>
                    <button class="delete-btn" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            listaProductos.appendChild(listItem);

            const venderBtn = listItem.querySelector('.sell-btn');
            venderBtn.addEventListener('click', () => venderProducto(producto.id));

            const eliminarBtn = listItem.querySelector('.delete-btn');
            eliminarBtn.addEventListener('click', () => eliminarProducto(producto.id));
        });
    }

    function actualizarTotalVentas() {
        totalVentasSpan.textContent = totalVentasHoy.toFixed(2);
    }

    function mostrarResumenVentas() {
        resumenVentasDiv.innerHTML = '<h2>Resumen de los Productos Vendidos?</h2>';
        if (ventasHoy.length > 0) {
            const listaVentas = document.createElement('ul');
            let ventasPorProducto = {};
            ventasHoy.forEach(venta => {
                if (ventasPorProducto[venta.nombre]) {
                    ventasPorProducto[venta.nombre]++;
                } else {
                    ventasPorProducto[venta.nombre] = 1;
                }
            });

            for (const nombreProducto in ventasPorProducto) {
                const cantidadVendida = ventasPorProducto[nombreProducto];
                const productoInventario = productos.find(p => p.nombre === nombreProducto);
                const precioUnitario = productoInventario ? productoInventario.precio : 0;
                const totalVentaProducto = cantidadVendida * precioUnitario;

                const listItemVenta = document.createElement('li');
                listItemVenta.textContent = `${nombreProducto}: ${cantidadVendida} vendido(s) - Total: $${totalVentaProducto.toFixed(2)}`;
                listaVentas.appendChild(listItemVenta);
            }
            resumenVentasDiv.appendChild(listaVentas);
            /*const totalVentaGeneral = document.createElement('p');
            totalVentaGeneral.classList.add('total-general');
            totalVentaGeneral.textContent = `Total de Ventas del Día: $${totalVentasHoy.toFixed(2)}`;
            resumenVentasDiv.appendChild(totalVentaGeneral);*/
        } else {
            resumenVentasDiv.innerHTML = ''; /*+= '<p>No se realizaron ventas hoy.</p>';*/
        }
    }

    function resetearTotalVentas() {
        if (confirm('¿Estás seguro de que quieres resetear el total de ventas del día? Esta acción no se puede deshacer.')) {
            totalVentasHoy = 0;
            ventasHoy = [];
            guardarTotalVentas();
            guardarVentas();
            actualizarTotalVentas();
            mostrarResumenVentas();
        }
    }

    // --- Event listeners para la navegación con Enter ---
    nombreInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento predeterminado del Enter en formularios
            cantidadInput.focus();
        }
    });

    cantidadInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            precioInput.focus();
        }
    });

    precioInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            agregarBtn.click(); // Simula un clic en el botón "Agregar al Inventario"
        }
    });
    // --- Fin de los event listeners ---

    agregarBtn.addEventListener('click', agregarProducto);
});