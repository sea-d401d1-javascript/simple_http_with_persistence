const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');

var router = new Router();
var fileCount;
var path = __dirname + '/../data';

fs.readdir(path, function (err, files) {  // determine fileCount
  if (err) throw err;
  fileCount = files.length;
  // console.log('there are ' + fileCount + ' files');
});

router.post('/note', function(req, res) {
  var newFile = 'data/request_' + ++fileCount + '.json';
  var result = '';
  req.on('data', function(chunk) {
    result += chunk.toString();
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('' + result);
    fs.writeFile(newFile, result, function(err) {
      if (err) throw err;
      // console.log('file saved as ' + newFile.slice(4)); // eslint-disable-line
    });
    return res.end();
  });
});
router.get('/note', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello ' + req.url.slice(6) + '!'}));
  return res.end();
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('server up'));  // eslint-disable-line
