const crypto = require("crypto"); //Create id random with hexa

module.exports = class UsersManager {
  static #users = [];
  create(data) {
    try {
      const { photo, email, password, role } = data;
      if (!email || !password || !role) {
        throw new Error("All fields are required!!");
      }
      //Create object for new user
      const newUser = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: photo || "https://unsplash.com",
        email,
        password,
        role,
      };
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
  };

  readOne = (id) => {
    try {
      const productById = UsersManager.#users.find(
        (product) => product.id === id
      );
      if (!productById) {
        throw new Error("User not found!!");
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
      UsersManager.#users = UsersManager.#users.filter(
        (product) => product.id !== findProductExists.id
      );
      console.log("User deleted:", findProductExists);
    } catch (error) {
      console.log(error);
    }
  };
};
