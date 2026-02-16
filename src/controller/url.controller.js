const UrlService = require("../service/url.service");



exports.createShortUrl = async (req, res) =>
{
    try {
        const { originalUrl, customAlias, expiresAt } = req.body;
        console.log("Creating url", originalUrl);
        const url = await UrlService.createShortUrl(
        originalUrl,
      customAlias,
      expiresAt
    );

     return res.status(201).json({
      shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}`
    })
        
    } catch (error) {
        res.status(500).json({
      message: error.message
    });
  }
        
}



exports.originalShortCode = async (req, res) =>
{
  try {

    const {shortCode} = req.params;
    console.log("shortcode", shortCode);
      
     const originalUrl  = await UrlService.getOriginalUrl(shortCode);
     console.log("originalUrl", originalUrl);
     if(!originalUrl)
     {
          return res.status(404).json({
        message: "Short URL not found or expired"
      });
     }

     return res.redirect(originalUrl);

    
  } catch (error) {
    console.error(error)
      return res.status(500).json({
      message: "Internal server error"
    });
  }
    
  }
    




    