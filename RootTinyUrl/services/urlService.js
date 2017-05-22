/**
 * Created by DalinXie on 17/5/19.
 */
/*
*   getShortUrl:
*
* */
var longToShort = {};
var shortToLong = {};

var getShortUrl = function (longUrl) {
        if (longToShort[longUrl] != null) {
            return longToShort[longUrl];
        } else {
            var shortUrl = generateShortUrl(longUrl);
            longToShort[longUrl] = shortUrl;
            shortToLong[shortUrl] = longUrl;
            return shortUrl;
        }
};
var generateShortUrl = function (longUrl) {
    return Object.keys(longToShort).length;
}
var getLongUrl = function (shortUrl) {
    return shortToLong[shortUrl];
}
module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};