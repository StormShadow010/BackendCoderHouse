
# Clases con ECMAScript y ECMAScript avanzado - Desafío

En esta entrega se realizó un desafío en el que se tenían que programar una clase “ProductsManager”  y una clase “UsersManager”.

Para cada una se creó una variable privada que guarda el arreglo de todos los productos/usuarios. 

Además se crearon los metodos de create(data) y read para cada clase, en donde el primero a partir de la información suministrada creaba un nuevo objeto en el arreglo y en el segundo metodo se traía el arreglo para mostrarlo con la información que contiene.

## UsersManager 
Para esta clase se valido en la parte de create los espacios de photo, email y password son obligatorios de lo contrario saldría el siguiente error ->  throw new Error("All fields are required!!!!!") y en el caso de rol, se valido que en caso de no ser enviado por defecto el rol se asume como "user"

## ProductsManager
Para esta clase se valido en la parte de create los espacios de title, photo, category, price y stock son obligatorios de lo contrario saldría el siguiente error -> throw new Error("All fields are required!!")

# Testing

Para la parte de los test, se creo una carpeta llamada "test" en donde se creó una archivo tanto para UsersManager como ProductsManager, en el que por medio de la exportanción del modulo de la clase, se crea una instancia y se hacen los respectivos casos de prueba.

Por lo que para probar cada uno de estos se debe acceder a la carpeta test.

## UsersManager 
Para esta clase el archivo de test es testUsersManager.js, en el que se programo lo siguiente:
1. La creación de los dos usuarios y uno tercero sin role teniendo en cuenta lo anterior para validar esto.
2. Se muestran los usuarios creados.
3. Crear un usuario sin el path de la 4, demostrando el error que esto tendría

## ProductsManager
Para esta clase el archivo de test es testProductsManager.js, en el que se programo lo siguiente:
1. La creación de los cinco productos.
2. Se muestran los productos creados.
3. Crear un producto sin el parametro del stock, demostrando el error que esto tendría
4. Crear un producto sin el parametro de la categoría, demostrando el error que esto tendría


