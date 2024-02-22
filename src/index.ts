import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./routes";
import logger from "./utils/logger";
import errorHandler from "./utils/errorHandler";
import swagger from "./utils/swagger";
import bodyParser from "body-parser";
var listEndpoints = require("express-list-endpoints");

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(errorHandler);
app.use(express.json()); // For parsing JSON payloads
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
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
