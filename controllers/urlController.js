const urlService = require("../services/urlService");
const { ValidationError } = require("../utils/errors");

const urlController = {
  shortenUrl: async (req, res, next) => {
    try {
      const { originalUrl } = req.body;
      if (!originalUrl) {
        throw new ValidationError("Missing required field: originalUrl");
      }

      const url = await urlService.createShortUrl(originalUrl);
      res.status(201).json({
        shortCode: url.short_code,
        shortUrl: `${req.protocol}://${req.get("host")}/api/${url.short_code}`,
      });
    } catch (error) {
      next(error);
    }
  },

  redirect: async (req, res, next) => {
    try {
      const { code } = req.params;
      if (!code) {
        throw new ValidationError("Missing URL code");
      }

      const originalUrl = await urlService.getOriginalUrl(code);
      res.redirect(originalUrl);
    } catch (error) {
      next(error);
    }
  },

  getAnalytics: async (req, res, next) => {
    try {
      const { code } = req.params;
      if (!code) {
        throw new ValidationError("Missing URL code");
      }

      const analytics = await urlService.getAnalytics(code);
      res.json(analytics);
    } catch (error) {
      next(error);
    }
  },

  listUrls: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      if (isNaN(page) || isNaN(limit)) {
        throw new ValidationError("Invalid pagination parameters");
      }

      const urls = await urlService.getAllUrls({
        page: parseInt(page),
        limit: parseInt(limit),
      });
      res.json(urls);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = urlController;
