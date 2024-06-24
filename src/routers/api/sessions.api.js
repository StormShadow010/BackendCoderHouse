import passport from "../../middlewares/passport.mid.js"; //Dejar
import passportCb from "../../middlewares/passportCb.mid.js";
import { isValidData } from "../../middlewares/isValidData.mid.js";
import CustomRouter from "../CustomRouter.js";
import {
  create,
  login,
  online,
  signout,
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      isValidData,
      passportCb("register"),
      create
    );
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/", ["USER", "ADMIN"], passportCb("jwt"), online);
    this.create("/signout", ["USER", "ADMIN"], passportCb("jwt"), signout);
  }
}

export const sessionsRouter = new SessionsRouter().getRouter();
