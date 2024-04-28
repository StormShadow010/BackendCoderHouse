import fs from "fs";
import crypto from "crypto";
import { createFile, createFileNP, readFile } from "./helpers/manageFiles.js";

class CartsManager {
    constructor() {
        this.path = "./src/data/fs/files/carts.json";
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
            const { user_id, product_id, quantity, state } = data;
            //Create object for new product
            const addCartProduct = {
                id: crypto.randomBytes(12).toString("hex"),
                user_id,
                product_id,
                quantity,
                state: state || "reserved"
            };
            let fileTotal = await readFile(this.path);
            await createFileNP(this.path, fileTotal, addCartProduct);
            return addCartProduct;
        } catch (error) {
            throw error;
        }
    };

    read = async (user_id) => {
        try {
            let fileTotal = await readFile(this.path);
            user_id && (fileTotal = fileTotal.filter(each => each.user_id.toLowerCase() === user_id.toLowerCase()))
            return fileTotal
        } catch (error) {
            throw error;
        }
    }

    readOne = async (id) => {
        try {
            let fileTotal = await readFile(this.path);
            let itemId = fileTotal.find((item) => item.id === id);
            return itemId
        } catch (error) {
            throw error;
        }
    };

    update = async (id, data) => {
        try {
            let fileTotal = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            const product = fileTotal.find((user) => user.id === id);
            if (product) {
                Object.assign(product, data);
                await createFile(this.path, fileTotal);
            }
            return product;
        } catch (error) {
            throw error;
        }
    };

    destroy = async (id) => {
        try {
            let fileTotal = await readFile(this.path);
            let productDelete = await this.readOne(id);

            if (productDelete) {
                console.log("Item cart deleted:", productDelete);
                let productsFilter = fileTotal.filter((product) => product.id !== id);
                await createFile(this.path, productsFilter);
            }
            return productDelete;
        } catch (error) {
            throw error;
        }
    };
}

const cartsManager = new CartsManager()
export default cartsManager