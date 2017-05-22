/**
 * Created by DalinXie on 17/5/21.
 */
var express = require("express");
var router = express.Router();
var urlService = require("../services/urlService");

router.get("*",  function (req, res) {
    var shortUrl = req.originalUrl.slice(1);
    var longUrl = urlService.getLongUrl(shortUrl);
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.send("No such URL");
    }
    //console.log(req. body.longUrl);
});

module.exports = router;