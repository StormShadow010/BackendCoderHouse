
# Websockets + Handlebars

En esta entrega se evaluará el uso de Socket para la creación de productos, en donde se evidencie el protocolo de comunicación basado en TCP, además de esto se hará uso de Views para mostrar las vistas requeridas en la consigna.

Además en la carpeta public, se crearon carpetas para almanecenar los iconos para cuestiones por defecto como el parametro *photo* y el logo del e-commerce.

La parte los Manager se conserva de la siguiente forma:

## Estructura de Datos

Cada producto tiene las siguientes propiedades:
- ***id*** (código identificador de 12bytes y hexadecimal)
- ***title*** (titulo, obligatorio)
- ***photo*** (ruta de imagen, dar valores por defecto)
- ***category*** (categoria del producto, dar valores por defecto)
- ***price*** (precio, por defecto 1)
- ***stock*** (unidades disponibles, por defecto 1)

Cada usuario tiene las siguientes propiedades:
- ***id*** (12bytes y hexadecimal)
- ***photo*** (ruta de imagen, dar valores por defecto)
- ***email*** (obligatorio)
- ***password*** (obligatorio)
- ***role*** (rol de usuario, por defecto 0)

## Clases ProductManager y UserManager

Las clases `ProductManager` y `UserManager` cuentan con los siguientes métodos:

- `init()`: Se utiliza para inicializar el sistema de archivos y asegurarse de que el archivo de datos exista y esté en el formato adecuado.
- `create(data)`: Agrega un nuevo producto\usuario al sistema con la data enviada.
- `read()`: Devuelve una lista de todos los productos\usuarios almacenados.
- `readOne(id)`: Devuelve un producto\usuario específico según su ID.
- `update(id,data)`: Actualizar un producto\usuario específico según su ID y la data enviada
- `destroy(id)`: Elimina un producto\usuario según su ID.

Estos métodos manejan errores utilizando `try/catch` más que todo se debe evidenciar en la parte de FileSystem.

Es importante aclarar que en fs se creo una carpeta llamada helpers, para cuestión de no repetir código en la lectura y creación del documento, esto se uso tanto para la  clase `ProductManager` como `UserManager`

## Requisitos Previos
- Node.js instalado, versión mayor a la 18.

## Pasos para Probar el Servidor
1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias del proyecto utilizando el comando `npm install` ó `npm i` .
3. Iniciar el servidor con el comando `npm run dev` o `node server.js`.
4. Realizar las peticiones HTTP en el navegador, se recomienda google, debido a que estaremos revisando las vistas.

## Sockets

- “connection” para configurar los dos puntos de conexión (sockets) del back y del front:
socketServer.on() en el socket del servidor
script de socket y ejecutar io() para generar el socket del cliente
- Emisión “products”: en el socket del servidor (back), llamar al manager de productos de FS para enviar un objeto con todos los productos hacia el socket del cliente.
- Recepción “products”: en el socket del cliente de la vista /products/real de handlebars, con js renderizar dinámicamente y en tiempo real los productos recibidos.

- Emisión “new product”: en el socket del cliente de la vista /products/real de handlebars, con js, capturar los datos del formulario y luego emitir el producto para guardarlo en el json del back.

- Recepción “new product”: en el socket del servidor, guardar el producto en el archivo y luego emitir todos los productos para actualizar en tiempo real la vista /products/real



## Vistas

- localhost:8080/ debe mostrar la página de inicio del comercio. Como mínimo debe incluir el logo del comercio y todos los productos que se venden (sólo hbs). 

- localhost:8080/products/real debe mostrar la página con el formulario de creación y todos los productos y debe actualizarse en tiempo real (hbs+socket).

- localhost:8080/users/:uid debe mostrar la página con los datos del usuario (solo hbs), se puede probar el `:uid` 75309d7ee7db27302e4a2008.

- localhost:8080/users/register debe mostrar la página con un formulario para registrar un usuario (solo hbs, no es necesario que sea funcional).

## Pruebas

- En la vista  `localhost:8080/` se pueden ver los productos.
- En la vista `/products/real` se puede crear un producto  e inmediatamente se debe crear en todos los clientes que estén conectados.
- En la vista `localhost:8080/users/:uid`, se puede ver el usuario con el `:uid` 75309d7ee7db27302e4a2008
- En la vista `localhost:8080/users/register`, se puede ver el formulario de registro para el usuario, pero no es funcional. 