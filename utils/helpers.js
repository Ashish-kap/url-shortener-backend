const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateShortCode = customAlphabet(alphabet, 8);

module.exports = {
  generateShortCode,
};
