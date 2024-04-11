import { Router } from "express";
import { productsRouter } from "./products.view.js";
import { usersRouter } from "./users.view.js";
import productsManager from "../../data/fs/ProductsManager.fs.js";


const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);


viewsRouter.get("/", async (req, res, next) => {
    try {
        const products = await productsManager.read()
        return res.render("index", { title: "Home", products })
    } catch (error) {
        return next(error);
    }
})

export default viewsRouter;