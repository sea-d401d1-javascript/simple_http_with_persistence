const http = require('http');
const fs = require('fs');
const path = require('path');

var count = 1;

var server = http.createServer((req, res) => {
  fs.access(path.join(__dirname, '..', 'data'), fs.F_OK, function(err) {
    if (err) fs.mkdirSync(path.join(__dirname, '..', 'data'));
    if (req.method === 'GET' && req.url === '/notes') {
      fs.readdir(path.join(__dirname, '..', 'data'), function(err, files) {
        if (err) throw err;
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write(files.toString());
          return res.end();
        });
    } else if (req.method === 'POST' && req.url === '/notes') {
      req.on('data', (data) => {
        var specificFile = 'notes' + count + '.json';
        var file = path.join(__dirname, '..', 'data/') + specificFile;
        var notes = (data.toString());
        fs.writeFile(file, notes, function(err) {
          if (err) throw err;
          console.log(notes);
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write('Notes Posted in ' + file);
          count++;
          return res.end();
        });
      });
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({'msg': 'page not found'}));
        return res.end();
    }
  });
});

server.listen(3000, () => console.log('server on port 3000'));

module.exports = server;
