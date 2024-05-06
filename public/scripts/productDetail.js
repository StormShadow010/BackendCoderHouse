let product;
let url = new URL(window.location.href);
let id = url.searchParams.get("pid");

let response = fetch(`http://localhost:8080/api/products/${id}`);
response.then(res => res.json())
    .then(data => {
        product = data.response;

        const imgProduct = document.querySelector("#img-product");
        imgProduct.src = product.photo;
        document.getElementById("category-product").innerHTML = product.category;
        document.getElementById("title-product").innerHTML = product.title;
        document.getElementById("price-product").innerHTML = "$" + product.price;

    })
    .catch(error => console.error('Error:', error));

// Obtén el botón por su ID
const addCartButton = document.getElementById("addCart");

// Agrega un evento de clic al botón
addCartButton.addEventListener("click", function () {
    // Aquí puedes agregar el código que deseas ejecutar cuando se haga clic en el botón
    console.log("Botón de agregar al carrito ha sido clickeado");

    const productToAdd = {
        user_id: "663650ece72c2a6d4680166d", //harcodeado user coderAdmin@gmail.com
        product_id: product._id,
        quantity: 1
    }
    fetch('http://localhost:8080/api/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productToAdd)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error('Error:', error));

});

