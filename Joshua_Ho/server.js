const http = require('http');
const fs = require('fs');

var port = 3000;

var server = module.exports = exports = http.createServer( (req , res) => {

	if (req.method === 'GET') {
		//Stream data from my index.html page
		var website = fs.createReadStream( __dirname + '/lib/index.html');

		//Pipe it to the response
		res.writeHead( 200 , {'Content-Type' : 'text/html'} );
		website.pipe(res);
	}

	if (req.method === 'POST') {
		//How to handle data - Only accepts JSON
		req.on('data' , (chunk) => {
			//Take the JSON object and assign it to something
			var newData = JSON.parse(chunk);
			var newDate = new Date();
			var numFiles;

			fs.readdir( __dirname + '/log' , ( err , files ) => {
				numFiles = files.length;

				var newFile = fs.createWriteStream( __dirname + '/log/client_log_' + numFiles++ + ".txt" ); 

				newFile.write(JSON.stringify(newData));			
				console.log( 'client_log_' + numFiles++ + ".txt created.");

			});
			//use fs module to write a new file with the JSON object to dir /log
		});

		req.on('end' , () => {

			//Very considerate response to the client posting to the server 
			res.writeHead(200 , {'Content-Type' : 'application/json'});
			res.write( JSON.stringify({msg: "Hey guy, Object Received :)"}) );

			res.end();
		})
	}

});

server.listen( port , () => {

	console.log('Server is running. Port: ' + port );

});

// For this assignment, write an http server that will act as a simple data store. 
// It should respond to GET/POST requests for a single resource of your choosing. The data coming in 
// from a post request should be saved to a json file in a data folder in your repository, do not commit 
// your data folder to git. For example if a request is sent to /notes with a body of 
// {noteBody: 'hello world'} the json data in the body should be stored in it's own json file. You can 
// pick a naming scheme for the file but I would recommend using the number of files that you have received 
// so far. Submit as a pull request to your own repository.