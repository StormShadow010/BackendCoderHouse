import {
  create,
  destroy,
  destroyAll,
  read,
  readOne,
  update,
} from "../../controllers/carts.controller.js";
import CustomRouter from "../CustomRouter.js";

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER"], create);
    this.read("/", ["USER"], read);
    this.destroy("/all/:uid", ["USER"], destroyAll);
    this.update("/:cid", ["USER"], update);
    this.destroy("/:cid", ["USER"], destroy);
    this.read("/:cid", ["USER"], readOne);
  }
}

export const cartsRouter = new CartsRouter().getRouter();
