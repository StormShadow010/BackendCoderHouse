import { Router } from "express";
import { usersManager } from "../../data/mongo/managers/UsersManager.mongo.js";
import { isValidEmail } from "../../middlewares/isValidEmail.mid.js";
import { isValidData } from "../../middlewares/isValidData.mid.js";
import { isValidUser } from "../../middlewares/isValidUser.mid.js";
import { isValidPass } from "../../middlewares/isValidPass.mid.js";

export const sessionsRouter = Router()

sessionsRouter.post('/register', isValidData, isValidEmail, async (req, res, next) => {
    try {
        const data = req.body;
        await usersManager.create(data);
        return res.json({
            statusCode: 201,
            message: "User created successfully",
        })
    } catch (error) {
        return next(error);
    }
})

sessionsRouter.post("/login", isValidUser, isValidPass, async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersManager.readByEmail(email);
        req.session.email = email;
        req.session.online = true;
        req.session.role = user.role;
        req.session.photo = user.photo;
        req.session.user_id = user._id;
        return res.json({
            statusCode: 200,
            message: "Login successful",
        })
    } catch (error) {
        return next(error);
    }
})

sessionsRouter.get("/", async (req, res, next) => {
    try {
        if (req.session.online) {
            return res.json({
                statusCode: 200,
                message: "You are online",
                email: req.session.email,
                role: req.session.role,
                photo: req.session.photo,
                user_id: req.session.user_id
            })
        }
        return res.json({
            statusCode: 401,
            message: "You are offline"
        })

    } catch (error) {
        return next(error);
    }
})

sessionsRouter.post("/signout", (req, res, next) => {
    try {
        req.session.destroy();
        return res.json({
            statusCode: 200,
            message: "Signed out!",
            session: req.session
        });
    } catch (error) {
        return next(error);
    }
});