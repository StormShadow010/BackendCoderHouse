const UsersManager = require("../UsersManager")

const testUsersManager = () => {
    const userNew = new UsersManager();

    console.log("Creating a new user 1")
    userNew.create({
        photo: 'https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E',
        email: 'admin@example.com',
        password: '123456789',
        role: 'admin'
    })

    console.log("Creating a new user 2")
    userNew.create({
        photo: 'https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E',
        email: 'admin2@example.com',
        password: '987654321',
        role: 'admin'
    })

    console.log("Creating a new user 3 without user role");
    userNew.create({
        photo: 'https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E',
        email: 'employee1@example.com',
        password: 'carlitos45',
        // role: 'employee'
    })

    console.log("Show all users")
    console.log(userNew.read())

    console.log("Creating a new user 4 photo,an error is expected since it is a required field");
    userNew.create({
        email: 'employe4@example.com',
        password: 'estupid789',
        role: 'employee'
    })

}

testUsersManager()