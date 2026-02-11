const crypto = require("crypto");

exports.generateShortCode = (length = 6)=> {
  return crypto
    .randomBytes(length)
    .toString('base64url')
    .slice(0, length);
}
