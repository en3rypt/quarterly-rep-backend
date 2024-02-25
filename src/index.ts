import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./routes";
import logger from "./utils/logger";
import errorHandler from "./utils/errorHandler";
import swagger from "./utils/swagger";
import bodyParser from "body-parser";
import upload from "./middleware/upload.middleware";
var listEndpoints = require("express-list-endpoints");

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
app.use(express.json()); // For parsing JSON payloads
app.use(upload.array("files"));
app.use(router);

app.listen(port, () => {
  logger.info(`[System] express server is running at http://localhost:${port}`);
  swagger(app, port);
  const endpoints = listEndpoints(app);
  endpoints.forEach((endpoint: any) => {
    endpoint.methods.forEach((method: any) => {
      logger.info(`[${method}]  ${endpoint.path}`);
    });
  });
});
