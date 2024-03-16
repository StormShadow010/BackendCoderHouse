const fs = require("fs");
const crypto = require("crypto");
const { readFile, createFileNP, createFile } = require("./helpers/manageFiles");

module.exports = class ProductsManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }

  init = () => {
    const exists = fs.existsSync(this.path);
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
      const { title, photo, category, price, stock } = data;
      if (!title || !category || !price || !stock) {
        throw new Error("All fields are required!!");
      }
      //Create object for new product
      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title,
        photo: photo || "https://unsplash.com",
        category,
        price,
        stock,
      };
      let fileTotal = await readFile(this.path);
      await createFileNP(this.path, fileTotal, newProduct);
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
        throw new Error("Product not found!!");
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
        throw new Error("Product not found!!");
      } else {
        const findProductExists = await this.readOne(id);
        console.log("Product deleted:", findProductExists);
        await createFile(this.path, restFile);
        return restFile;
      }
    } catch (error) {
      console.log(error);
    }
  };
};
