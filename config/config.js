require("dotenv").config();
const { parse } = require("pg-connection-string");

let productionConfig = {};

if (process.env.NODE_ENV === "production") {
  const config = parse(process.env.DATABASE_URL || "");
  productionConfig = {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
}

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: productionConfig,
};

