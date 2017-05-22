/**
 * Created by DalinXie on 17/5/19.
 */
var express = require("express");
var router = express.Router();
var bodyPaser = require("body-parser");
var jsonParser = bodyPaser.json();
var urlService = require("../services/urlService");

router.post("/urls", jsonParser, function (req, res) {
    var longUrl = req.body.longUrl;
    if (longUrl.indexOf("http") === -1) {
        longUrl = "http://" + longUrl;
    }
    var shortUrl = urlService.getShortUrl(longUrl);
    res.json({
       shortUrl: shortUrl,
       longUrl: longUrl
    });
    //console.log(req. body.longUrl);
});

module.exports = router;

