const fs = require("fs");
const crypto = require("crypto");
const { readFile, createFileNP, createFile } = require("./helpers/manageFiles");

class UsersManager {
  constructor() {
    this.path = "./fs/files/users.json";
    this.init();
  }

  init = () => {
    const exists = fs.existsSync(this.path);
    console.log(exists);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("File created");
    } else {
      console.log("File exists");
    }
  };

  create = async (data) => {
    try {
      const { photo, email, password, role } = data;
      if (!email || !password || !role) {
        throw new Error("All fields are required!!");
      }
      //Create object for new User
      const newUser = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: photo || "https://unsplash.com",
        email,
        password,
        role,
      };
      let fileTotal = await readFile(this.path);
      await createFileNP(this.path, fileTotal, newUser);
    } catch (error) {
      console.log(error);
    }
  };

  read = async () => {
    try {
      let fileTotal = await readFile(this.path);
      return fileTotal;
    } catch (error) {
      console.log(error);
    }
  };

  readOne = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let itemId = fileTotal.find((item) => item.id === id);
      if (!itemId) {
        throw new Error("User not found!!");
      } else {
        return itemId;
      }
    } catch (error) {
      console.log(error);
    }
  };

  destroy = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let restFile = fileTotal.filter((product) => product.id !== id);

      if (!restFile) {
        throw new Error("User not found!!");
      } else {
        const findProductExists = await this.readOne(id);
        console.log("User deleted:", findProductExists);
        await createFile(this.path, restFile);
        return restFile;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const testUsersManager = async () => {
  const users = new UsersManager();

  console.log("Data from file:");
  let fileTotal = await users.read();
  console.log(fileTotal);

  console.log("Creation of the users");
  await users.create({
    photo: "default-image-url",
    email: "user1@example.com",
    password: "<PASSWORD>",
    role: "admin",
  });
  await users.create({
    photo: "default-image-url",
    email: "user2@example.com",
    password: "<PASSWORD>",
    role: "admin",
  });
  await users.create({
    photo: "default-image-url",
    email: "user3@example.com",
    password: "<PASSWORD>",
    role: "employee",
  });
  console.log("User 4 without photo parameter");
  await users.create({
    email: "user4@example.com",
    password: "<PASSWORD>",
    role: "employee",
  });

  console.log("Data from file:");
  fileTotal = await users.read();
  console.log(fileTotal);

  console.log(
    "Search a user by id,in this case, the product of position 3 will be extracted from the read method."
  );
  console.log("User found:", await users.readOne(fileTotal[2].id));
  console.log(
    "Delete a user by id,in this case, the product of position 5 will be extracted from the read method."
  );
  const remaining_products = await users.destroy(fileTotal[3].id);
  console.log("Remaining users:", remaining_products);

  //Expected errors
  console.log(
    "Search for a user by an ID that does not exist, in this case 2025"
  );
  console.log(await users.readOne(2025));
  console.log("Destroy a user by an ID that does not exist, in this case 2025");
  console.log(await users.destroy(2025));
};

testUsersManager();
