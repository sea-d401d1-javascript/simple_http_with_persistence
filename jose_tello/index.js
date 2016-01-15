const http       = require('http');
const fs         = require('fs');
const util       = require('util');
const formidable = require('formidable');

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
      fs.writeFile('test.json', data, (err) => {
        if (err) return 'Error';
        console.log('file saved');
      });
    });
}).listen(PORT);

console.log('Server is running on port ' + PORT);
