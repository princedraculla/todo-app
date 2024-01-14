require("dotenv").config();
module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    username: "torkash",
    password: "torkash1234",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    rejectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
