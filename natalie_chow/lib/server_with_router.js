const Router = require(__dirname + '/router');
const http = require('http');
const fs = require('fs');

const dataDir = __dirname + '/../data/';
var counter = 0;
var router = new Router();

router.get('/teapot', function(req, res) {
  console.log('Processing GET request for ' + req.url);

  fs.readdir(dataDir, (err, files) => {
    if (err) throw err;

    var filename = req.url.split('/')[2];
    if (files.indexOf(filename + '.json') === -1) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({msg: 'file does not exist'}));
      res.end();

    } else {
      fs.readFile(dataDir + filename + '.json', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data.toString());
        res.end();
      });
    }
  });
});

router.post('/teapot', function(req, res) {
  console.log('Processing POST request for ' + req.url);
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
server.listen(3000, () => {console.log('server up on port 3000');});
