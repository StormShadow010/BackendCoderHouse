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
document.getElementById("title").removeAttribute("readonly");
document.getElementById("photo").removeAttribute("readonly");
document.getElementById("price").removeAttribute("readonly");
document.getElementById("stock").removeAttribute("readonly");
document.getElementById("category").removeAttribute("disabled");
// Rellenar los campos del formulario con los datos del producto
document.getElementById("title").value = data.title;
document.getElementById("photo").value = data.photo;
// document.getElementById("category").value = data.category;
document.getElementById("price").value = data.price;
document.getElementById("stock").value = data.stock;
let categorySelect = document.getElementById("category");
categorySelect.value = data.category;

// Fetch to update the product

let product = {
  title: document.getElementById("title").value,
  photo: document.getElementById("photo").value,
  category: document.getElementById("category").value,
  price: parseFloat(document.getElementById("price").value),
  stock: parseInt(document.getElementById("stock").value),
};

const updateProductF = async () => {
  let responseUpdate = await fetch(`/api/products/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  console.log(responseUpdate);

  if (online && responseUpdate.response.status === 200) {
    alert("Producto actualizado correctamente!");
    window.location.href = "../index.html";
  } else {
    alert("Error al actualizar el producto.");
  }
};

// Exponer la función globalmente
window.createNewProduct = updateProductF;
