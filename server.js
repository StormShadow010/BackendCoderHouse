import express from "express"
import productsManager from "./data/fs/ProductsManager.fs.js"
import usersManager from "./data/fs/UsersManager.fs.js"

/*************
    SERVER
**************/
const server = express() // <- Initialize Express server
const port = 8080 // <- Define the port number for the server
const ready = () => console.log("Server ready on port:" + port) //<-Callback ready to check that the server is up
server.listen(port, ready) // <- Start the server and listen on the specified port
/*************
  MIDDLEWARES
**************/
server.use(express.urlencoded({ extended: true })) // <-- Allows the server to read req.param and req.query
/*************
  ROUTES 
**************/
server.get("/", async (req, res) => {
    try {
        const all = await productsManager.read()
        return res.status(200).json({
            response: all,
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
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

//Get a product by ID
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
//Get all user o by rol
server.get("/api/users", async (req, res) => {
    try {
        const { role } = req.query;
        const all = await usersManager.read(role);
        const response = all.length !== 0 ? {
            response: all,
            role,
            success: true
        } : {
            statusCode: 404,
            response: null,
            message: "No users found",
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
})
//Get a user by ID
server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        const one = await usersManager.readOne(uid);
        const response = one ? {
            response: one,
            success: true
        } : {
            statusCode: 404,
            response: null,
            message: "No user found",
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
