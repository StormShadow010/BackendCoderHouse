import Manager from "../Manager.mongo.js";
import { Cart } from "../models/cart.model.js";

export const cartsManager = new Manager(Cart);