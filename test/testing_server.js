const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');

var router = new Router();
var fileCount;
var path = __dirname + '/../data';

fs.readdir(path, function (err, files) {
  if (err) throw err;
  fileCount = files.length;
});

router.post('/note', function(req, res) {
  var newFile = 'data/request_' + ++fileCount + 'json';
  var result = '';
  req.on('data', function(chunk) {
    result += chunk.toString();
  });

req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('' + result);
    fs.writeFile(newFile, result, function(err) {
      if (err) throw err;
    });
    return res.end();
  });
});

router.get('/note', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'All the notes' + req.url.slice(6) + '!'}));
  return red.end();
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('Server up'));
