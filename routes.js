var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

module.exports = function(app) {

	app.get('/scrape', function(req, res) {

		url = 'http://www.imdb.com/title/tt3385516/'; // x-men apocalypse

		// the first parameter of our request call is our url

		// the callback function takes 3 parameters: an error, response status code and the html
		request(url, function(error, res, html){

			// we check if error occured when making the request
			if(!error){
				// if no error occured we'll use cheerio library on the returned html
				var $ = cheerio.load(html);
				// we define variables we're going to capture
				var title, release, rating;
				var json = { title : "", release : "", rating : ""};

				// we use unique header class as a starting point

				$('.title_wrapper').filter(function(){
					var data = $(this);

					// examining the DOM we notice that the tile rests within the first child element of the header

					title = data.children().first().text();

					// we store the title in the json object.
					json.title = title;
				});

				$('.subtext').filter(function(){
					var data = $(this);

					release = data.children().last().text();

					json.release = release;
				});

				$('.ratingValue').filter(function(){
					var data = $(this);

					rating = data.text();

					json.rating = rating;
				});
			
				// To write to the system we will use the built in 'fs' library.
				// In this example we will pass 3 parameters to the writeFile function
				// Parameter 1 :  output.json - this is what the created filename will be called
				// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
				// Parameter 3 :  callback function - a callback function to let us know the status of our function

				fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

					console.log('File successfully written - Check your project directory for the output.json file.');
				});

			} else {
				console.log("Error in request " + error);
			}

			// finally, reminding this app doesn't have a UI
			//res.send('Check your console!');
		}); //request

	}); //app.get
} //module