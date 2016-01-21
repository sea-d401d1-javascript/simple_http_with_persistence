const Router = require(__dirname + '/../index');
const http = require('http');
const fs = require('fs');
const fileHandler = require(__dirname + '/fileHandler.js');

var router = new Router();
router.get('/hello', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello world'}));
  res.end();
});

router.get('/anotherroute', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello from another route'}));
  res.end();
});

router.get('/index', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var index = fs.createReadStream(__dirname + '/../public/index.html');
  return index.pipe(res);
});

router.get('/donors', (req, res) => {
  var getDonors = fs.createReadStream(__dirname + '/../data/team.json');
  res.writeHead(200, {'Content-Type': 'application/json'});
  return getDonors.pipe(res);
});

router.post('/donors', (req, res) => {
  var filename = (new Date().toISOString()) + '.json';
  var newPath = '/../data/' + filename;
  fileHandler.writeFile(filename);
  var changePath = fs.rename(filename, newPath, () => {
    var putDonors = fs.createWriteStream(__dirname + newPath);
    req.pipe(putDonors);
    req.on('end', () => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({msg: 'File written to server!'}))
      res.end(fs.unlinkSync(filename));
    });
  });
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('Server started!'));
