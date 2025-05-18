const sequelize = require("../config/database")

const { DataTypes } = require("sequelize");

const Url = require("./url")(sequelize, DataTypes);

module.exports = {
  sequelize,
  Url,
};

