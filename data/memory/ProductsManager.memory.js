const crypto = require('crypto'); //Create id random with hexa

class ProductsManager {
    static #products = [];
    create(data) {
        try {
            const { title, photo, category, price, stock } = data;
            if (!title || !category || !price || !stock) {
                throw new Error("All fields are required!!")
            }
            //Create object for new product
            const newProduct = {
                id: crypto.randomBytes(12).toString('hex'),
                title,
                photo: photo || "https://unsplash.com",
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

    read = () => {
        try {
            return ProductsManager.#products;
        } catch (error) {
            console.log(error);
        }
    }

    readOne = (id) => {
        try {
            const productById = ProductsManager.#products.find(product => product.id === id);
            if (!productById) {
                throw new Error("Product not found!!");
            } else {
                return productById;
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy = (id) => {
        try {
            const findProductExists = this.readOne(id)
            ProductsManager.#products = ProductsManager.#products.filter(product => product.id !== findProductExists.id);
            console.log("Product deleted:", findProductExists);

        } catch (error) {
            console.log(error);
        }
    }
}

//Creating a new instance
const productManager = new ProductsManager();

//Creating a new product 1
productManager.create({
    title: 'iPhone 12',
    photo: 'https://unsplash.com/es/fotos/iphone-6-plateado-con-funda-azul-OjMyiwfviQ4',
    category: 'mobile',
    price: 12000,
    stock: 50,
});

//Creating a new product 2
productManager.create({
    title: "Smart Watch 1",
    photo: 'https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g',
    category: 'Watch',
    price: 1000,
    stock: 30,
})

//Creating a new product 3
productManager.create({
    title: "Smart Watch 2",
    photo: 'https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g',
    category: 'Watch',
    price: 1000,
    stock: 5,
})

//Creating a new product 4
productManager.create({
    title: "Smart Watch 3",
    photo: 'https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g',
    category: 'Watch',
    price: 1000,
    stock: 20,
})

//Creating a new product 5
productManager.create({
    title: 'iPhone 11',
    photo: 'https://unsplash.com/es/fotos/iphone-6-plateado-con-funda-azul-OjMyiwfviQ4',
    category: 'mobile',
    price: 1800,
    stock: 10,
});

//Creating a new product 6
productManager.create({
    title: "Samsung Galaxy S21",
    photo: "https://unsplash.com/es/fotos/samsung-galaxy-s21-blanco-KmMxvzlTnzg",
    category: "mobile",
    price: 11000,
    stock: 75
});

//Creating a new product 7
productManager.create({
    title: "MacBook Pro 16-inch",
    photo: "https://unsplash.com/es/fotos/macbook-pro-16-gris-espacial-JT_BhWxQz7w",
    category: "laptop",
    price: 25000,
    stock: 30
});

//Creating a new product 8
productManager.create({
    title: "Sony WH-1000XM4",
    photo: "https://unsplash.com/es/fotos/sony-wh-1000xm4-negro-KmMxvzlTnzg",
    category: "headphones",
    price: 3000,
    stock: 100
});

//Creating a new product 9
productManager.create({
    title: "Dell XPS 13",
    photo: "https://unsplash.com/es/fotos/dell-xps-13-plateado-KmMxvzlTnzg",
    category: "laptop",
    price: 18000,
    stock: 40
});

//Creating a new product 10
productManager.create({
    title: "HP Spectre x360",
    photo: "https://unsplash.com/es/fotos/hp-spectre-x360-plateado-KmMxvzlTnzg",
    category: "laptop",
    price: 16000,
    stock: 50
});


//Show all products
console.log(productManager.read())
//Fin a product by ID
console.log("Found:!!!", productManager.readOne(2))
//Deleting a product
productManager.destroy(50)
//Show all products
console.log(productManager.read())

//Creating a new product 11 without stock parameter
productManager.create({
    title: 'iPhone 11 Pro',
    photo: 'https://images.unsplash.com/photo-1589111416000-2000000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    category: 'mobile',
    price: 1000,
    // stock: 50,
});

//Show all products
console.log(productManager.read())

