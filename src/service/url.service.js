const prisma = require("../utils/client");
const {generateShortCode} = require("../utils/generateShortCode");
const {isValidHttpUrl} = require("../utils/validateUrl");



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
          where: { shortCode }
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
    const url = await prisma.url.findUnique({
      where: { shortCode }
    });

    if (!url) return null;

    if (url.expiresAt && url.expiresAt < new Date()) {
      return null;
    }

    
    await prisma.url.update({
      where: { shortCode },
      data: { clicks: { increment: 1 } }
    });

    return url.originalUrl;
  }
   
}


module.exports = UrlService;