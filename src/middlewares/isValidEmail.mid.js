import usersRepository from "../repositories/users.rep.js";

export const isValidEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersRepository.readByEmailRepository(email);
    if (user) {
      const error = new Error("Bad auth from register");
      error.statusCode = 401;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
