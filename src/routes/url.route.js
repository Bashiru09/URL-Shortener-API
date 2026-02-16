const express = require("express");
const router = express.Router();
const {createShortUrl, originalShortCode} = require("../controller/url.controller");
const {createShortUrlValidator} = require("../validators/url-validator");
const {validate} = require("../middlewares/validate");
const limiter = require('../middlewares/ratelimiter');


router.post("/shorten", limiter , createShortUrl, validate, createShortUrlValidator);


router.get("/:shortCode", limiter , originalShortCode);


router.delete("/urls/:shortCode", (req, res)=>
{
    res.send("shortener");
});


module.exports = router;