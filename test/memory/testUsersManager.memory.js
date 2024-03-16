const UsersManager = require("../../data/memory/UsersManager.memory");

const userNew = new UsersManager();

//Creating a new user 1
userNew.create({
  photo:
    "https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E",
  email: "admin@example.com",
  password: "123456789",
  role: "admin",
});
//Creating a new user 2 with photo path
userNew.create({
  email: "employee1@example.com",
  password: "carlitos45",
  role: "employee",
});
//Creating a new user 3
userNew.create({
  photo:
    "https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E",
  email: "admin2@example.com",
  password: "987654321",
  role: "admin",
});
//Creating a new user 4
userNew.create({
  photo:
    "https://unsplash.com/es/fotos/silueta-de-la-ilustracion-del-hombre-2LowviVHZ-E",
  email: "pedritocuenta@example.com",
  password: "camion2000",
  role: "user",
});

console.log("Show all users");
console.log(userNew.read());
console.log("Find a user by ID, in this case ID=1");
console.log("Found:!!!", userNew.readOne(1));
console.log("Deleting a product by ID, in this case ID=2");
userNew.destroy(2);
console.log("Show all users");
console.log(userNew.read());

console.log(
  "Test : Creating a new user 5 without email parameter, an error is expected"
);

userNew.create({
  photo:
    "https://unsplash.com/es/fotos/fotografia-de-enfoque-superficial-de-mujer-al-aire-libre-durante-el-dia-rDEOVtE7vOs",
  // email: 'employee1@example.com',
  password: "estoclastica45",
  role: "employee",
});

console.log("Show all users");
console.log(userNew.read());
