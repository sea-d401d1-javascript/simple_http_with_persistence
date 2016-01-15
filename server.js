const http = require ('http');
const fs = require('fs');

var server = module.exports = exports = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'time is: ' + new Date().toTimeString()}));
    return res.end();
  }

  else if (req.method === 'GET' && (req.url.slice(0,6) === '/greet' && req.url.length > 6)) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'howdy' + req.url.slice(7) + '!'}));
    return res.end();
  }

  else if (req.method === 'POST' && req.url === '/greet') {
    var result = ''
    req.on('data', function(chunk) {
      result += JSON.parse(chunk.toString()).msg;
    });
    req.on('end', function() {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({msg: 'howdy' + result}));
      return res.end();
    });
  }
  else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'page not found'}));
    return res.end();
  }
});

server.listen(3000, () => console.log('Server up'));
