# Práctica de integración sobre tu ecommerce

En esta entrega se evaluará la implementación del CUSTOM ROUTER, nuevos ENDPOINTS e implementación de agregation.

## Estructura de Datos de cada Modelo (Schema)

Cada producto tiene las siguientes propiedades:

- **_id_** (código identificador de 12bytes y hexadecimal)
- **_title_** (titulo, obligatorio)
- **_photo_** (ruta de imagen, dar valores por defecto)
- **_category_** (categoria del producto, dar valores por defecto)
- **_price_** (precio, por defecto 1)
- **_stock_** (unidades disponibles, por defecto 1)

Cada usuario tiene las siguientes propiedades:

- **_id_** (12bytes y hexadecimal)
- **_photo_** (ruta de imagen, dar valores por defecto)
- **_email_** (obligatorio)
- **_password_** (obligatorio)
- **_role_** (rol de usuario, por defecto 0)

Cada carrito tiene las propiedades:

- **_user_id_** (para referenciar el usuario que agregó el producto a su carrito)
- **_product_id_** (para referenciar el producto que se agregó al carrito)
- **_quantity_** (de tipo númerico y obligatorio para indicar cuantas unidades se enviaron al carrito)
- **_state_** (para identificar el estado de la compra (suelen ser “reserved”, “paid”, “delivered”) )

## Clases ProductsManager, UsersManager y CartManager

Cada una de esta se construyó con una plantilla de clases, debido a que comparten los siguientes métodos:

- `create(data)`: Agrega un nuevo producto\usuario\carrito al sistema con la data enviada.
- `read()`: Devuelve una lista de todos los productos\usuarios\carrito almacenados.
- `readOne(id)`: Devuelve un producto\usuario\carrito específico según su ID.
- `update(id,data)`: Actualizar un producto\usuario\carrito específico según su ID y la data enviada
- `destroy(id)`: Elimina un producto\usuario\carrito según su ID.
- `destroyMany(id)`: Elimina todos los productos de usuario por su ID.

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
   - Ver el detalle del producto en una página y poder agregar al carrito sin `hardcodear`
3. localhost:8080/users/register debe mostrar la página con un formulario para registrar un usuario. (Es funcional)
4. localhost:8080/users/login debe mostrar la página con un formulario para iniciar sesión (Al validar las creación se redigire al login para iniciar sesión)
5. localhost:8080/users debe mostrar la página con los datos del usuario (debe funcionar sin el parámetro (usar los datos de la session para enviar el id del usuario)).
6. localhost:8080/carts (debe funcionar sin el parámetro (usar los datos de la session para enviar el id del usuario))
   - Todos los productos disponibles de un usuario por su user_id
   - Agregar un botón para eliminar el producto del carrito
   - Agregar un input numérico para la gestión de la cantidad de unidades a comprar
   - Agregar un botón para finalizar la compra y borrar todos los productos del carrito, esto se realizo por medio del ENDPOINT `GET /api/tickets`, así este mismo guarda el ticket en la BD (Mongo)
   - Agregar un botón para cancelar la compra y borrar todos los productos del carrito, esto se realizo por medio del ENDPOINT `ELETE /api/carts/all `, logrando borrar todos los productos de un usuario por su respectivo ID.
   - Se puede ver el calculo total de la compra, esto se realizo por medio del ENDPOINT `GET /api/tickets`, así este mismo guarda el ticket en la BD (Mongo)

## Pruebas

- En la vista `localhost:8080/` se pueden ver los productos en la “landing page”, con el next y prev para poder ver los demás productos (Paginación), además de esto aquí se encuentra el filtro, no por palabra exacta sino por letra.
- En la vista `localhost:8080/products/:pid` se puede probar dando clic en el logo de información y se redirige a la vista de cada producto, además se puede agregar al carrito desde ese punto como en la landing page.
- En la vista `http://localhost:8080/pages/users/register.html`, se puede ver el formulario de registro para el usuario, y es funcional.
- En la vista `http://localhost:8080/pages/users/login.html`, se puede ver el formulario de log in y es funcional, en caso de probar email:`coderadmin@gmail.com` y contraseña: `123456789`, este es un usuario de tipo `["USER"]`
- En la vista `http://localhost:8080/users`, se puede ver el usuario dando clic en la barra de navegación en la foto del perfil agregada a partir del registro, partiendo del uso de la session.
- En la vista `http://localhost:8080/pages/cart/cart.html`, se puede ver el total de productos por de cada usuario a partir de su `user_id`.

### Observaciones

- Todas las vistas se realizarón con JS VAINILLA.
- Usuario de Prueba `email:` coderadmin@gmail.com y `password:` 123456789 (Login), este es un usuario de tipo `["USER"]`.
- Además se agregaron validaciones pero implementando la estrategia de `JWT + Passport` para que en caso de no tener token `no sea posible` ver el carrito o agregar al mismo.
- Además se agregaron las `ALERTAS` de éxito/fracaso de registro/inicio/cierre de sesión funcionales con SweetAlert2.
- En el `CUSTOM ROUTER` se tienen respuestas predeterminadas, así como el manejo de políticas de autenticación/autorización.
