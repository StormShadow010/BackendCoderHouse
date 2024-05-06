
# Segunda entrega del Proyecto final

En esta entrega se evaluará la implementación de mongo como una tercera instancia, en donde tendrán vistas, CRUD del carrito y la parte de paginación.


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
- Variables de entorno 
## Pasos para Probar el Servidor
1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias del proyecto utilizando el comando `npm install` ó `npm i` .
3. Iniciar el servidor con el comando `npm run dev` o `node server.js`.
4. Realizar las peticiones HTTP en el navegador, se recomienda google, debido a que estaremos revisando las vistas.


## Vistas

1. localhost:8080/ 
    - Barra de navegación
    - Logo
    - Todos los productos disponibles y paginados
    - Agregar filtro por categoría (En este caso se hizo por Title)
    - Cada tarjeta de producto tiene que linkear hacia la página de detalle del producto.

2. localhost:8080/products/:pid 
    - Un botón para agregar el producto al carrito
    - `hardcodear` un user_id existente para poder para que funcione correctamente
3. localhost:8080/users/register debe mostrar la página con un formulario para registrar un usuario. (Es funcional)
4. localhost:8080/users/login debe mostrar la página con un formulario para iniciar sesión (Al ser un usuario existente redigire a la landing Page)
5. localhost:8080/users/:uid debe mostrar la página con los datos del usuario.
6. localhost:8080/carts/:uid 
    - Todos los productos disponibles d un usuario
    - Agregar un botón para eliminar el producto del carrito
    - Agregar un input numérico para la gestión de la cantidad de unidades a comprar
    - Agregar un botón para finalizar la compra y borrar todos los productos del carrito
    - Agregar un botón para cancelar la compra y borrar todos los productos del carrito
## Pruebas

- En la vista  `localhost:8080/` se pueden ver los productos en la “landing page”, con el next y prev para poder ver los demás productos (Paginación), además de esto aquí se encuentra el filtro, no por palabra exacta sino por letra.
- En la vista `localhost:8080/products/:pid` se puede probar dando clic en el logo de información y se redirige a la vista de cada producto, además se puede agregar al carrito desde ese punto como en la landing page.
- En la vista `http://localhost:8080/pages/users/register.html`, se puede ver el formulario de registro para el usuario, y es funcional. 
- En la vista `http://localhost:8080/pages/users/login.html`, se puede ver el formulario de log in y es funcional, en caso de probar email:`coderAdmin@gmail.com` y contraseña: `123456789`
- En la vista `http://localhost:8080/users/userInfo.html?uid=xxxxxx`, se puede ver el usuario con el `:uid` 663650ece72c2a6d4680166d 
- En la vista `http://localhost:8080/pages/cart/cart.html`, se puede ver el total de productos en este caso el `user_id` esta `hardcodeado` con el uid 663650ece72c2a6d4680166d,además tener en cuenta que el total que se ve muestra en `harcodeado`.

### Observaciones

Todas las vistas se realizarón con JS VAINILLA