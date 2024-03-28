import crypto from "crypto";

class ProductsManager {
  static #products = [];
  create(data) {
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
      //Add new product to array products
      ProductsManager.#products.push(newProduct);
      console.log("Product added:", newProduct);
    } catch (error) {
      console.log(error);
    }
  }

  read = () => {
    try {
      return ProductsManager.#products;
    } catch (error) {
      console.log(error);
    }
  };

  readOne = (id) => {
    try {
      const productById = ProductsManager.#products.find(
        (product) => product.id === id
      );
      if (!productById) {
        throw new Error("Product not found!!");
      } else {
        return productById;
      }
    } catch (error) {
      console.log(error);
    }
  };

  destroy = (id) => {
    try {
      const findProductExists = this.readOne(id);
      ProductsManager.#products = ProductsManager.#products.filter(
        (product) => product.id !== findProductExists.id
      );
      console.log("Product deleted:", findProductExists);
    } catch (error) {
      console.log(error);
    }
  };
};

const productsManager = new ProductsManager()
export default productsManager