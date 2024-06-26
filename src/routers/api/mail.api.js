import { register } from "../../controllers/mail.controller.js";
import CustomRouter from "../CustomRouter.js";

class MailingRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], register);
  }
}

const mailingRouter = new MailingRouter().getRouter();
export default mailingRouter;
