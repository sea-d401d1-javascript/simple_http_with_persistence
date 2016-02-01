const http = require('http');
const handler = require(__dirname + '/handler.js');

module.exports = function(port){
  var server = http.createServer( handler() );
  server.listen(port, () => console.log('server\'s up, dude! Port: ' + port)); //eslint-disable-line
};