import productsManager from "../data/fs/ProductsManager.fs.js"

export default async (socket) => {
    // console.log(`client ${socket.id} connected`)
    //Socket Server
    socket.emit("products", await productsManager.read())
    socket.on("new product", async (data) => {
        console.log(data)
        await productsManager.create(data)
        socket.emit("products", await productsManager.read())
    })

}