import {
  login,
  register,
  online,
  signout,
  verifyCode,
  destroyUser,
  onlineCode,
  resetPassword,
  updatePassword,
  verifyCodeLogin,
} from "../../controllers/auth.controller.js";
import codeGenerator from "../../middlewares/codeGenerator.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";

class AuthRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], codeGenerator, login);
    this.read("/", ["USER", "ADMIN", "PREMIUM"], online);
    this.create("/signout", ["USER", "PREMIUM", "ADMIN"], signout);
    this.create("/verify", ["PUBLIC"], verifyCode);
    this.destroy("/:uid", ["ADMIN"], destroyUser);
    this.create(
      "/verifyLogin",
      ["PUBLIC"],
      passportCb("login"),
      verifyCodeLogin
    );
    this.create("/verifyCode", ["PUBLIC"], onlineCode);
    this.create("/password", ["PUBLIC"], resetPassword);
    this.update("/password", ["PUBLIC"], updatePassword);
  }
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
