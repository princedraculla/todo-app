require("dotenv").config();
const express = require('express')
const app = require('./routes/')
const { sequelize } = require("./models/index.js");
const SERVER_PORT = process.env.SERVER_PORT || 8000;







app.use(express.json())
const dbConnection = async () => {
  console.log("trying connect to database...");
  try {
    await sequelize.authenticate();
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