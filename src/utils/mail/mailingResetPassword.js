import { createTransport } from "nodemailer";
import __dirname from "../../../utils.js";
import variablesEnviroment from "../env/env.util.js";

const resetPasswordMail = async (data) => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: variablesEnviroment.GOOGLE_EMAIL,
        pass: variablesEnviroment.GOOGLE_PASSWORD,
      },
    });
    await transport.verify();
    await transport.sendMail({
      from: `CODER STORE STORM <${variablesEnviroment.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `Verification code! (Reset Password)`,
      html: `
      <h1>Verification code! (Reset Password)<h1>
      <p>Code: ${data.code}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
};

export default resetPasswordMail;
