import CustomRouter from "../CustomRouter.js";
import { usersRouter } from "./users.api.js";
import { productsRouter } from "./products.api.js";
import { cartsRouter } from "./cart.api.js";
import { sessionsRouter } from "./sessions.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/sessions", sessionsRouter);
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
