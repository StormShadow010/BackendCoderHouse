import { usersManager } from "../data/mongo/managers/UsersManager.mongo.js";

export const isValidUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersManager.readByEmail(email);
        if (!user) {
            const error = new Error("Bad auth from login!");
            error.statusCode = 401;
            throw error;
        }
        return next();
    } catch (error) {
        return next(error);
    }
}