const prisma = require("../utils/client");
const {generateShortCode} = require("../utils/generateShortCode");
const {isValidHttpUrl} = require("../utils/validateUrl");
const redisClient = require("../config/redis");



class UrlService {
    
  static async createShortUrl(originalUrl, customAlias = null, expiresAt = null) {

    if (!isValidHttpUrl(originalUrl)) {
      throw new Error('Only http:// and https:// URLs are allowed');
    }

    let shortCode;

    if (customAlias) {
      const existing = await prisma.url.findUnique({
        where: { shortCode: customAlias }
      });


      if (existing) {
        throw new Error('Custom alias already in use');
      }

      shortCode = customAlias;
    } 
    else {
      let exists = true;

      while (exists) {
        shortCode = generateShortCode();

        exists = await prisma.url.findUnique({
          where: { shortCode}
        });
      }
    }

    return prisma.url.create({
      data: {
        originalUrl,
        shortCode,
        expiresAt
      }
    });
  }

  
  
  static async getOriginalUrl(shortCode) {

     const cachedUrl = await redisClient.get(shortCode);

     if (cachedUrl) {
    console.log("Cache HIT");
    return cachedUrl;
    }

    console.log("Cache MISS");

    const url = await prisma.url.findUnique({
      where: { shortCode }
    });

    if (!url) return null;

    if (url.expiresAt && url.expiresAt < new Date()) {
      return null;
    }

    // Store in Redis (cache it)
  await redisClient.set(shortCode, url.originalUrl, {
    EX: 60 * 60 // 1 hour expiration
  });


    await prisma.url.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } }
    });

    return url.originalUrl;
  }
   
}


module.exports = UrlService;