import { readByEmailService, updateService } from "../services/auth.service.js";
import crypto from "crypto";
import sendEmailLogin from "../utils/mail/mailingLogin.util.js";
import { verifyPassword } from "../utils/hashPassword/hashPassword.js";

const codeGenerator = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await readByEmailService(email);

  const verify = verifyPassword(password, user.password);
  if (!verify) {
    const error = new Error("Missing credentials!");
    error.statusCode = 401;
    throw error;
  }
  if (user) {
    const codeOnline = crypto.randomBytes(3).toString("hex");
    user = await updateService(user._id, {
      code: codeOnline,
    });

    await sendEmailLogin({
      email: user.email,
      name: user.username,
      code: user.code,
    });
    return next();
  } else {
    const error = new Error("Missing credentials!");
    error.statusCode = 401;
    throw error;
  }
};

export default codeGenerator;
