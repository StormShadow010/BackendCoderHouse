import {
  createService,
  destroyService,
  paginateService,
  readOneService,
  readService,
  updateService,
} from "../services/products.service.js";

//Create a new product
export const create = async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await createService(data);
    return newProduct
      ? res.message201("Product created successfully")
      : res.error404("Error creating a new product");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all products or get for category
export const read = async (req, res, next) => {
  try {
    const { category } = req.query;
    const products = await readService({ category: category });
    return products.length > 0
      ? res.response200(products)
      : res.error404("Not found data!");
  } catch (error) {
    return next(error);
  }
};

//Read <- get all items by Paginate
export const paginateRead = async (req, res, next) => {
  try {
    const filter = {};
    const opts = { page: 1, limit: 10, lean: true, sort: { title: 1 } };
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" }; // case-insensitive search
    }
    const all = await paginateService({ filter, opts });
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
export const readOne = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await readOneService(pid);
    return product
      ? res.response200(product)
      : res.error404("Not found product with that ID!");
  } catch (error) {
    return next(error);
  }
};

//Update a product
export const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    console.log(pid, data);

    const updateProduct = await updateService(pid, data);
    return updateProduct
      ? res.response200(updateProduct)
      : res.error404("Not found product with that ID to update!");
  } catch (error) {
    return next(error);
  }
};

//Delete a product
export const destroy = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deleteProduct = await destroyService(pid);
    return deleteProduct
      ? res.response200(deleteProduct)
      : res.error404("Not found product with that ID to delete!");
  } catch (error) {
    return next(error);
  }
};
