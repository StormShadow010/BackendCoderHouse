import { printIcons } from "./modules/printLayout.js";

//Fetch Session
let online = await fetch("/api/sessions");
online = await online.json();
const userProducts = async () => {
  //Fetch Cart User
  let cartResponse = await fetch(`/api/carts?uid=${online.user_id}`);
  cartResponse = await cartResponse.json();
  let products = cartResponse.response;
  showProducts(products);
  return products;
};

const showProducts = (productsData) => {
  //Container where the products will be seen
  const containerProducts = document.querySelector("#ContainerProducts");
  //Every time new ones are created, the container is emptied
  containerProducts.innerHTML = "";

  productsData.map((product) => {
    //Create a new div
    const newDiv = document.createElement("div");
    //Add a class
    newDiv.className = `product ${product._id} `;
    newDiv.innerHTML = createProductHTML(product);
    //Events to decrement, increment, delete
    //Decrement
    newDiv
      .querySelector("#decrementButton")
      .addEventListener("click", async () => {
        const inputValue = newDiv.querySelector("#quantityProduct");
        if (parseInt(inputValue.value) > 1) {
          inputValue.value = parseInt(inputValue.value) - 1;
          await updateProductQuantity(product._id, inputValue.value);
        }
      });
    //Increment
    newDiv
      .querySelector("#incrementButton")
      .addEventListener("click", async () => {
        const inputValue = newDiv.querySelector("#quantityProduct");
        inputValue.value = parseInt(inputValue.value) + 1;
        await updateProductQuantity(product._id, inputValue.value);
      });
    //Delete
    newDiv
      .querySelector("#deleteProduct")
      .addEventListener("click", async () => {
        await fetch(`/api/carts/${product._id}`, { method: "DELETE" });
        location.reload("/");
      });
    //Append to the container
    containerProducts.appendChild(newDiv);
  });
};

const updateProductQuantity = async (cid, quantity) => {
  await fetch(`/api/carts/${cid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cid, quantity }),
  });
};

const createProductHTML = (product) => {
  const template = `
        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src="${product.product_id.photo}"
                alt="product-image" class="w-full rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900">${product.product_id.title}</h2>
                    <p class="mt-1 text-xl text-gray-700">$${product.product_id.price}</p>
                </div>
                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center border-gray-100">
                        <span id="decrementButton" class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                            - </span>
                        <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="${product.quantity}" min="1" id="quantityProduct" />
                        <span id="incrementButton" class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                            + </span>
                    </div>
                    <button id="deleteProduct" class="flex items-center  justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor"
                            class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    `;
  return template;
};

const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", async () => {
  try {
    const cartResponse = await userProducts();
    // Loop through each product in the cart and delete it
    cartResponse.forEach(async (product) => {
      await fetch(`/api/carts/${product._id}`, {
        method: "DELETE",
      });
    });
    // Reload the page to show the empty cart
    location.reload();
  } catch (error) {
    console.error("Error checking out:", error);
  }
});

const clearButton = document.getElementById("clearChopping");

clearButton.addEventListener("click", async () => {
  try {
    const cartResponse = await userProducts();
    // Loop through each product in the cart and delete it
    cartResponse.forEach(async (product) => {
      await fetch(`/api/carts/${product._id}`, {
        method: "DELETE",
      });
    });
    // Reload the page to show the empty cart
    location.reload();
  } catch (error) {
    console.error("Error checking out:", error);
  }
});

const initAppCart = () => {
  printIcons();
  userProducts();
};

initAppCart();
