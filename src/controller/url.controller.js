const UrlService = require("../service/url.service");



exports.createShortUrl = async (req, res) =>
{

    try {

        const { originalUrl, customAlias, expiresAt } = req.body;

    const url = await UrlService.createShortUrl(
        originalUrl,
      customAlias,
      expiresAt
    );

     return res.status(201).json({
      shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}`
    })
      

        
    } catch (error) {
        res.status(400).json({
      message: error.message
    });
  }
        
}



    