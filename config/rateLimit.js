const rateLimit = require("express-rate-limit");

const shortenLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  message:
    "Too many URL shorten attempts from this IP, please try again after an hour",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { shortenLimiter };
