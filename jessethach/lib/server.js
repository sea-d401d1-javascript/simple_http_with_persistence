const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');
const greet = require(__dirname + '/greet');

var router = new Router();
var requestCount = 0;

router.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello world ');
  return res.end();
});

router.get('/greet', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(greet());
  return res.end();
})

router.get('/data/', function(req, res) {
  var resReadStream = fs.createReadStream(__dirname + '/data/1.json');
    res.writeHead(200,{'Content-Type': 'application/json'});
    resReadStream.pipe(res);
    return res.end();
});

router.post('/data/', function(req, res) {
  var requestFile = '/../data/' + ++requestCount + '.json';
  var filestream = fs.createWriteStream(__dirname + requestFile);
  var resBody = '';
  req.pipe(filestream);
  req.on('data', (chunk) => {
  resBody += chunk;
  });
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(greet(JSON.parse(resBody).name));
    return res.end();
  });
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('server up'));
