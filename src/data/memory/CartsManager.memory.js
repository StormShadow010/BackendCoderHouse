class CartsManager {
    static #products = [];
    create(data) {
        try {
            const { user_id, product_id, quantity, state } = data;
            //Create object for new product
            const addCartProduct = {
                user_id,
                product_id,
                quantity,
                state: state || "reserved"
            };
            //Add new product to array products
            CartsManager.#products.push(addCartProduct);
            console.log("Cart Item added:", addCartProduct);
        } catch (error) {
            console.log(error);
        }
    }

    read = () => {
        try {
            return CartsManager.#products;
        } catch (error) {
            console.log(error);
        }
    };

    readOne = (id) => {
        try {
            const cartItemById = CartsManager.#products.find(
                (item) => item.id === id
            );
            if (!cartItemById) {
                throw new Error("Cart Item not found!!");
            } else {
                return cartItemById;
            }
        } catch (error) {
            console.log(error);
        }
    };

    update = (id, data) => {
        try {
            const cartItemToUpdate = this.readOne(id);
            Object.assign(cartItemToUpdate, data);
            return cartItemToUpdate
        } catch (error) {
            console.log(error);
        }
    }

    destroy = (id) => {
        try {
            const findCartItemExists = this.readOne(id);
            CartsManager.#products = CartsManager.#products.filter(
                (product) => product.id !== findCartItemExists.id
            );
            console.log("Cart Item deleted:", findCartItemExists);
        } catch (error) {
            console.log(error);
        }
    };
};

const cartsManager = new CartsManager()
export default cartsManager