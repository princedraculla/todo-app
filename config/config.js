import dotenv from 'dotenv'
dotenv.config()
export default{
  development: {
    url: process.env.DATABASE_URL,
    username: "torkash",
    password: "torkash1234",
    host: "localhost",
    port: 5433,
    dialect: "postgres",
    rejectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
