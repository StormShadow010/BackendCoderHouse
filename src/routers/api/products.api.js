import { productsManager } from "../../data/mongo/managers/indexManager.mongo.js";
import { checkMandatoryFieldsProducts } from "../../middlewares/checkMandatoryFieldsProducts.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { isValidAdmin } from "../../middlewares/isValidAdmin.mid.js";
import CustomRouter from "../CustomRouter.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN"],
      passportCb("jwt"),
      isValidAdmin,
      checkMandatoryFieldsProducts,
      create
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginateRead);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

//Create a new product
const create = async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await productsManager.create(data);
    return newProduct
      ? res.message201("Product created successfully")
      : res.error404("Error creating a new product");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all products or get for category
const read = async (req, res, next) => {
  try {
    const { category } = req.query;
    const products = await productsManager.read({ category: category });
    return products.length > 0
      ? res.response200(products)
      : res.error404("Not found data!");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all items by Paginate
const paginateRead = async (req, res, next) => {
  try {
    const filter = {};
    const opts = { page: 1, limit: 10, lean: true, sort: { title: 1 } };
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" }; // case-insensitive search
    }
    const all = await productsManager.paginate({ filter, opts });
    const info = {
      totalDocs: all.totalDocs,
      page: all.page,
      totalPages: all.totalPages,
      limit: all.limit,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
    };
    return res.paginate(all.docs, info);
  } catch (error) {
    return next(error);
  }
};
//Read <- get product by ID
const readOne = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOne(pid);
    return product
      ? res.response200(product)
      : res.error404("Not found product with that ID!");
  } catch (error) {
    return next(error);
  }
};

//Update a product
const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const updateProduct = await productsManager.update(pid, data);
    return updateProduct
      ? res.response200(updateProduct)
      : res.error404("Not found product with that ID to update!");
  } catch (error) {
    return next(error);
  }
};

//Delete a product
const destroy = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await productsManager.destroy(pid);
    return deleteProduct
      ? res.response200(deleteProduct)
      : res.error404("Not found product with that ID to delete!");
  } catch (error) {
    return next(error);
  }
};

export const productsRouter = new ProductsRouter().getRouter();
