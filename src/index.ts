import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import router from "./routes";
import logger from "./utils/logger";
import errorHandler from "./utils/errorHandler";
import swagger from "./utils/swagger";
var listEndpoints = require("express-list-endpoints");

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`[System] express server is running at http://localhost:${port}`);
  swagger(app, port);
  const endpoints = listEndpoints(app);
  endpoints.forEach((endpoint: any) => {
    logger.info(`[${endpoint.methods}]  ${endpoint.path}`);
  });
});
