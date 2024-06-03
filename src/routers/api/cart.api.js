import { cartsManager } from "../../data/mongo/managers/CartsManager.mongo.js";
import CustomRouter from "../CustomRouter.js";

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER"], create);
    this.read("/", ["USER"], read);
    this.read("/:cid", ["USER"], readOne);
    this.update("/:cid", ["USER"], update);
    this.destroy("/:cid", ["USER"], destroy);
    this.destroy("/all/:uid", ["USER"], destroyAll);
  }
}

//Create a new cart Item (user_id)
const create = async (req, res, next) => {
  try {
    const data = req.body;
    const newCartItem = await cartsManager.create(data);
    return newCartItem
      ? res.message201("Item added successfully")
      : res.error404("Error adding item to cart");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all items by user_id
const read = async (req, res, next) => {
  try {
    const { uid } = req.query;
    const cartItems = await cartsManager.read({ user_id: uid });
    return cartItems.length > 0
      ? res.response200(cartItems)
      : res.error404("Not found items");
  } catch (error) {
    return next(error);
  }
};

//Read individual cart item
const readOne = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartItem = await cartsManager.readOne(cid);
    return cartItem
      ? res.response200(cartItem)
      : res.error404("Not found product with that ID!");
  } catch (error) {
    return next(error);
  }
};

//Update a cart item
const update = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const data = req.body;
    const updateCartItem = await cartsManager.update(cid, data);
    return updateCartItem
      ? res.response200(updateCartItem)
      : res.error404("Not found item with that ID to update!");
  } catch (error) {
    return next(error);
  }
};

//Delete a cart item
const destroy = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const deleteCartItem = await cartsManager.destroy(cid);
    return deleteCartItem
      ? res.message200("Item deleted successfully")
      : res.error404("Error deleting item");
  } catch (error) {
    return next(error);
  }
};

//Delete all cart items
const destroyAll = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deleteCartItem = await cartsManager.destroyMany(uid);
    return deleteCartItem
      ? res.message200("Empty shopping cart")
      : res.error404("Error deleting shopping cart");
  } catch (error) {
    return next(error);
  }
};

export const cartsRouter = new CartsRouter().getRouter();
