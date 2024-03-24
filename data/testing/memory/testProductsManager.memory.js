import productsManager from "../../memory/ProductsManager.memory.js";

//Creating a new product 1
productsManager.create({
    title: "iPhone 12",
    photo:
        "https://unsplash.com/es/fotos/iphone-6-plateado-con-funda-azul-OjMyiwfviQ4",
    category: "mobile",
    price: 12000,
    stock: 50,
});

//Creating a new product 2
productsManager.create({
    title: "Smart Watch 1",
    photo:
        "https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g",
    category: "Watch",
    price: 1000,
    stock: 30,
});

//Creating a new product 3
productsManager.create({
    title: "Smart Watch 2",
    photo:
        "https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g",
    category: "Watch",
    price: 1000,
    stock: 5,
});

//Creating a new product 4
productsManager.create({
    title: "Smart Watch 3",
    photo:
        "https://unsplash.com/es/fotos/reloj-inteligente-negro-con-correa-negra-2wFoa040m8g",
    category: "Watch",
    price: 1000,
    stock: 20,
});

//Creating a new product 5
productsManager.create({
    title: "iPhone 11",
    photo:
        "https://unsplash.com/es/fotos/iphone-6-plateado-con-funda-azul-OjMyiwfviQ4",
    category: "mobile",
    price: 1800,
    stock: 10,
});

//Creating a new product 6
productsManager.create({
    title: "Samsung Galaxy S21",
    photo: "https://unsplash.com/es/fotos/samsung-galaxy-s21-blanco-KmMxvzlTnzg",
    category: "mobile",
    price: 11000,
    stock: 75,
});

//Creating a new product 7
productsManager.create({
    title: "MacBook Pro 16-inch",
    photo:
        "https://unsplash.com/es/fotos/macbook-pro-16-gris-espacial-JT_BhWxQz7w",
    category: "laptop",
    price: 25000,
    stock: 30,
});

//Creating a new product 8
productsManager.create({
    title: "Sony WH-1000XM4",
    photo: "https://unsplash.com/es/fotos/sony-wh-1000xm4-negro-KmMxvzlTnzg",
    category: "headphones",
    price: 3000,
    stock: 100,
});

//Creating a new product 9
productsManager.create({
    title: "Dell XPS 13",
    photo: "https://unsplash.com/es/fotos/dell-xps-13-plateado-KmMxvzlTnzg",
    category: "laptop",
    price: 18000,
    stock: 40,
});

//Creating a new product 10
productsManager.create({
    title: "HP Spectre x360",
    photo: "https://unsplash.com/es/fotos/hp-spectre-x360-plateado-KmMxvzlTnzg",
    category: "laptop",
    price: 16000,
    stock: 50,
});
// Creating a new product 11 
productsManager.create({
    title: "Bose QuietComfort 35 II",
    photo: "https://unsplash.com/es/fotos/bose-quietcomfort-35-ii-blanco-KmMxvzlTnzg",
    category: "headphones",
    price: 3500,
    stock: 80,
});

// Creating a new product 12 
productsManager.create({
    title: "JBL Flip 5",
    photo: "https://unsplash.com/es/fotos/jbl-flip-5-azul-KmMxvzlTnzg",
    category: "speakers",
    price: 1500,
    stock: 120,
});

// Creating a new product 13 
productsManager.create({
    title: "Samsung The Frame",
    photo: "https://unsplash.com/es/fotos/samsung-the-frame-negro-KmMxvzlTnzg",
    category: "tv",
    price: 20000,
    stock: 25,
});

// Creating a new product 14 
productsManager.create({
    title: "Sony A8H",
    photo: "https://unsplash.com/es/fotos/sony-a8h-negro-KmMxvzlTnzg",
    category: "tv",
    price: 18000,
    stock: 35,
});

// Creating a new product 15 
productsManager.create({
    title: "Apple AirPods Pro",
    photo: "https://unsplash.com/es/fotos/apple-airpods-pro-blanco-KmMxvzlTnzg",
    category: "headphones",
    price: 2500,
    stock: 70,
});

// Creating a new product 16 
productsManager.create({
    title: "Google Pixelbook Go",
    photo: "https://unsplash.com/es/fotos/google-pixelbook-go-gris-KmMxvzlTnzg",
    category: "laptop",
    price: 2000,
    stock: 55,
});

// Creating a new product 17 
productsManager.create({
    title: "Microsoft Surface Pro 7",
    photo: "https://unsplash.com/es/fotos/microsoft-surface-pro-7-plateado-KmMxvzlTnzg",
    category: "laptop",
    price: 2200,
    stock: 60,
});

// Creating a new product 18 
productsManager.create({
    title: "Logitech MX Master 3",
    photo: "https://unsplash.com/es/fotos/logitech-mx-master-3-gris-KmMxvzlTnzg",
    category: "mouse",
    price: 100,
    stock: 200,
});

// Creating a new product 19 
productsManager.create({
    title: "Apple Magic Mouse 2",
    photo: "https://unsplash.com/es/fotos/apple-magic-mouse-2-blanco-KmMxvzlTnzg",
    category: "mouse",
    price: 120,
    stock: 150,
});

// Creating a new product 20 
productsManager.create({
    title: "Razer Viper Ultimate",
    photo: "https://unsplash.com/es/fotos/razer-viper-ultimate-negro-KmMxvzlTnzg",
    category: "mouse",
    price: 150,
    stock: 180,
});

// Creating a new product 21 
productsManager.create({
    title: "Corsair Dark Core RGB Pro",
    photo: "https://unsplash.com/es/fotos/corsair-dark-core-rgb-pro-negro-KmMxvz",
    category: "corsair",
    price: 200,
    stock: 10,
});

console.log("Show all products");
let allProducts = productsManager.read();
console.log(allProducts);
console.log("Fin a product by ID");
console.log("Found:!!!", productsManager.readOne(allProducts[0].id));
console.log("Deleting a product by ID");
productsManager.destroy(allProducts[0].id);
console.log("Show all products");
allProducts = productsManager.read();
console.log(allProducts);

console.log("Creating a new product 11 without stock parameter");
console.log(
    "An error is expected since a product will be created without the Stock parameter"
);
productsManager.create({
    title: "iPhone 11 Pro",
    photo:
        "https://images.unsplash.com/photo-1589111416000-2000000000000?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    category: "mobile",
    price: 1000,
    // stock: 50,
});

//Show all products
console.log(productsManager.read());

