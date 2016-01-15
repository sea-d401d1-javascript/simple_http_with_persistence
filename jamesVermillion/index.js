const server = require(__dirname + '/lib/server.js');

var port = process.argv[2] || 3000;
server(port);