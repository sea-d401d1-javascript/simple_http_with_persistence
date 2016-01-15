const Router = require(__dirname + '/router');
const http = require('http');
const fs = require('fs');

const dataDir = __dirname + '/../data/';
var counter = 0;
var router = new Router();

router.get('/hat', function(req, res) {
  console.log(req.url);
  var filename = req.url.split('/')[2];
  fs.readFile(dataDir + filename + '.json', (err, data) => {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data.toString());
    res.end();
  });
});

router.post('/hat', function(req, res) {
  console.log(req.url);
  var body = '';
  var filename = req.url.split('/')[2] || ++counter;
  req.pipe(fs.createWriteStream(dataDir + filename + '.json'));
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(body);
    res.end();
  });
});


var server = module.exports = exports = http.createServer(router.route());
server.listen(3000, () => {console.log('server up on port 3000');})
