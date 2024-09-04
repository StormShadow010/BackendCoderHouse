import { printIcons } from "./modules/printLayout.js";

// Dynamic Navbar
printIcons();

//Get Product ID from Params
let url = new URL(window.location.href);
let pid = url.searchParams.get("pid");

// Fetch Product
let response = await fetch(`/api/products/${pid}`);
let data = await response.json();
data = data.response;

//Fill in the input fields with the product data

document.getElementById("title").value = data.title;
document.getElementById("photo").value = data.photo;
document.getElementById("price").value = data.price;
document.getElementById("stock").value = data.stock;
document.getElementById("category").value = data.category;

// Fetch to update the product
const updateProduct = async () => {
  let product = {
    title: document.getElementById("title").value,
    photo: document.getElementById("photo").value,
    category: document.getElementById("category").value,
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value),
  };
  let responseUpdate = await fetch(`/api/products/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  responseUpdate = await responseUpdate.json();
  if (responseUpdate.statusCode == 200) {
    Swal.fire({
      title: "Product updated successfully",
      icon: "success",
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      location.href = "../products/productsMe.html";
    });
  } else {
    Swal.fire({
      title: "Error updating product",
      icon: "error",
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
};
window.updateProduct = updateProduct;
