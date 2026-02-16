
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again after a minute"
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,   // Disable the old X-RateLimit headers
});

module.exports = limiter;
