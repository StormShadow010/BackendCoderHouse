import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import { errorHandler, pathHandler } from "./src/middlewares/index.mid.js";
import indexRouter from "./src/routers/index.router.js";
import __dirname from "./utils.js";
import { dbConnection } from "./src/utils/mongo/dbConnection.util.js";

//HTTP Server
const server = express();
const port = process.env.PORT || 9000;
const ready = () => {
  console.log("Server ready on port:" + process.env.PORT);
  dbConnection();
};
server.listen(port, ready);
//MIDDLEWARES - EXPRESS
server.use(cookieParser(process.env.SECRET_COOKIE));
server.use(
  session({
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      ttl: 10,
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(__dirname + "/public"));
//ROUTER MAIN
server.use("/", indexRouter);
//MIDDLEWARES - OWN
server.use(errorHandler);
server.use(pathHandler);
