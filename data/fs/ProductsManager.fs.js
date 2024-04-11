import fs from "fs";
import crypto from "crypto";
import { createFile, createFileNP, readFile } from "./helpers/manageFiles.js";

class ProductsManager {
    constructor() {
        this.path = "./data/fs/files/products.json";
        this.init();
    }
    init = () => {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
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
            return error
        }
    };
    read = async (category) => {
        try {
            let fileTotal = await readFile(this.path);
            category && (fileTotal = fileTotal.filter(each => each.category.toLowerCase() === category.toLowerCase()))
            return fileTotal
        } catch (error) {
            console.log(error);
            return error
        }
    }

    readOne = async (id) => {
        try {
            let fileTotal = await readFile(this.path);
            let itemId = fileTotal.find((item) => item.id === id);
            return itemId ? itemId : console.log("Product not found!!");
        } catch (error) {
            console.log(error);
            return error
        }
    };

    destroy = async (id) => {
        try {
            let fileTotal = await readFile(this.path);
            let productDelete = await this.readOne(id);

            if (productDelete) {
                console.log("Product deleted:", productDelete);
                let productsFilter = fileTotal.filter((product) => product.id !== id);
                await createFile(this.path, productsFilter);
            }
        } catch (error) {
            console.log(error);
            return error
        }
    };
}

const productsManager = new ProductsManager()
export default productsManager
