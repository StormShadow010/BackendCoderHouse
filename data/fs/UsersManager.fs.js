import fs from "fs";
import crypto from "crypto";
import { createFile, createFileNP, readFile } from "./helpers/manageFiles.js";

class UsersManager {
    constructor() {
        this.path = "./data/fs/files/users.json";
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
            const { photo, email, password, role } = data;
            if (!email || !password || !role) {
                throw new Error("All fields are required!!");
            }
            //Create object for new User
            const newUser = {
                id: crypto.randomBytes(12).toString("hex"),
                photo: photo || "https://unsplash.com",
                email,
                password,
                role,
            };
            let fileTotal = await readFile(this.path);
            await createFileNP(this.path, fileTotal, newUser);
        } catch (error) {
            console.log(error);
        }
    };

    read = async (role) => {
        try {
            let fileTotal = await readFile(this.path);
            role && (fileTotal = fileTotal.filter(each => each.role.toLowerCase() === role.toLowerCase()))
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
                throw new Error("User not found!!");
            } else {
                const findProductExists = await this.readOne(id);
                console.log("User deleted:", findProductExists);
                await createFile(this.path, restFile);
                return restFile;
            }
        } catch (error) {
            console.log(error);
        }
    };
}

const usersManager = new UsersManager()
export default usersManager