const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');

var router = new Router();
router.get('/hello', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello world'}));
  res.end();
});

router.get('/anotherroute', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello from another route'}));
  res.end();
});

router.get('/index', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var index = fs.createReadStream(__dirname + '/../public/index.html');
  return index.pipe(res);
});

router.get('/donors', function(req, res) {
  var getDonors = fs.createReadStream(__dirname + '/../data/team.json');
  res.writeHead(200, {'Content-Type': 'application/json'});
  return getDonors.pipe(res);
});

router.post('/donors', function(req, res) {
  var putDonors = fs.createWriteStream(__dirname + '/../data/test.json');
  res.writeHead(200, {'Content-Type': 'application/json'});
  return req.pipe(putDonors);
  // req.on('end', function() {
  //   res.write(JSON.stringify({msg: 'hello from donor put'}));
  // });
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('Server started!'));
