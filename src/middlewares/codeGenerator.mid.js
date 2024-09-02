import { readByEmailService, updateService } from "../services/auth.service.js";
import crypto from "crypto";
import sendEmailLogin from "../utils/mail/mailingLogin.util.js";

const codeGenerator = async (req, res, next) => {
  //   console.log(req);
  const { email } = req.body;
  let user = await readByEmailService(email);

  if (user) {
    const codeOnline = crypto.randomBytes(3).toString("hex");
    user = await updateService(user._id, {
      code: codeOnline,
    });
    console.log(user);

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
