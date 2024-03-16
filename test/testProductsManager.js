const ProductsManager = require("../ProductsManager")

const testProductsManager = () => {
    const productsManager = new ProductsManager()
    console.log("Testing the class ProductsManager")

    console.log("Creating a new product 1")
    productsManager.create({
        title: 'iPhone 12',
        photo: 'https://unsplash.com/es/fotos/iphone-6-plateado-con-funda-azul-OjMyiwfviQ4',
        category: 'mobile',
        price: 12000,
        stock: 50,
    });

    console.log("Creating a new product 2")
    productsManager.create({
        title: "Smart Watch 1",
        photo: 'https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g',
        category: 'Watch',
        price: 1000,
        stock: 30,
    })

    console.log("Creating a new product 3")
    productsManager.create({
        title: "Smart Watch 2",
        photo: 'https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g',
        category: 'Watch',
        price: 1000,
        stock: 5,
    })

    console.log("Creating a new product 4")
    productsManager.create({
        title: "Smart Watch 3",
        photo: 'https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g',
        category: 'Watch',
        price: 1000,
        stock: 20,
    })

    console.log("Creating a new product 5")
    productsManager.create({
        title: 'iPhone 11',
        photo: 'https://unsplash.com/es/fotos/iphone-6-plateado-con-funda-azul-OjMyiwfviQ4',
        category: 'mobile',
        price: 1800,
        stock: 10,
    });

    console.log("Show all products")
    console.log(productsManager.read())

    console.log("Creating a new product 6 without stock parameter, in this case an error is generated because all the fields are being validated")
    productsManager.create({
        title: 'iPhone 11 Pro',
        photo: 'https://images.unsplash.com/photo-1589111416000-2000000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        category: 'mobile',
        price: 1000,
        // stock: 50,
    });

    console.log("Creating a new product 7 without category parameter,an error is expected since it is a required field");
    productsManager.create({
        title: 'Shoe One',
        photo: 'https://hips.hearstapps.com/hmg-prod/images/hoka-zinal-13085-1643565794.jpg?crop=1.00xw:0.752xh;0,0.115xh&resize=1200:*',
        // category: 'mobile',
        price: 800,
        stock: 50,
    });
}

testProductsManager()