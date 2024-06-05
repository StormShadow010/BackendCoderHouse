import { Router } from "express";
// import usersManager from "../../data/fs/UsersManager.fs.js";
import { usersManager } from "../../data/mongo/managers/indexManager.mongo.js";
import { checkMandatoryFieldsUsers } from "../../middlewares/checkMandatoryFieldsUsers.mid.js";
import CustomRouter from "../CustomRouter.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], checkMandatoryFieldsUsers, create);
    this.read("/", ["ADMIN"], read);
    this.read("/:uid", ["USER", "ADMIN"], readOne);
    this.update("/:uid", ["ADMIN"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
  }
}

//Create a new user
const create = async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await usersManager.create(data);
    return newUser
      ? res.message201("")
      : res.error404("User created successfully");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all users or get for role
const read = async (req, res, next) => {
  try {
    const { role } = req.query;
    const users = await usersManager.read(role);
    return users.length > 0
      ? res.response200(users)
      : res.error404("Not found role/data!");
  } catch (error) {
    return next(error);
  }
};

//Read <- get user by ID
async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const user = await usersManager.readOne(uid);
    return user
      ? res.response200(user)
      : res.error404("Not found user with that ID!");
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
    return updateUser
      ? res.response200(updateUser)
      : res.error404("Not found user with that ID to update!");
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deleteUser = await usersManager.destroy(uid);
    return deleteUser
      ? res.response200(deleteUser)
      : res.error404("Not found user with that ID to delete!");
  } catch (error) {
    return next(error);
  }
};

export const usersRouter = new UsersRouter().getRouter();
