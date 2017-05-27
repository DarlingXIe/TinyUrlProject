/**
 * Created by DalinXie on 17/5/25.
 */
var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/",  function (req, res) {
    //res.redirect(url.longUrl);
    res.sendfile('index.html', { root: path.join(__dirname, '../public')});
});

module.exports = router;