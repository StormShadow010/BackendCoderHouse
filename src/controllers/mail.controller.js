import sendEmail from "../utils/mail/mailing.util.js";

export const register = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    await sendEmail({ email, name });
    return res.message200("Email Sent!");
  } catch (error) {
    return next(error);
  }
};
