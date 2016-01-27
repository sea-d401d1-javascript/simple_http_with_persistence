var fs = require('fs'), fileCounter = 0;
module.exports = exports = require('http').createServer(function(req, res) {
  var messageToClient = '';
  fs.access(__dirname + '/../data', fs.F_OK, function(err) {
    if (err) fs.mkdirSync(__dirname + '/../data');
    if (req.method === 'GET') {
      fs.access(__dirname + '/../data/' + (fileCounter -1) + '.json', fs.F_OK, function (err1) {
        if (err1) writeFileSync(__dirname + '/../data/' + fileCounter.toString() + '.json', '{"message":"default"}');
        if (req.url === '/json') messageToClient = fs.readFileSync(__dirname + '/../data/' + (fileCounter - 1) + '.json').toString();
        writeMessageToClient(messageToClient, res);
      });
    } else if (req.method === 'POST' && req.url === '/json') {
      req.on('data', (chunk) => !req.body ? req.body = chunk.toString() : req.body += chunk.toString());
      req.on('end', function() {
        try {
          var json = JSON.parse(req.body);
          writeFileSync(__dirname + '/../data/' + fileCounter.toString() + '.json', req.body);
          writeMessageToClient('Data recorded.', res);
        } catch(e) {
          writeMessageToClient('Error, invalid JSON sent by request.', res);
        }
      });
    } else {
      res.writeHead(404);
      res.write('Resource not found.', function() {
        res.end();
      });
    }
  });
}).listen(3000);
var writeMessageToClient = function(message, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  if (message !== '') response.write((message + '\n'));
  response.end();
};
var writeFileSync = function(path, data) {
  fs.writeFileSync(path, data);
  fileCounter += 1;
}

/*
var fs = require('fs'), fileCounter = 0;
module.exports = exports = require('http').createServer(function(req, res) {
  fs.access(__dirname + '/../data', fs.F_OK, function(err) {
    if (err) fs.mkdirSync(__dirname + '/../data');
    if (req.method === 'GET' && req.url === '/json') {
      console.log('ajlfhalhgakhlkahdgl');
      fs.access(__dirname + '/../data/' + (fileCounter -1) + '.json', fs.F_OK, function (err1) {
        if (err1) writeFileSync(__dirname + '/../data/' + fileCounter.toString() + '.json', '{"message":"default"}');
        res.writeHead(parseInt(200));
        res.write(fs.readFileSync(__dirname + '/../data/' + (fileCounter - 1) + '.json').toString(), function() {
          res.end();
        });
      });
    } else if (req.method === 'POST' && req.url === '/json') {
      req.on('data', (chunk) => !req.body ? req.body = chunk.toString() : req.body += chunk.toString());
      req.on('end', function() {
        writeFileSync(__dirname + '/../data/' + fileCounter.toString() + '.json', req.body);
        res.writeHead(parseInt(200));
        res.write('Data recorded.', function() {
          res.end();
        });
      });
    } else {
      res.writeHead(parseInt(404));
      res.write('Resource not found.', function() {
        res.end();
      });
    }
  });
}).listen(3000);
*/
