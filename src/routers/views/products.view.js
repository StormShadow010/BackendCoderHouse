import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";

export const productsRouter = Router()

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await productsManager.read()
        return res.render("products", { products })
    } catch (error) {
        return next(error);
    }
})