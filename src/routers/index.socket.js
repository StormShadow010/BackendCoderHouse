import productsManager from "../data/fs/ProductsManager.fs.js"

export default async (socket) => {
    //Socket Server
    socket.emit("products", await productsManager.read())
    socket.on("new product", async (data) => {
        await productsManager.create(data)
        socket.emit("products", await productsManager.read())
    })

}