const fs = require("fs");
const crypto = require("crypto");
const { readFile, createFileNP, createFile } = require("./helpers/manageFiles");

module.exports = class UsersManager {
  constructor() {
    this.path = "./data/fs/files/users.json";
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
};
