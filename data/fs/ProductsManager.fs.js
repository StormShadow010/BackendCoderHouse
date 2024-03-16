const fs = require("fs");
const crypto = require("crypto");
const { readFile, createFileNP, createFile } = require("./helpers/manageFiles");

class ProductsManager {
  constructor() {
    this.path = "./fs/files/products.json";
    this.init();
  }

  init = () => {
    const exists = fs.existsSync(this.path);
    console.log(exists);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("File created");
    } else {
      console.log("File exists");
    }
  };

  create = async (data) => {
    try {
      const { title, photo, category, price, stock } = data;
      if (!title || !category || !price || !stock) {
        throw new Error("All fields are required!!");
      }
      //Create object for new product
      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title,
        photo: photo || "https://unsplash.com",
        category,
        price,
        stock,
      };
      let fileTotal = await readFile(this.path);
      await createFileNP(this.path, fileTotal, newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  read = async () => {
    try {
      let fileTotal = await readFile(this.path);
      return fileTotal;
    } catch (error) {
      console.log(error);
    }
  };

  readOne = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let itemId = fileTotal.find((item) => item.id === id);
      if (!itemId) {
        throw new Error("Product not found!!");
      } else {
        return itemId;
      }
    } catch (error) {
      console.log(error);
    }
  };

  destroy = async (id) => {
    try {
      let fileTotal = await readFile(this.path);
      let restFile = fileTotal.filter((product) => product.id !== id);

      if (!restFile) {
        throw new Error("Product not found!!");
      } else {
        const findProductExists = await this.readOne(id);
        console.log("Product deleted:", findProductExists);
        await createFile(this.path, restFile);
        return restFile;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const testProductsManager = async () => {
  const products = new ProductsManager();

  console.log("Data from file:");
  let fileTotal = await products.read();
  console.log(fileTotal);

  console.log("Creation of the products");
  for (let i = 0; i < 10; i++) {
    await products.create({
      title: `Product ${i}`,
      photo: `https://example.com/photo${i}.jpg`,
      category: `Category ${i % 2 === 0 ? "A" : "B"}`,
      price: 100 * (i + 1),
      stock: 100,
    });
  }
  console.log("Data from file:");
  fileTotal = await products.read();
  console.log(fileTotal);
  console.log(
    "Search a product by id,in this case, the product of position 3 will be extracted from the read method."
  );
  console.log("Producto found:", await products.readOne(fileTotal[2].id));
  console.log(
    "Delete a product by id,in this case, the product of position 5 will be extracted from the read method."
  );
  const remaining_products = await products.destroy(fileTotal[4].id);
  console.log("Remaining products:", remaining_products);

  //Expected errors
  console.log(
    "Search for a product by an ID that does not exist, in this case 2025"
  );
  console.log(await products.readOne(2025));
  console.log(
    "Destroy a product by an ID that does not exist, in this case 2025"
  );
  console.log(await products.destroy(2025));
};

testProductsManager();
