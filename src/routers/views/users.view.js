import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js";

export const usersRouter = Router()


usersRouter.get("/register", async (req, res, next) => {
    try {
        return res.render("userRegister")
    } catch (error) {
        return next(error);
    }
})

usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const user = await usersManager.readOne(req.params.uid)
        // const products = await productsManager.read()
        return res.render("userInfo", { user })
    } catch (error) {
        return next(error);
    }
})


