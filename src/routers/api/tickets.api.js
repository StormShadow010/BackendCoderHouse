import CustomRouter from "../CustomRouter.js";
import { create, sumTotal } from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["USER"], sumTotal);
    this.create("/:uid", ["USER"], create);
  }
}

export const ticketsRouter = new TicketsRouter().getRouter();
