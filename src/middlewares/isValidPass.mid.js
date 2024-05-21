import { usersManager } from "../data/mongo/managers/UsersManager.mongo.js";
import { verifyPassword } from "../utils/hashPassword/hashPassword.js";

export const isValidPass = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersManager.readByEmail(email);
    const verify = verifyPassword(password, user.password);
    if (verify) {
      return next();
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
};
