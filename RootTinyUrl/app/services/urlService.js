/**
 * Created by DalinXie on 17/5/19.
 */
/*
*   getShortUrl:
*
* */
//var longToShort = {};
//var shortToLong = {};
var UrlModel = require('../models/urModels');

var encode = []; //["a", ... ,"z", "A", ... ,"Z", 0, ..., 9]

var genCharArray = function (charA, charZ) {
    var arr = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(genCharArray("a","z"));
encode = encode.concat(genCharArray("A","Z"));
encode = encode.concat(genCharArray("0","9"));

var getShortUrl = function (longUrl, callback) {
    UrlModel.findOne( { longUrl: longUrl }, function(err, url) {
        if (url) {
            callback(url);
        } else {
            generateShortUrl(function(shortUrl) {
                var url = new UrlModel({shortUrl: shortUrl, longUrl: longUrl});
                url.save();
                callback(url);
            });

        }
    });
};

var generateShortUrl = function (callback) {
    UrlModel.count( {}, function(err, length) {
        callback(convertTo62(length));
    });
};

var getLongUrl = function (shortUrl, callback) {
    UrlModel.findOne({shortUrl: shortUrl}, function(err, url) {
        callback(url);
    });
};

var convertTo62 = function (num) {
    var result = "";
    do {
        result = encode[num % 62] + result;
        num = Math.floor( num / 62 );
    } while (num);
    return result;
};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};