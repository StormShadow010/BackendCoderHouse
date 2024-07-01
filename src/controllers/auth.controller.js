import {
  destroyService,
  readByEmailService,
  updateService,
} from "../services/auth.service.js";
import crypto from "crypto";
//Register user
export const register = async (req, res, next) => {
  try {
    return res.message201("User created successfully");
  } catch (error) {
    return next(error);
  }
};

//Login user
export const login = (req, res, next) => {
  try {
    return res
      .cookie("token", req.token, { signedCookie: true })
      .message200("Login successful");
  } catch (error) {
    return next(error);
  }
};

//Online User
export const online = async (req, res, next) => {
  try {
    return req.cookies.token
      ? res.response200(req.user)
      : res.error404("Invalid credentials from signout!");
  } catch (error) {
    return next(error);
  }
};

//Online User Code
export const onlineCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const checkUSer = await readByEmailService(email);
    const verifyCode = checkUSer.code === code;
    if (verifyCode) {
      await updateService(checkUSer._id, {
        code: crypto.randomBytes(3).toString("hex"),
      });
      return res.message200("Verified user!");
    } else {
      return res.error400("Invalid credentials!");
    }
  } catch (error) {
    return next(error);
  }
};

//Log out user
export const signout = async (req, res, next) => {
  try {
    return req.cookies.token
      ? res.clearCookie("token").message200("Signed out!")
      : res.error404("Invalid credentials from signout!");
  } catch (error) {
    return next(error);
  }
};

//Verify code for register
export const verifyCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const checkUSer = await readByEmailService(email);
    const verifyCode = checkUSer.code === code;
    if (verifyCode) {
      await updateService(checkUSer._id, { verify: verifyCode });
      return res.message200("Created and verified User!");
    } else {
      return res.error400("Invalid credentials!");
    }
  } catch (error) {
    return next(error);
  }
};

//Destroy user (not verifyCode)
export const destroyUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkUSer = await readByEmailService(email);
    await destroyService(checkUSer._id);
    return res.message200("User deleted due to code non-confirmation!");
  } catch (error) {
    return next(error);
  }
};
