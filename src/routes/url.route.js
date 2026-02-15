const express = require("express");
const router = express.Router();
const {createShortUrl} = require("../controller/url.controller");
const {createShortUrlValidator} = require("../validators/url-validator");
const {validate} = require("../middlewares/validate");


router.post("/shorten", createShortUrl, validate, createShortUrlValidator);


router.get(":shortCode", (req, res)=>
{
    res.send("shortener");
});




router.delete("/urls/:shortCode", (req, res)=>
{
    res.send("shortener");
});


module.exports = router;