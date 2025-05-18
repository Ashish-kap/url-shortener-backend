const express = require("express");
const sequelize = require("./config/database");
const urlRoutes = require("./routes/urlRoutes");
const cors = require("cors");

const app = express();

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

app.set("trust proxy", process.env.NODE_ENV === "production" ? 1 : 0);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", urlRoutes);

module.exports = app;
