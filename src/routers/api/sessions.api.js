import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { isValidData } from "../../middlewares/isValidData.mid.js";

export const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  isValidData,
  passportCb("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "User created successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post("/login", passportCb("login"), async (req, res, next) => {
  try {
    return res.cookie("token", req.user.token, { signedCookie: true }).json({
      statusCode: 200,
      message: "Login successful",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/", passportCb("jwt"), async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.online) {
      return res.json({
        statusCode: 200,
        message: "You are online",
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
        user_id: req.user._id,
      });
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", passportCb("jwt"), (req, res, next) => {
  try {
    if (req.user.email) {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out!",
      });
    }
    const error = new Error("Invalid credentials from signout");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});
