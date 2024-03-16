const ProductsManager = require("../../data/fs/ProductsManager.fs");

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
