import {
  login,
  register,
  online,
  signout,
} from "../../controllers/auth.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";

class AuthRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/", ["USER", "ADMIN"], passportCb("jwt"), online);
    this.create("/signout", ["USER", "ADMIN"], passportCb("jwt"), signout);
  }
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
