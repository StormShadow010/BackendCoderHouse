import passport from "../../middlewares/passport.mid.js"; //Dejar
import passportCb from "../../middlewares/passportCb.mid.js";
import { isValidData } from "../../middlewares/isValidData.mid.js";
import CustomRouter from "../CustomRouter.js";

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

//Create a new user
const create = async (req, res, next) => {
  try {
    return res.message201("User created successfully");
  } catch (error) {
    return next(error);
  }
};

//login user
const login = (req, res, next) => {
  try {
    return res
      .cookie("token", req.user.token, { signedCookie: true })
      .message200("Login successful");
  } catch (error) {
    return next(error);
  }
};

//Online User
const online = async (req, res, next) => {
  try {
    if (req.user.online) {
      const user_online = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
        user_id: req.user._id,
      };
      res.response200(user_online);
    }
  } catch (error) {
    return next(error);
  }
};

//login user
const signout = async (req, res, next) => {
  try {
    return req.user.online
      ? res.clearCookie("token").message200("Signed out!")
      : res.error404("Invalid credentials from signout!");
  } catch (error) {
    return next(error);
  }
};

export const sessionsRouter = new SessionsRouter().getRouter();
