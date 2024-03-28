import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js";

const usersRouter = Router()

//Create a new user
const create = async (req, res, next) => {
    try {
        const data = req.body;
        const newUser = await usersManager.create(data);
        if (newUser) {
            return res.json({
                statusCode: 201,
                response: "CREATED NEW USER WITH ID: " + newUser.id,
                message: "User created successfully",
            });
        } else {
            const error = new Error("Error creating user");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

//Read <- get all users or get for role
const read = async (req, res, next) => {
    try {
        const { category } = req.query;
        const users = await usersManager.read(category);
        if (users.length > 0) {
            return res.json({
                statusCode: 200,
                response: users,
            });
        } else {
            const error = new Error("Not found role/data!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}
//Read <- get user by ID
async function readOne(req, res, next) {
    try {
        const { uid } = req.params;
        const user = await usersManager.readOne(uid);
        if (user) {
            return res.json({
                statusCode: 200,
                response: user,
            });
        } else {
            const error = new Error("Not found user with that ID!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

//Update a user
const update = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const updateUser = await usersManager.update(uid, data);
        if (updateUser) {
            return res.json({
                statusCode: 200,
                response: updateUser,
            });
        } else {
            const error = new Error("Not found user with that ID to update!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const deleteUser = await usersManager.destroy(uid);
        if (deleteUser) {
            return res.json({
                statusCode: 200,
                response: deleteUser,
            });
        } else {
            const error = new Error("Not found user with that ID to delete!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

//Create a new user
usersRouter.post("/", create);
//Read <- get all users or get for role
usersRouter.get("/", read);
//Read <- get user by ID
usersRouter.get("/:uid", readOne);
//Update a user
usersRouter.put("/:uid", update);
//Delete a user
usersRouter.delete("/:uid", destroy);


export default usersRouter