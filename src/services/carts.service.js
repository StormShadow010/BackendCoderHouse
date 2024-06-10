import { cartsManager } from "../data/mongo/managers/CartsManager.mongo.js";
import Service from "./CustomService.js";

const cartsService = new Service(cartsManager);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  destroyAllService,
} = cartsService;
