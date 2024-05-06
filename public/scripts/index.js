
const getData = async (page, input) => {

    if (input) {
        let response = await fetch(`http://localhost:8080/api/products/paginate?page=${page}&title=${input}`, { mode: 'no-cors' });
        let data = await response.json();
        let products = data.response;
        return products; // Add this line to return the products
    } else {
        let response = await fetch(`http://localhost:8080/api/products/paginate?page=${page}`, { mode: 'no-cors' });
        let data = await response.json();
        let products = data.response;
        return products; // Add this line to return the products
    }


}

const detailProduct = (productId) => {
    location.href = `pages/products/product-detail.html?pid=${productId}`
};

const detailAdd = (productId) => {
    const productToAdd = {
        user_id: "663650ece72c2a6d4680166d", //harcodeado user coderAdmin@gmail.com
        product_id: productId,
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
}

const createProductHTML = (product) => {
    const template = `
        <div class="w-full h-[350px] rounded-md shadow-xl overflow-hidden">
            <div class="flex flex-col">
                <div class=" flex items-end justify-end h-[280px] w-full bg-contain bg-center bg-no-repeat"
                    style="background-image: url(${`${product.photo}`});">
                    <button onclick="detailAdd('${product._id}')"
                        class="p-2 rounded-full bg-blue-600 text-white mx-5 mb-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <svg class="h-10 w-10" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                            </path>
                        </svg>
                    </button>
                    <button onclick="detailProduct('${product._id}')"
                        class="p-2 rounded-full bg-white text-white mx-0 mb-2 hover:bg-red-500 focus:outline-none focus:bg-blue-500">
                        <svg class="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.95043 20.6471C6.17301 19.9956 4.00437 17.827 3.35287 15.0496C2.88237 13.0437 2.88237 10.9563 3.35287 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35287C17.827 4.00437 19.9956 6.173 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95043 20.6471Z" stroke="#0095FF" stroke-width="1.5" />
                            <path d="M8.95043 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.173 17.827 4.00437 15.0496 3.35288C13.0437 2.88237 10.9563 2.88237 8.95043 3.35288C6.173 4.00437 4.00437 6.17301 3.35287 8.95043" stroke="#363853" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M12 15.5V11.5" stroke="#0095FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="12" cy="9" r="0.5" stroke="#0095FF" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div class="px-5 py-3 bg-white">
                    <h3 class="text-gray-700 uppercase">${product.title}</h3>
                    <span class="text-gray-500 mt-2">$${product.price}</span>
                </div>
            </div>
        </div>`;
    return template;
};




const showProducts = (productsData) => {
    //Container where the products will be seen
    const containerProducts = document.querySelector("#ContainerProducts")
    ////Every time new ones are created, the container is emptied
    containerProducts.innerHTML = "";

    productsData.map((product) => {
        //Create a new div
        const newDiv = document.createElement("div")
        //Add a class
        newDiv.className = `product ${product._id} `
        newDiv.innerHTML = createProductHTML(product);
        containerProducts.appendChild(newDiv)
    })

}

const loadNextProducts = async () => {
    const currentPage = parseInt(document.querySelector("#ContainerProducts").dataset.page) || 1;
    const productsData = await getData(currentPage + 1);
    showProducts(productsData);
    document.querySelector("#ContainerProducts").dataset.page = currentPage + 1;
};

const loadPreviousProducts = async () => {
    const currentPage = parseInt(document.querySelector("#ContainerProducts").dataset.page) || 1;
    const productsData = await getData(currentPage - 1);
    showProducts(productsData);
    document.querySelector("#ContainerProducts").dataset.page = currentPage - 1;

};

document.getElementById('search').addEventListener('input', async (event) => {
    const search = event.target.value;
    const productsData = await getData(1, search);
    showProducts(productsData);
});

const initApp = async () => {
    const productsData = await getData(1);
    showProducts(productsData);
    document.querySelector("#next-button").addEventListener("click", loadNextProducts);
    document.querySelector("#prev-button").addEventListener("click", loadPreviousProducts);
};

initApp();