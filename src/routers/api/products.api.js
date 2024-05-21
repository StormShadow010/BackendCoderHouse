import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
import { productsManager } from "../../data/mongo/managers/indexManager.mongo.js";
import { checkMandatoryFieldsProducts } from "../../middlewares/checkMandatoryFieldsProducts.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { isValidAdmin } from "../../middlewares/isValidAdmin.mid.js";

const productsRouter = Router();

//Create a new product
const create = async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await productsManager.create(data);
    if (newProduct) {
      return res.json({
        statusCode: 201,
        response: "CREATED NEW USER WITH ID: " + newProduct.id,
        message: "Product created successfully",
      });
    } else {
      const error = new Error("Error creating a new product");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

//Read <- get all products or get for category
const read = async (req, res, next) => {
  try {
    const { category } = req.query;
    const products = await productsManager.read(category);
    if (products.length > 0) {
      return res.json({
        statusCode: 200,
        response: products,
      });
    } else {
      const error = new Error("Not found data!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
//Read <- get all items by Paginate
const paginateRead = async (req, res, next) => {
  try {
    const filter = {};
    const opts = {};
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" }; // case-insensitive search
    }
    const all = await productsManager.paginate({ filter, opts });
    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        totalDocs: all.totalDocs,
        page: all.page,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      },
    });
  } catch (error) {
    return next(error);
  }
};
//Read <- get product by ID
async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOne(pid);
    if (product) {
      return res.json({
        statusCode: 200,
        response: product,
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

//Update a product
const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const updateProduct = await productsManager.update(pid, data);
    if (updateProduct) {
      return res.json({
        statusCode: 200,
        response: updateProduct,
      });
    } else {
      const error = new Error("Not found product with that ID to update!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
//Delete a product
const destroy = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await productsManager.destroy(pid);
    if (deleteProduct) {
      return res.json({
        statusCode: 200,
        response: deleteProduct,
      });
    } else {
      const error = new Error("Not found product with that ID to delete!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};

//Create a new product
productsRouter.post(
  "/",
  passportCb("jwt"),
  isValidAdmin,
  checkMandatoryFieldsProducts,
  create
);
//Read <- get all products or get for category
productsRouter.get("/", read);
//Read <- get all items by Paginate
productsRouter.get("/paginate", paginateRead);
//Read <- get product by ID
productsRouter.get("/:pid", readOne);
//Update a product
productsRouter.put("/:pid", update);
//Delete a product
productsRouter.delete("/:pid", destroy);

export default productsRouter;
