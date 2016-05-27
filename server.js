var express = require('express');
var app = express();
var port = process.env.PORT || 8000 ;

require('./routes.js')(app);

app.listen(port, function() {
	console.log("Server running on port", port);
});