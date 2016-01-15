const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');

var fileCount = 0;
var router = new Router();

router.post('/note', function(req, res) {
  var newFile = 'data/request_' + ++fileCount + '.json';
  var result = '';
  req.on('data', function(chunk) {
    result += chunk.toString();
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'application/json'});
    fs.writeFile(newFile, result, function(err) {
      if (err) throw err;
      console.log('file saved as ' + newFile.slice(4)); //eslint-disable-line
    });
    return res.end();
  });
});

router.get('/anotherroute', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'another router'}));
  res.end();
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('server up'));
