const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const Router = require(__dirname + '/lib/router');
const dir = './data';

var PORT = 3000;

var router = new Router();

router.get('/home', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify({
    msg: 'Hello World'
  }));
  res.end();
});


var counter = 0;

router.post('/home', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  req.on('data', function(chunk) {

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    var filename = 'data/' + counter + '.json';
    var newData = querystring.parse(chunk.toString());
    fs.writeFile(filename, JSON.stringify(newData), function() {
      res.end();
    });
    counter++;
  });

  res.write(JSON.stringify({
    mg: 'POST RECEIVED'
  }));

})

var server = module.exports = exports = http.createServer(router.route())
  .listen(PORT, () => {
    console.log('Server running on port ' + PORT + '\n');
  })