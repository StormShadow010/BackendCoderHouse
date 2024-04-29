import "dotenv/config.js";
import express from "express"
import morgan from "morgan"


import { errorHandler, pathHandler } from "./src/middlewares/index.mid.js"
import indexRouter from "./src/routers/index.router.js"
import __dirname from "./utils.js"
import { dbConnection } from "./src/utils/mongo/dbConnection.util.js";

//HTTP Server
const server = express()
const port = process.env.PORT || 9000;
const ready = () => {
  console.log("Server ready on port:" + process.env.PORT)
  dbConnection()
}
server.listen(port, ready)
//MIDDLEWARES - EXPRESS
server.use(express.urlencoded({ extended: true })) // <-- Allows the server to read req.param and req.query
server.use(express.json()); // <-- Allows the server to read req.body (parse incoming requests with JSON payloads)
server.use(morgan("dev")) //Record each of the requests
server.use(express.static(__dirname + "/public"));
//ROUTER MAIN
server.use("/", indexRouter);
//MIDDLEWARES - OWN
server.use(errorHandler);
server.use(pathHandler);