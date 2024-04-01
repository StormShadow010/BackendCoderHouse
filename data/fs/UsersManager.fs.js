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
        }
    };

    create = async (data) => {
        try {
            const { photo, email, password, role } = data;
            if (!email || !password) {
                throw new Error("All fields are required!!");
            }

            const newUser = {
                id: crypto.randomBytes(12).toString("hex"),
                photo: photo || "https://unsplash.com",
                email,
                password,
                role: role || 0
            };
            let fileTotal = await readFile(this.path);
            await createFileNP(this.path, fileTotal, newUser);
        } catch (error) {
            console.log(error);
            return error
        }
    };

    read = async (role) => {
        try {
            let fileTotal = await readFile(this.path);
            role && (fileTotal = fileTotal.filter(each => each.role.toLowerCase() === role.toLowerCase()))
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
            return itemId ? itemId : console.log("User not found!!");
        } catch (error) {
            console.log(error);
            return error
        }
    };

    destroy = async (id) => {
        try {
            let fileTotal = await readFile(this.path);
            let userDelete = await this.readOne(id);

            if (userDelete) {
                console.log("User deleted:", userDelete);
                let usersFilter = fileTotal.filter((users) => users.id !== id);
                await createFile(this.path, usersFilter);
            }
        } catch (error) {
            console.log(error);
            return error
        }
    };
}

const usersManager = new UsersManager()
export default usersManager
