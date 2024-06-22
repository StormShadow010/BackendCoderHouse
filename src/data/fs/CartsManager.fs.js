import fs from "fs";
import { createFile, createFileNP, readFile } from "./helpers/manageFiles.js";

class CartsManager {
  constructor() {
    this.path = "./src/data/fs/files/carts.json";
    this.init();
  }
  init = () => {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
    }
  };

  create = async (data) => {
    try {
      let fileTotal = await readFile(this.path);
      await createFileNP(this.path, fileTotal, data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ user_id }) => {
    try {
      let fileTotal = await readFile(this.path);
      const filteredData = fileTotal.filter((item) => item.user_id === user_id);
      console.log(filteredData);
      return filteredData;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let itemId = fileTotal.find((item) => item._id === id);
      return itemId;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      let fileTotal = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const cart = fileTotal.find((carts) => carts._id === id);
      if (cart) {
        Object.assign(cart, data);
        await createFile(this.path, fileTotal);
      }
      return cart;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let cartDelete = await this.readOne(id);

      if (cartDelete) {
        console.log("Item cart deleted:", cartDelete);
        let cartsFilter = fileTotal.filter((product) => product._id !== id);
        await createFile(this.path, cartsFilter);
      }
      return cartDelete;
    } catch (error) {
      throw error;
    }
  };
}

const cartsManager = new CartsManager();
export default cartsManager;
