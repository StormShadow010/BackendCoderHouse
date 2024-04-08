
# Websockets + Handlebars

En esta entrega se evaluará el uso de Socket para la creación de productos, en donde se evidencie el protocolo de comunicación basado en TCP, además de esto se hará uso de Views para mostrar las vistas requeridas en la consigna.

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

## Sockets

- “connection” para configurar los dos puntos de conexión (sockets) del back y del front:
socketServer.on() en el socket del servidor
script de socket y ejecutar io() para generar el socket del cliente


## Endpoints Implementadas
### Endpoints de Productos:
- `POST /api/products`: Crear un producto y guardarlo con fs. Si se crea con éxito statusCode: `201` response: id (del nuevo producto) message: (mensaje descriptivo). Manejar errores con errorHandler
- `GET /api/products`: Para buscar todos los productos de fs. Agregar la query necesaria para filtrar por categoría. Si el array tiene productos, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el array). Manejar errores con errorHandler
- `GET /api/products/:pid`: Para buscar un producto de fs. Si se encuentra el producto, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el objeto). Manejar errores con errorHandler
- `PUT /api/products/:pid`: Para buscar un producto de fs y actualizarlo.Si se actualiza el producto, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el objeto modificado). Manejar errores con errorHandler
- `DELETE /api/products/:pid`: Para buscar un producto de fs y eliminarlo. Si se elimina el producto, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el objeto). Manejar errores con errorHandler
### Endpoints de Usuarios:
- `POST /api/users`: Crear un usuario y guardarlo con fs. Si se crea con éxito statusCode: `201` response: id (del nuevo usuario) message: (mensaje descriptivo). Manejar errores con errorHandler
- `GET /api/users`: Para buscar todos los usuarios de fs. Agregar la query necesaria para filtrar por rol. Si el array tiene usuarios, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el array). Manejar errores con errorHandler
- `GET /api/users/:uid`: para buscar un usuario de fs. Si se encuentra el producto, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el objeto). Manejar errores con errorHandler
- `PUT /api/users/:uid`:Para buscar un usuario de fs y actualizarlo.Si se actualiza el producto, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el objeto modificado). Manejar errores con errorHandler
- `DELETE /api/users/:uid`: Para buscar un usuario de fs y eliminarlo. Si se elimina el producto, enviar al cliente un objeto con las propiedades: statusCode: `200` response: (el objeto). Manejar errores con errorHandler

# Testing del código

## Requisitos Previos
- Node.js instalado, versión mayor a la 18.

## Pasos para Probar el Servidor
1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias del proyecto utilizando el comando `npm install` ó `npm i` .
3. Iniciar el servidor con el comando `npm run dev` o `node server.js`.
4. Realizar las peticiones HTTP mediante la herramienta Postman, tener cuidado de poner el método que corresponda.

---
**Productos:**
1. Casos de exito:
   - Para obtener todos los productos: `http://localhost:8080/api/products`
   - Para filtrar por categoria (reemplazar `filtro` por la categoria): `http://localhost:8080/api/products?category=filtro`
   (Puedes usar la siguiente ruta `http://localhost:8080/api/products?category=category%20B`)
   - Para obtener un producto específico (reemplazar `:pid` por el ID del producto): `http://localhost:8080/api/products/:pid`
   (Puedes usar la siguiente ruta `http://localhost:8080/api/products/353324372ff812d0734c22ac`)
   - Para crear se debe usar: `http://localhost:8080/api/products`, y configurar el body, por ejemplo así:
   ```javascript	
   {
    "title": "Product 41",
    "photo": "https://example.com/photo21.jpg",
    "category": "Category A"
    }
   ```
   - Para actualizar se debe usar: `http://localhost:8080/api/products/:pid`, se debe configurar el body y id del producto, por ejemplo así:
   ID: Del último elemento creado, en donde al momento de la creación sale el ID del producto nuevo
   ```javascript	
   {
    "price": 50
    }
   ```
   - Para borrar se debe usar: `http://localhost:8080/api/products/:pid`, tener en cuenta un ID por ejemplo se puede usar el de la creación.

2. Casos de error:
    - Filtrar por una categoría que no existe por ejemplo `http://localhost:8080/api/products?category=category%20D`
    - Filtrar por un ID que no existe por ejemplo `http://localhost:8080/api/products/353324372ff812d0734`
---
**Usuarios:**
1. Casos de exito:
   - Para obtener todos los usuarios: `http://localhost:8080/api/users`
   - Para filtrar por rol (reemplazar `filtro` por el rol): `http://localhost:8080/api/users?rol=filtro`
   (Puedes usar la siguiente ruta `http://localhost:8080/api/users?role=0`)
   - Para obtener un usuario específico (reemplazar `:uid` por el ID del usuario): `http://localhost:8080/api/users/:uid`(Puedes usar la siguiente ruta `http://localhost:8080/api/users/d25328edbc8d95b73638fcd8`)
   - Para crear se debe usar: `http://localhost:8080/api/users`, y configurar el body, por ejemplo así:
   ```javascript	
   {
    "photo":"testing.png",
    "emal":"testing@gmail.com",
    "password":"testing123",
    "role":"0"
    }
   ```
   - Para actualizar se debe usar: `http://localhost:8080/api/products/:uid`, se debe configurar el body y id del usuario, por ejemplo así:
   ID: Del último elemento creado, en donde al momento de la creación sale el ID del usuario nuevo
   ```javascript	
   {
    "password":"123456789"
    }
   ```
   - Para borrar se debe usar: `http://localhost:8080/api/users/:uid`, tener en cuenta un ID por ejemplo se puede usar el de la creación.
2. Casos de error:
    - Filtrar por un rol que no existe por ejemplo `http://localhost:8080/api/users?role=2`
    - Filtrar por un ID que no existe por ejemplo `http://localhost:8080/api/users/d25328edbc8d95b73638989`
