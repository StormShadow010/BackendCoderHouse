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

/*************
    SERVER
**************/
const server = express() // <- Initialize Express server
const port = 8080 // <- Define the port number for the server
const ready = () => console.log("Server ready on port:" + port) //<-Callback ready to check that the server is up
// server.listen(port, ready) // <- Start the server and listen on the specified port Without Socket

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