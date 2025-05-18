const express = require("express");
const router = express.Router();
const { shortenLimiter } = require("../config/rateLimit");
const urlController = require("../controllers/urlController");

router.post("/shorten", shortenLimiter, urlController.shortenUrl);
router.get("/all/url", shortenLimiter, urlController.listUrls);
router.get("/:code", shortenLimiter, urlController.redirect);
router.get("/analytics/:code", shortenLimiter, urlController.getAnalytics);


module.exports = router;
