import { Express, Request, Response, Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from "./logger";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Quaterly Report API",
      version: "1.0.0",
      description: "API for quaterly report",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJsdoc(options);

const swagger = (app: Application, port: string | number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  logger.info(
    `[Swagger] Swagger is running at http://localhost:${port}/api-docs`
  );

  app.get("docs.json", (req: Request, res: Response) => {
    res.json(specs);
  });
  logger.info(
    `[Swagger] Swagger docs json is running at http://localhost:${port}/docs.json`
  );
};

export default swagger;
