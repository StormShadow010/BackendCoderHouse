import "dotenv/config.js";
import { engine } from "express-handlebars"
import express from "express"
import morgan from "morgan"

//Socket
import { createServer } from "http"
import { Server } from "socket.io";

import { errorHandler, pathHandler } from "./src/middlewares/index.mid.js"
import indexRouter from "./src/routers/index.router.js"
import __dirname from "./utils.js"
import socketCallBack from "./src/routers/index.socket.js"
import { dbConnection } from "./src/utils/mongo/dbConnection.util.js";

//HTTP Server
const server = express()
const port = process.env.PORT || 9000;
const ready = () => {
  console.log("Server ready on port:" + process.env.PORT)
  dbConnection()
}

//Server de Socket
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);
//Start Server
socketServer.on("connection", socketCallBack);
nodeServer.listen(port, ready) // <- Start the server Socket 
/*************
    Template Engine
**************/
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')
/*************
  MIDDLEWARES - EXPRESS
**************/
server.use(express.urlencoded({ extended: true })) // <-- Allows the server to read req.param and req.query
server.use(express.json()); // <-- Allows the server to read req.body (parse incoming requests with JSON payloads)
server.use(morgan("dev")) //Record each of the requests
server.use(express.static(__dirname + "/public"));

/*************
  ROUTER MAIN
**************/
server.use("/", indexRouter);
/*************
  MIDDLEWARES - OWN
**************/
server.use(errorHandler);
server.use(pathHandler);