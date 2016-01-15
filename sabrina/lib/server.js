const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');

var router = new Router();
router.get('/hello', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello world'}));
  res.end();
});

router.get('/anotherroute', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello from another route'}));
  res.end();
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('Server started!'));
