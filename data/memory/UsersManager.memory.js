const crypto = require('crypto'); //Create id random with hexa
class UsersManager {
    static #users = [];
    create(data) {
        try {
            const { photo, email, password, role } = data;
            if (!email || !password || !role) {
                throw new Error("All fields are required!!")
            }
            //Create object for new user
            const newUser = {
                id: crypto.randomBytes(12).toString('hex'),
                photo: photo || "https://unsplash.com",
                email,
                password,
                role,
            }
            //Add new user to array uers
            UsersManager.#users.push(newUser);
            console.log("User added:", newUser);
        } catch (error) {
            console.log(error);
        }
    }

    read = () => {
        try {
            return UsersManager.#users;
        } catch (error) {
            console.log(error);
        }
    }

    readOne = (id) => {
        try {
            const productById = UsersManager.#users.find(product => product.id === id);
            if (!productById) {
                throw new Error("User not found!!");
            } else {
                return productById;
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy = (id) => {
        try {
            const findProductExists = this.readOne(id)
            UsersManager.#users = UsersManager.#users.filter(product => product.id !== findProductExists.id);
            console.log("User deleted:", findProductExists);
        } catch (error) {
            console.log(error);
        }
    }

}

const userNew = new UsersManager();

//Creating a new user 1
userNew.create({
    photo: 'https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E',
    email: 'admin@example.com',
    password: '123456789',
    role: 'admin'
})
//Creating a new user 2 with photo path
userNew.create({
    email: 'employee1@example.com',
    password: 'carlitos45',
    role: 'employee'
})
//Creating a new user 3
userNew.create({
    photo: 'https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E',
    email: 'admin2@example.com',
    password: '987654321',
    role: 'admin'
})
//Creating a new user 4
userNew.create({
    photo: 'https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E',
    email: 'pedritocuenta@example.com',
    password: 'camion2000',
    role: 'user'
})

console.log("Show all users")
console.log(userNew.read())
console.log("Find a user by ID, in this case ID=1")
console.log("Found:!!!", userNew.readOne(1))
console.log("Deleting a product by ID, in this case ID=2")
userNew.destroy(2)
console.log("Show all users")
console.log(userNew.read())

console.log("Test : Creating a new user 5 without email parameter")
userNew.create({
    photo: 'https://unsplash.com/es/fotos/fotografia-de-enfoque-superficial-de-mujer-al-aire-libre-durante-el-dia-rDEOVtE7vOs',
    // email: 'employee1@example.com',
    password: 'estoclastica45',
    role: 'employee'
})

console.log("Show all users")
console.log(userNew.read())