//toDo web server.
var express = require('express');
var app = express();
var restRouter = require("./routes/rest");
var redirectRouter  = require("./routes/redirect");
var indexRouter = require("./routes/index");
//mongodb://<dbuser>:<dbpassword>@ds151951.mlab.com:51951/tinyurlproject
var mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds151951.mlab.com:51951/tinyurlproject');

var useragent = require('express-useragent');

app.use(useragent.express());

app.use('/', indexRouter);

app.use("/api/v1", restRouter);

app.use(express.static('public'));

app.use("/:shortUrl", redirectRouter);

app.listen(3000, function () {
   console.log('tinyUrl app listening on port 3000');
});