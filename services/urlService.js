const { Url } = require("../models");
const { generateShortCode } = require("../utils/helpers");
const { validateUrl } = require("../utils/validation");
const { ValidationError, NotFoundError } = require("../utils/errors");

class UrlService {
  async createShortUrl(originalUrl) {
    try {
      validateUrl(originalUrl);

      const existingUrl = await Url.findOne({
        where: { original_url: originalUrl },
      });
      if (existingUrl) return existingUrl;

      const shortCode = generateShortCode();
      return await Url.create({
        original_url: originalUrl,
        short_code: shortCode,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new ValidationError(error.message);
      }
      throw error;
    }
  }

  async getOriginalUrl(shortCode) {
    const url = await Url.findOne({ where: { short_code: shortCode } });
    if (!url) {
      throw new NotFoundError("Short URL not found");
    }

    await this.incrementClicks(url);
    return url.original_url;
  }

  async incrementClicks(url) {
    url.clicks += 1;
    await url.save();
  }

  async getAnalytics(shortCode) {
    const url = await Url.findOne({
      attributes: ["short_code", "original_url", "clicks", "createdAt"],
      where: { short_code: shortCode },
    });

    if (!url) {
      throw new NotFoundError("Short URL not found");
    }
    return url;
  }

  async getAllUrls({ page, limit }) {
    const offset = (page - 1) * limit;

    return Url.findAndCountAll({
      attributes: ["id", "original_url", "short_code", "clicks", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });
  }
}

module.exports = new UrlService();
