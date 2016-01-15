const Router = require(__dirname + '/router.js');
const http = require('http');
const fs = require('fs');

var router = new Router();

router.get( function(req, res) {
  fs.readFile(__dirname + '/../json' + req.url, 'utf8',(err, data)=>{
    if (err) return router.routes.FourOhFour(req, res);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data);
    res.end();  
  });
});

router.post( function(req, res) {
  if (!req.url.endsWith('.json')){
    return router.routes.FourOhFour(req, res);
  }
  var requestJSON = '';
  req.on('data', (data) => {
    requestJSON += data;
  });
  req.on('end', () => {
    fs.writeFile(__dirname + '/../json' + req.url, JSON.stringify(requestJSON) );
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('your file has been stored as: ' + __dirname + '/../json' + req.url); 
    res.end();
  });
});

var server = http.createServer(router.route());
server.listen(3000, () => console.log('server\'s up, dude! Port: 3000')); //eslint-disable-line