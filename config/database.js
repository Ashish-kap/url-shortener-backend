const { Sequelize } = require("sequelize");
require("dotenv").config();
const config = require("./config.js");
const environment = process.env.NODE_ENV || "development";
const envConfig = config[environment];
let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    envConfig.database,
    envConfig.username,
    envConfig.password,
    {
      host: envConfig.host,
      dialect: "postgres",
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
}

module.exports = sequelize;
