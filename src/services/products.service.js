import Service from "./CustomService.js";
import { productsManager } from "../data/mongo/managers/ProductsManager.mongo.js";

const productsService = new Service(productsManager);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  paginateService,
} = productsService;
