const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');

var router = new Router();
var count = 0;

router.get('/data', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  return res.end();
});

router.post('/data', function(req, res) {
  var count = 'data/' + count++ + '.json';
  var body = '';
  req.on('data', function(data) {
    body += data.toString();
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('' + body);
    fs.writeFile(count, body, function(err) {
      if (err) throw err;
    });
    return res.end();
  });
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('server up'));
