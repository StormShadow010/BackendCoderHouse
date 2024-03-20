import express from "express"
import productsManager from "./data/fs/ProductsManager.fs.js"

//Definir un servidor
const server = express()

//Port de servidor
const port = 8080

//Callback ready para revisar que se levanta el servidor
const ready = () => console.log("Server ready on port:" + port)

//Se inicia el servidor
server.listen(port, ready)

//middlewares
server.use(express.urlencoded({ extended: true }))

//Router
server.get("/", async (requerimientos, respuesta) => {
    try {
        const all = await productsManager.read()

        return respuesta.status(200).json({
            response: all,
            success: true,
        })
    } catch (error) {
        console.log(error)
        return respuesta.status(500).json({
            response: "CODERAPI ERROR",
            success: false,
        })
    }
})

//Get all products o by category
server.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query;
        const all = await productsManager.read(category);

        const response = all.length !== 0 ? {
            response: all,
            category,
            success: true
        } : {
            statusCode: 404,
            response: null,
            message: "No products found",
            success: false
        };

        return res.status(response.success ? 200 : response.statusCode).json(response);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            response: error.message,
            success: false
        });
    }
});

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const one = await productsManager.readOne(pid);

        const response = one ? {
            response: one,
            success: true
        } : {
            statusCode: 404,
            response: null,
            message: "No product found",
            success: false
        };

        return res.status(response.success ? 200 : response.statusCode).json(response);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            response: error.message,
            success: false
        });
    }
});