import fs from "fs";
import crypto from "crypto";
import { createFileNP, readFile } from "./helpers/manageFiles.js";

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
        } else {
            return null
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
            throw error;
        }
    };
    read = async (category) => {
        try {
            let fileTotal = await readFile(this.path);
            category && (fileTotal = fileTotal.filter(each => each.category.toLowerCase() === category.toLowerCase()))
            return fileTotal
        } catch (error) {
            throw error;
        }
    }

    readOne = async (id) => {
        try {
            let fileTotal = await readFile(this.path);
            let itemId = fileTotal.find((item) => item.id === id);
            return itemId;
        } catch (error) {
            throw error;
        }
    };

    destroy = async (id) => {
        try {
            let fileTotal = await readFile(this.path);
            let restFile = fileTotal.filter((product) => product.id !== id);

            if (!restFile) {
                throw error;
            } else {
                const findProductExists = await this.readOne(id);
                console.log("Product deleted:", findProductExists);
                await createFile(this.path, restFile);
                return restFile;
            }
        } catch (error) {
            throw error;
        }
    };
}

const productsManager = new ProductsManager()
export default productsManager