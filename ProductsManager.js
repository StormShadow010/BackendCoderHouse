module.exports = class ProductsManager {
    static #products = [];
    create(data) {
        try {
            const { title, photo, category, price, stock } = data;
            if (!title || !photo || !category || !price || !stock) {
                throw new Error("All fields are required!!")
            }
            //Create object for new product
            const newProduct = {
                id: (ProductsManager.#products.length + 1),
                title,
                photo,
                category,
                price,
                stock,
            }
            //Add new product to array products
            ProductsManager.#products.push(newProduct);
            console.log("Product added:", newProduct);
        } catch (error) {
            console.log(error);
        }
    }

    read = () => ProductsManager.#products;
}
