import { createPayment } from "../../controllers/checkout.controller.js";
import CustomRouter from "../CustomRouter.js";

class CheckoutRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREMIUM"], createPayment);
  }
}

export const checkoutRouter = new CheckoutRouter().getRouter();
