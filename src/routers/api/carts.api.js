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
    this.create("/", ["USER", "PREMIUM"], create);
    this.read("/", ["USER", "PREMIUM", "ADMIN"], read);
    this.destroy("/all/:uid", ["USER", "PREMIUM", "ADMIN"], destroyAll);
    this.update("/:cid", ["USER", "PREMIUM", "ADMIN"], update);
    this.destroy("/:cid", ["USER", "PREMIUM", "ADMIN"], destroy);
    this.read("/:cid", ["USER", "ADMIN"], readOne);
  }
}

export const cartsRouter = new CartsRouter().getRouter();
