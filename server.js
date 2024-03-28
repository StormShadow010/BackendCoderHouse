import express from "express"
import indexRouter from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"

/*************
    SERVER
**************/
const server = express() // <- Initialize Express server
const port = 8080 // <- Define the port number for the server
const ready = () => console.log("Server ready on port:" + port) //<-Callback ready to check that the server is up
server.listen(port, ready) // <- Start the server and listen on the specified port

/*************
  MIDDLEWARES - EXPRESS
**************/
server.use(express.urlencoded({ extended: true })) // <-- Allows the server to read req.param and req.query
server.use(express.json()); // <-- Allows the server to read req.body (parse incoming requests with JSON payloads)

/*************
  ROUTER MAIN
**************/
server.use("/", indexRouter);
/*************
  MIDDLEWARES - OWN
**************/
server.use(errorHandler);