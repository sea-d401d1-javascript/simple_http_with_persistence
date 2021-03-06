const http       = require('http');
const fs         = require('fs');

var PORT = 3000;

var server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/lib/index.html', (err, data) => {
      if (err) return 'Error';
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(data);
      res.end();
    });
  };
  if (req.method === 'POST' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'application/json'});
    req.on('data', (data) => {
      console.log('Data: ' + data);
      var timestamp = new Date().toISOString();
      var path = 'data/' + timestamp + '.json';
      res.write(data);
      fs.writeFile(path, data, (err) => {
        if (err) return 'Error';
        console.log('file ' + timestamp + ' saved');
        res.end();
      });
    });
  }
}).listen(PORT);

console.log('Server is running on port ' + PORT);
