import Manager from "../Manager.mongo.js";
import { User } from "../models/user.model.js";

export const usersManager = new Manager(User);