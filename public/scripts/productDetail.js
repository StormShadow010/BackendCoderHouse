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