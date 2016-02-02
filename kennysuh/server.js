var http = require('http');
var fs = require('fs');

var server = module.exports = http.createServer(function(req, res) {
  if(req.method == 'GET' && req.url == '/') {
    fs.access(__dirname + '/data/file.json', function(err) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write('Error: No File Created Yet');
      } else {
        var index = fs.createReadStream(__dirname + '/data/file.json');
        res.writeHead(200, {'Content-Type': 'application/json'});
        return index.pipe(res);
      }
    });
  } else if(req.method == 'POST' && (req.url == '/')) {
    var json = '';
    req.on('data', function(chunk) {
      json += chunk.toString();
    });
    req.on('end', function() {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('{"msg":"file written"}');
      res.end();
      fs.writeFileSync(__dirname + '/data/file.json', JSON.stringify(json));
    })
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'page not found'}))
    return res.end();
  }
});

server.listen(3000, function() {
  console.log('server up');
})
