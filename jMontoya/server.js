const http = require('http'),
      fs = require('fs');

var server = http.createServer((req,res) => {
  if (req.method === 'GET' && req.url === '/data') {
    var file = fs.readdirSync(__dirname + '/data/').toString();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(file);
    res.end();
    console.log('done reading directory with JSON data');

  } else if (req.method === 'POST' && req.url === '/data/post') {
    var date = new Date();
    var nd = date.toUTCString();
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      fs.writeFileSync(__dirname + '/data/' + nd, body);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(body);
      console.log('posting data to file in directory');
      res.end();
    });
  }

}).listen(3000, () => { console.log('server started');});

module.exports = server;
