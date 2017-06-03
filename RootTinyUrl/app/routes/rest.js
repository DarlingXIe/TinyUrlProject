/**
 * Created by DalinXie on 17/5/19.
 */
var express = require("express");
var router = express.Router();
var bodyPaser = require("body-parser");
var jsonParser = bodyPaser.json();
var urlService = require("../services/urlService");
var statsService = require("../services/statsService");
var path = require('path');

router.post("/urls", jsonParser, function (req, res) {
    var longUrl = req.body.longUrl;
    if (longUrl.indexOf("http") === -1) {
        longUrl = "http://" + longUrl;
    }
    // var shortUrl = urlService.getShortUrl(longUrl);
    // res.json({
    //    shortUrl: shortUrl,
    //    longUrl: longUrl
    // });
    urlService.getShortUrl(longUrl, function (url) {
        res.json(url);
    });
    //console.log(req. body.longUrl);

});

router.get('/urls/:shortUrl',function (req, res) {
    var shortUrl = req.params.shortUrl;
    urlService.getLongUrl(shortUrl, function (url) {
        //console.log(url);
        if(url) {
            res.json(url);
        } else {
            //res.status(404).send("worry page");
            console.log('long Url is null');
            res.status(200).sendFile('index.html', { root: path.join(__dirname, '../public/')});
        }
    });
});

router.get('/urls/:shortUrl/:info', function(req,res) {
    var shortUrl = req.params.shortUrl;
    var info = req.params.info;
    statsService.getUrlInfo(shortUrl, info, function(data) {
        res.json(data);
    });

});


module.exports = router;

