
# Desafío:Servidor de express

En este desafío se ha creado un servidor utilizando Express para administrar productos y usuarios. Se han desarrollado funciones para gestionar los datos de productos y usuarios, lo que permite realizar operaciones de tipo de get, en el caso de los productos obtener todos, filtrarlos por categoría o filtrarlos por ID, y en el caso de los usuarios obtener todos, filtrar por role (0 ó 1) y filtrarlos por ID.  

## Estructura de Datos

Cada producto tiene las siguientes propiedades:
- ***id*** (código identificador de 12 bytes en hexadecimal)
- ***title*** (título)
- ***photo*** (ruta de imagen, dar valores por defecto)
- ***category*** (categoría)
- ***price*** (precio)
- ***stock*** (unidades disponibles)

Cada usuario tiene las siguientes propiedades:
- ***id*** (código identificador de 12 bytes en hexadecimal)
- ***photo*** (ruta de imagen, dar valores por defecto)
- ***email***
- ***password***
- ***role*** (rol de usuario, por defecto cero)

## Clases ProductManager y UserManager

Las clases `ProductManager` y `UserManager` cuentan con los siguientes métodos:

- `init()`: Se utiliza para inicializar el sistema de archivos y asegurarse de que el archivo de datos exista y esté en el formato adecuado.
- `create(data)`: Agrega un nuevo producto\usuario al sistema.
- `read()`: Devuelve una lista de todos los productos\usuarios almacenados.
- `readOne(id)`: Devuelve un producto\usuario específico según su ID.
- `destroy(id)`: Elimina un producto\usuario según su ID.

Estos métodos manejan errores utilizando `try/catch` más que todo se debe evidenciar en la parte de FileSystem.

Es importante aclarar que en fs se creo una carpeta llamada helpers, para cuestión de no repetir código en la lectura y creación del documento, esto se uso tanto para la  clase `ProductManager` como `UserManager`

## Endpoints Implementadas
### Endpoints de Productos:
- `GET /api/products`: Permite obtener todos los productos almacenados. Se puede filtrar por categoría mediante una query. Si el array tiene productos, se devuelve un objeto con un código de estado `200` y la lista de productos en la propiedad "response". Si no hay productos, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.
- `GET /api/products/:pid`: Permite obtener un producto específico por su ID. Si se encuentra el producto, se devuelve un objeto con un código de estado `200` y el producto en la propiedad "response". Si no se encuentra, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.

### Endpoints de Usuarios:
- `GET /api/users`: Permite obtener todos los usuarios almacenados. Se puede filtrar por rol mediante una query. Si el array tiene usuarios, se devuelve un objeto con un código de estado `200` y la lista de usuarios en la propiedad "response". Si no hay usuarios, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.
- `GET /api/users/:uid`: Permite obtener un usuario específico por su ID. Si se encuentra el usuario, se devuelve un objeto con un código de estado `200` y el usuario en la propiedad "response". Si no se encuentra, se devuelve un objeto con un código de estado `404` y un mensaje descriptivo.

# Testing del código

## Requisitos Previos
- Node.js instalado, versión mayor a la 18.

## Pasos para Probar el Servidor
1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias del proyecto utilizando el comando `npm install` ó `npm i` .
3. Iniciar el servidor con el comando `npm run dev` o `node server.js`.
4. Utilizar las siguientes URLs en un navegador web o realizar peticiones HTTP mediante herramientas como Postman:

---
**Productos:**
1. Casos de exito:
   - Para obtener todos los productos: `http://localhost:8080/api/products`
   - Para filtrar por categoria (reemplazar `filtro` por la categoria): `http://localhost:8080/api/products?category=filtro`
   (Puedes usar la siguiente ruta `http://localhost:8080/api/products?category=category%20B`)
   - Para obtener un producto específico (reemplazar `:pid` por el ID del producto): `http://localhost:8080/api/products/:pid`
   (Puedes usar la siguiente ruta `http://localhost:8080/api/products/353324372ff812d0734c22ac`)
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
2. Casos de error:
    - Filtrar por un rol que no existe por ejemplo `http://localhost:8080/api/users?role=2`
    - Filtrar por un ID que no existe por ejemplo `http://localhost:8080/api/users/d25328edbc8d95b73638989`


## Probar los métodos de las clases
Para la parte de los test, se creo una carpeta llamada "test" en donde se creó una archivo tanto para UsersManager como ProductsManager para el caso de memory y fs, en el que se crean los diferentes métodos (create,read,readOne,destroy), en caso de querer probarlo se puede con las siguientes rutas:

### Rutas
Es importante que para probar se maneje un ruta desde la raíz de esta forma
```javascript
node data/testing/memory/testProductsManager.memory.js
node data/testing/memory/testUsersManager.memory.js
node data/testing/fs/testProductsManager.fs.js
node data/testing/fs/testUsersManager.fs.js
```
