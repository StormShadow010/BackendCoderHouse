import { printIcons } from "./modules/printLayout.js";
import { productsAll } from "./modules/printProducts.js";

const initAppIndex = async () => {
    printIcons();
    productsAll()
};

initAppIndex();