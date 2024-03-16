# Desasío:Manejo de archivos

Este desafío desarrolla un sistema para administrar productos y usuarios usando Node.js junto con el módulo FileSystem (fs) de manera asincrónica y la memoria de forma sincróna. Se emplean las características de async/await y promesas para asegurar un proceso de ejecución eficiente y que no bloquee otras operaciones, como sucede en el caso de memoria.

## Estructura de Datos

Cada producto tiene las siguientes propiedades:

- **_id_** (código identificador de 12 bytes en hexadecimal)
- **_title_** (título)
- **_photo_** (ruta de imagen)
- **_category_** (categoría)
- **_price_** (precio)
- **_stock_** (unidades disponibles)

Cada usuario tiene las siguientes propiedades:

- **_id_** (código identificador de 12 bytes en hexadecimal)
- **_photo_** (ruta de imagen)
- **_email_**
- **_password_**
- **_role_** (rol de usuario)

## Clases ProductManager y UserManager

Las clases `ProductManager` y `UserManager` cuentan con los siguientes métodos:

- `init()`: Se utiliza para inicializar el sistema de archivos y asegurarse de que el archivo de datos exista y esté en el formato adecuado.
- `create(data)`: Agrega un nuevo producto\usuario al sistema.
- `read()`: Devuelve una lista de todos los productos\usuarios almacenados.
- `readOne(id)`: Devuelve un producto\usuario específico según su ID.
- `destroy(id)`: Elimina un producto\usuario según su ID.

Estos métodos manejan errores utilizando `try/catch` más que todo se debe evidenciar en la parte de FileSystem.

Es importante aclarar que en fs se creo una carpeta llamada helpers, para cuestión de no repetir código en la lectura y creación del documento, esto se uso tantyo para la clase `ProductManager` como `UserManager`

# Testing del código

Para la parte de los test, se creo una carpeta llamada "test" en donde se creó una archivo tanto para UsersManager como ProductsManager, en el que por medio de la exportanción del modulo de la clase, se crea una instancia y se hacen los respectivos casos de prueba.

## Rutas

Es importante que para probar se maneje un ruta desde la raíz de esta forma

```javascript
node test/memory/testProductsManager.memory.js
node test/memory/testUsersManager.memory.js
node test/fs/testProductsManager.fs.js
node test/fs/testUsersManager.fs.js
```

### Testing Class ProductManager - Memory

Para este testing se creo el siguiente código, en el que:

- Se crean productos
- Se muestra la creación de todos
- Se busca por ID
- Se destruye por ID
- Se muestran los datos que quedarón después de la eliminación
- Casos de errores

### Testing Class UserManager - Memory

Para este testing se creo el siguiente código, en el que:

- Se crean usuarios
- Se muestra la creación de todos
- Se busca por ID
- Se destruye por ID
- Se muestran los datos que quedarón después de la eliminación
- Casos de errores

### Testing Class ProductManager - FS

Para este testing se creo el siguiente código, en el que:

- Se pasa por la función init primero al crear la instancia
- Se lee la data del archivo json `products.js`
- Se crean los productos con un For para que el código no sea tan extenso
- Se muestra la creación de todos
- Se busca por ID
- Se destruye por ID
- Se muestran los datos que quedarón después de la eliminación
- Casos de errores

### Testing Class UserManager - FS

Para este testing se creo el siguiente código, en el que:

- Se pasa por la función init primero al crear la instancia
- Se lee la data del archivo json `users.js`
- Se crean los usuarios
- Se muestra la creación de todos
- Se busca por ID
- Se destruye por ID
- Se muestran los datos que quedarón después de la eliminación
- Casos de errores
