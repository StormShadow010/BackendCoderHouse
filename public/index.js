

const getData = async () => {
    let response = await fetch('http://localhost:8080/api/products', { mode: 'no-cors' });
    let data = await response.json();
    let products = data.response;
    // console.log(products);
    return products; // Add this line to return the products
}

const showProducts = (allData) => {
    //Container where the products will be seen
    const containerProducts = document.querySelector("#mainContainerProducts")
    ////Every time new ones are created, the container is emptied
    containerProducts.innerHTML = "";

    allData.map((product) => {
        //Create a new div
        const newDiv = document.createElement("div")
        //Add a class
        newDiv.className = `product ${product._id} `

        newDiv.innerHTML = `
            <a href="/products/product-detail.html?pid=${product._id}" class="group">
                <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                    <div class="flex items-end justify-end h-56 w-full bg-cover"
                        style="background-image: url(${`${product.photo}`});">
                        <button
                            class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <div class="px-5 py-3 bg-white">
                        <h3 class="text-gray-700 uppercase">${product.title}</h3>
                        <span class="text-gray-500 mt-2">${product.price}</span>
                    </div>
                </div>
            </a>
            `
        containerProducts.appendChild(newDiv)
    })

}


const mainFunction = async () => {
    //Get all products by fetching
    let allData = await getData()
    //Show products in landing page
    showProducts(allData)
}

mainFunction()
