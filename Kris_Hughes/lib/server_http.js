const http = require('http');
const fs = require('fs');

var count = 1;

var server = http.createServer((req,res) => {
  if (req.method === 'GET' && req.url === '/notes') {
    fs.readdir(__dirname + '/../data', function(err, files) {
      if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(files.toString());
        return res.end();
      });
  
  } else if (req.method === 'POST' && req.url === '/notes') { 
    req.on('data', (data) => {
      var specificFile = 'notes' + count + '.json'; 
      var file = __dirname + '/../data/' + specificFile; 
      var notes = (data.toString());
      fs.writeFile(file, notes, function(err) {
        if(err) throw err;
        console.log(notes);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Notes Posted in ' + file);
        console.log()
        count ++;
        return res.end();
      });
    });

  } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({'msg': 'page not found'}));
      return res.end();
  }
});

server.listen(3000, () => { console.log('server started')});

module.exports = server;
