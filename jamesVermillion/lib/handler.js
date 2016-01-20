const Router = require(__dirname + '/router.js');
const fs = require('fs');

module.exports = function(){
  var router = new Router();

  router.get( function(req, res) {
    fs.readFile( __dirname + '/../json' + req.url, 'utf8',(err, data)=>{
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
    var ws = fs.createWriteStream(__dirname + '/../json' + req.url, req );
    req.pipe(ws);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('your file has been stored as: ' + __dirname + '/../json' + req.url); 
    res.end();
  });
  
  return router.route();
};