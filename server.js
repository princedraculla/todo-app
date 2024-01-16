import dotenv from "dotenv"
dotenv.config()
import express  from 'express'
import {app} from'./routes/index.js'
import  {db}  from "./models/index.js"
const SERVER_PORT = process.env.SERVER_PORT || 8000;







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

(async () => {
  await dbConnection();

  app.listen(SERVER_PORT, () => {
    console.log(`app is running at ${SERVER_PORT}`);
  });
})();
