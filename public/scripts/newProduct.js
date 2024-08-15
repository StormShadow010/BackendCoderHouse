import { printIcons } from "./modules/printLayout.js";

//Dynamic Navbar
printIcons();

const createNewProduct = async () => {
  let product = {
    title: document.getElementById("title").value,
    photo: document.getElementById("photo").value,
    category: document.getElementById("category").value,
    price: parseFloat(document.getElementById("price").value),
    stock: parseInt(document.getElementById("stock").value),
  };
  //Fetch Session
  let online = await fetch("/api/auth");
  online = await online.json();
  product.supplier_id = online.response._id;

  //Fetch Product

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };

  let promise = await fetch(`/api/products`, opts);

  promise = await promise.json();

  if (promise.statusCode === 201) {
    Swal.fire({
      title: "Producto creado correctamente",
      icon: "success",
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
    }).then(() => {
      location.replace("../products/productsMe.html");
    });
  } else {
    Swal.fire({
      title: "Error al crear el producto",
      icon: "error",
      allowOutsideClick: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
};

// Exponer la función globalmente
window.createNewProduct = createNewProduct;
