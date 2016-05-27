var express = require('express');
var app = express();
var port = process.env.PORT || 8000 ;

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

require('./routes.js')(app);

app.listen(port, function() {
	console.log("Server running on port", port);
});