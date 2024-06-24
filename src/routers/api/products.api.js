import { checkMandatoryFieldsProducts } from "../../middlewares/checkMandatoryFieldsProducts.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { isValidAdmin } from "../../middlewares/isValidAdmin.mid.js";
import CustomRouter from "../CustomRouter.js";
import {
  create,
  destroy,
  paginateRead,
  read,
  readOne,
  update,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN"],
      passportCb("jwt"),
      isValidAdmin,
      checkMandatoryFieldsProducts,
      create
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginateRead);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

export const productsRouter = new ProductsRouter().getRouter();
