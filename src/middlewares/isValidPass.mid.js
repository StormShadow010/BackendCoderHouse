import { usersManager } from "../data/mongo/managers/UsersManager.mongo.js";

export const isValidPass = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await usersManager.readByEmail(email);
        if (user.password === password) {
            return next();
        }
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    } catch (error) {
        return next(error);
    }
}