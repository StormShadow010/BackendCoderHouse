import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler, pathHandler } from "./src/middlewares/index.mid.js";
import indexRouter from "./src/routers/index.router.js";
import __dirname from "./utils.js";
import argsUtil from "./src/utils/args/args.util.js";
import variablesEnviroment from "./src/utils/env/env.util.js";

//HTTP Server
const server = express();
const port = variablesEnviroment.PORT || argsUtil.p;
const ready = () => {
  console.log("Server ready on port:" + port);
};
server.listen(port, ready);

//MIDDLEWARES - EXPRESS
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(cookieParser(variablesEnviroment.SECRET_COOKIE));
server.use(cors({ origin: true, credentials: true }));
//ROUTER MAIN
server.use("/", indexRouter);
//MIDDLEWARES - OWN
server.use(errorHandler);
server.use(pathHandler);
