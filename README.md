
# Práctica de integración sobre ecommerce

En esta entrega se evaluará la implementación de mongo como una tercera instancia, además de las vistas (En este caso se hizo el cambio de handlebar a JS VAINILLA)

Además se usará la persistencia de mongo para incorporarla, en donde se tendrá el manager de Products, Users y Carts.

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

Cada carrito tiene las propiedades:
- ***user_id*** (para referenciar el usuario que agregó el producto a su carrito)
- ***product_id*** (para referenciar el producto que se agregó al carrito)
- ***quantity*** (de tipo númerico y obligatorio para indicar cuantas unidades se enviaron al carrito)
- ***state*** (para identificar el estado de la compra (suelen ser “reserved”, “paid”, “delivered”) )

## Clases ProductsManager, UsersManager y CartManager

Cada una de esta se construyó con una plantilla de clases, debido a que comparten los siguientes métodos:

- `create(data)`: Agrega un nuevo producto\usuario\carrito al sistema con la data enviada.
- `read()`: Devuelve una lista de todos los productos\usuarios\carrito almacenados.
- `readOne(id)`: Devuelve un producto\usuario\carrito específico según su ID.
- `update(id,data)`: Actualizar un producto\usuario\carrito específico según su ID y la data enviada
- `destroy(id)`: Elimina un producto\usuario\carrito según su ID.

Estos métodos manejan errores utilizando `try/catch` más que todo se debe evidenciar en la parte de FileSystem.

## Requisitos Previos
- Node.js instalado, versión mayor a la 18.

## Pasos para Probar el Servidor
1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias del proyecto utilizando el comando `npm install` ó `npm i` .
3. Iniciar el servidor con el comando `npm run dev` o `node server.js`.
4. Realizar las peticiones HTTP en el navegador, se recomienda google, debido a que estaremos revisando las vistas.


## Vistas

- localhost:8080/ debe mostrar la página de inicio del comercio. Como mínimo debe incluir el logo del comercio y todos los productos que se venden. 
- localhost:8080/products/:pid debe mostrar el detalle del producto y un botón para agregar al carrito.
- localhost:8080/users/register debe mostrar la página con un formulario para registrar un usuario.
- localhost:8080/users/:uid debe mostrar la página con los datos del usuario.

## Pruebas

- En la vista  `localhost:8080/` se pueden ver los productos en la “landing page” .
- En la vista `localhost:8080/products/:pid` se puede probar dando clic en la landing page a un producto.
- En la vista `localhost:8080/users/register.html`, se puede ver el formulario de registro para el usuario, pero no es funcional. 
- En la vista `http://localhost:8080/users/userInfo.html?uid=xxxxxx`, se puede ver el usuario con el `:uid` 662f29ca694d730c9abace2f


## CartsManager

Este Manager se encuentran en las tres persistencias (fs,memory mongo), para el probar para fs y memory en data se creo una carpeta testing en donde se prueba cada manager.

### Observaciones
Es importante aclarar que en fs se creo una carpeta llamada helpers, para cuestión de no repetir código en la lectura y creación del documento, esto se uso tanto para la  clase `ProductsManager`,`UsersManager` y `CartsManager` 
