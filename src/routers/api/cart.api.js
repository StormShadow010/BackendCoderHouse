import { Router, json } from "express";

import { cartsManager } from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router()

//Create a new cart Item
const create = async (req, res, next) => {
    try {
        const data = req.body;
        const newCartItem = await cartsManager.create(data);
        if (newCartItem) {
            return res.json({
                statusCode: 201,
                response: "CREATED NEW ITEM WITH ID: " + newCartItem._id,
                message: "Item added successfully",
            });
        } else {
            const error = new Error("Error adding item to cart");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

//Read <- get all items 
const read = async (req, res, next) => {
    try {
        const { uid } = req.query;
        const cartItems = await cartsManager.read({ user_id: uid });
        if (cartItems.length > 0) {
            return res.json({
                statusCode: 200,
                response: cartItems,
            });
        } else {
            const error = new Error("Not found items");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

//Read <- get items by User_id
async function readOne(req, res, next) {
    try {
        const { cid } = req.params;
        const cartItem = await cartsManager.readOne(cid);

        if (cartItem) {
            return res.json({
                statusCode: 200,
                response: cartItem,
            });
        } else {
            const error = new Error("Not found product with that ID!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

//Update a cart item by User_id
const update = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const data = req.body;
        const updateCartItem = await cartsManager.update(cid, data);
        if (updateCartItem) {
            return res.json({
                statusCode: 200,
                response: updateCartItem,
            });
        } else {
            const error = new Error("Not found item with that ID to update!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}
//Delete a cart item by User_id
const destroy = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const deleteCartItem = await cartsManager.destroy(cid);
        if (deleteCartItem) {
            return res.json({
                statusCode: 200,
                response: deleteCartItem,
            });
        } else {
            const error = new Error("Not found product with that ID to delete!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}


//Create a new cart Item
cartsRouter.post("/", create);
//Read <- get all items 
cartsRouter.get("/", read);
//Read <- get items by User_id
cartsRouter.get("/:cid", readOne);
//Update a cart item by _id Item
cartsRouter.put("/:cid", update);
//Delete a cart item by _id Item
cartsRouter.delete("/:cid", destroy);

export default cartsRouter;