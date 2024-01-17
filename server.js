import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { app } from "./routes/index.js";
import { db } from "./models/index.js";
const SERVER_PORT = process.env.SERVER_PORT || 8000;
// defination for swagger UI
const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "todo-app API",
      version: "1.4.1",
      description: "library API for Todo App",
    },
    servers: [
      {
        url: `http://localhost:${SERVER_PORT}`,
      },
    ],
  },
  apis:["./routes/*.js"]
};

import swaggerDocument from './swagger/swagger.json' assert { type: "json" };;
const specs = swaggerJsDoc(option)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
/**
 * async function for connect sequelize to
 * the database we config
 */
const dbConnection = async () => {
  console.log("trying connect to database...");
  try {
    await db.sequelize.authenticate();
    console.log("database connection established");
  } catch (error) {
    console.log("connection faild!", error);
    process.exit(1);
  }
};
/**
 * async foction fo starting app
 * invoking database connection function
 * and starting node app server
 */
(async () => {
  await dbConnection();

  app.listen(SERVER_PORT, () => {
    console.log(`app is running at ${SERVER_PORT}`);
  });
})();
