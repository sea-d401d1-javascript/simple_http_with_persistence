const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');
const greet = require(__dirname + '/hello');

var router = new Router();
var requestCount = 0;

router.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  return res.end();
});

router.get('/hello', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(greet());
  return res.end();
})

router.get('/data/', function(req, res) {
  var resReadStream = fs.createReadStream(__dirname + '/data/one.json');
    res.writeHead(200,{'Content-Type': 'application/json'});
    resReadStream.pipe(res);
    return res.end();
});

router.post('/data/', function(req, res) {
  var requestFile = '/../data/' + ++requestCount + '.json';
  var filestream = fs.createWriteStream(__dirname + requestFile);
  var resBody = '';
  req.pipe(filestream);
  req.on('data', (dataChunk) => {
  resBody += dataChunk;
  });
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(greet(JSON.parse(resBody).name));
    return res.end();
  });
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('server up'));
