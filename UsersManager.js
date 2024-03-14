module.exports = class UsersManager {
    static #users = [];
    create(data) {
        try {
            const { photo, email, password, role } = data;
            if (!photo || !email || !password) {
                throw new Error("All fields are required!!!!!")
            }
            //Create object for new user
            const newUser = {
                id: (UsersManager.#users.length + 1),
                photo,
                email,
                password,
                role: role || "user",
            }
            //Add new user to array uers
            UsersManager.#users.push(newUser);
            console.log("User added:", newUser);
        } catch (error) {
            console.log(error);
        }

    }

    read = () => UsersManager.#users;
}
