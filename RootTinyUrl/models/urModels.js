/**
 * Created by DalinXie on 17/5/24.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UrlSchema = new Schema({
    longUrl: String,
    shortUrl: String
});
var urlModel = mongoose.model('urlModel', UrlSchema);

module.exports = urlModel;