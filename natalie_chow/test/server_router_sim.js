const Router = require(__dirname + '/../lib/router');
const http = require('http');

var router = new Router();

router.get('/hello', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello world'}));
  res.end();
});

router.post('/hello', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'you posted something'}));
  res.end();
});

var server = http.createServer(router.route());
server.listen(3000, () => {console.log('server up on port 3000');});
