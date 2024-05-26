import { createHash } from "../utils/hashPassword/hashPassword.js";

export const createHashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashPassword = createHash(password);
    req.body.password = hashPassword;
    return next();
  } catch (error) {
    return next(error);
  }
};
