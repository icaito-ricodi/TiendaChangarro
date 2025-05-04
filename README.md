# Control de Inventario y Ventas para Changarro

Esta es una aplicación web sencilla creada con HTML, CSS y JavaScript para ayudarte a llevar un control personal del inventario y las ventas de tu changarro.

## Funcionalidades Principales

* **Agregar Productos:** Permite ingresar el nombre, la cantidad y el precio de nuevos productos al inventario.
* **Visualizar Inventario:** Muestra una lista en tiempo real de los productos disponibles con su cantidad y precio.
* **Simular Ventas:** Permite "vender" productos, disminuyendo la cantidad en el inventario y registrando la venta.
* **Registro de Ventas del Día:** Lleva un registro de las ventas realizadas durante el día.
* **Total de Ventas del Día:** Muestra el total acumulado de las ventas del día.
* **Resumen de Ventas del Día:** Ofrece un desglose de los productos vendidos, la cantidad vendida de cada uno y el total generado por cada producto.
* **Eliminar Productos:** Permite eliminar productos del inventario. Al eliminar un producto, se actualiza el registro y el total de ventas del día, removiendo las ventas asociadas a ese producto.
* **Persistencia de Datos:** La información del inventario y las ventas se guarda localmente en tu navegador, por lo que no se pierde al cerrar la página (en el mismo navegador y computadora).
* **Resetear Ventas del Día:** Un botón permite reiniciar el contador del total de ventas del día cuando sea necesario.
* **Navegación con Enter:** Al agregar productos, puedes navegar entre los campos de "Nombre", "Cantidad" y "Precio" presionando la tecla "Enter", y al presionar "Enter" en el campo de "Precio", el producto se agrega automáticamente.

## Cómo Utilizar

1.  **Descarga los archivos:** Asegúrate de tener los tres archivos (`index.html`, `style.css`, `script.js`) en la misma carpeta.
2.  **Abre `index.html` en tu navegador web:** Simplemente haz doble clic en el archivo `index.html` para abrirlo con tu navegador preferido.
3.  **Agregar Productos:**
    * En la sección "Nuevo Producto", ingresa el nombre del producto.
    * Presiona la tecla `Enter` para pasar al campo "Cantidad".
    * Ingresa la cantidad del producto.
    * Presiona la tecla `Enter` para pasar al campo "Precio".
    * Ingresa el precio del producto.
    * Presiona la tecla `Enter` para agregar el producto al inventario.
4.  **Vender Productos:**
    * En la sección "Mi inventario...", busca el producto que deseas vender.
    * Haz clic en el botón "Vender" junto a ese producto. La cantidad en el inventario disminuirá y la venta se registrará.
5.  **Eliminar Productos:**
    * En la sección "Mi Inventario", busca el producto que deseas eliminar.
    * Haz clic en el botón "Eliminar" junto a ese producto.
6.  **Ver Ventas:**
    * El "Total de Ventas" se actualiza automáticamente con cada venta.
    * El "Resumen de los Productos Vendidos?" muestra un desglose de los productos vendidos.
7.  **Resetear Ventas:**
    * Haz clic en el botón "Resetear Ventas del Día" para poner el contador de ventas a cero. Se te pedirá confirmación antes de realizar esta acción.

## Notas Importantes

* **Almacenamiento Local:** Los datos se guardan en el almacenamiento local de tu navegador. Esto significa que si borras la caché o los datos de navegación, la información se perderá. La información también es específica del navegador y la computadora que estés utilizando.
* **Uso Personal:** Esta aplicación está diseñada para un control personal y sencillo de un pequeño negocio como un changarro. No incluye funcionalidades avanzadas de tiendas en línea o gestión de múltiples usuarios.
* **Diseño Básico:** El diseño es funcional y básico. Puedes modificar el archivo `style.css` si deseas personalizar la apariencia.

## Posibles Mejoras Futuras

* Implementación de categorías para los productos.
* Alertas de stock bajo.
* Funcionalidad para editar la información de los productos existentes.
* Opción para exportar los datos de ventas.

¡Espero que esta herramienta te sea de gran utilidad para la gestión de tu changarro!