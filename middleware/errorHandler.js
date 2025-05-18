const { ValidationError, NotFoundError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: "Not Found",
      message: err.message,
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Conflict",
      message: "Short code already exists",
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong",
  });
};

module.exports = errorHandler;
