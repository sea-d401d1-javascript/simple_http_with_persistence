const http = require('http');
const fs = require('fs');
const dataDir = __dirname + '/../data/';
var counter = 0;

var server = module.exports = exports = http.createServer((req, res) => {
  if (req.url.startsWith('/hat')) {
    var filename = req.url.split('/')[2];
    if (req.method === 'GET') {
      fs.readFile(dataDir + filename + '.json', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data.toString());
        res.end();
      });
    } else if (req.method === 'POST') {
      var body = '';
      filename = filename || ++counter;
      req.pipe(fs.createWriteStream(dataDir + filename + '.json'));
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(body);
        res.end();
      });
    }
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'page not found'}));
    res.end();
  }
});

server.listen(3000, () => {
  console.log('server running on port 3000');
});
