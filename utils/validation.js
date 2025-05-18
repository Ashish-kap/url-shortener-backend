const validator = require("validator");
const { ValidationError } = require("./errors");

const validateUrl = (url) => {
  if (
    !validator.isURL(url, {
      require_protocol: true,
      require_valid_protocol: true,
      protocols: ["http", "https"],
    })
  ) {
    throw new ValidationError(
      "Invalid URL format. Must start with http:// or https://"
    );
  }
};

module.exports = { validateUrl };
