const fs = require('fs');
var filecount = 0;

exports.get = function(req,res) {
  res.writeHead(200, {'Content-Type':'application/json'});
  res.write(JSON.stringify({msg: 'howdy'}));
  res.end();
};

exports.post = function(req,res) {
  var body = '';
  var filename = filecount++ + '.json';

  req.setEncoding('utf8');
  req.on('data', function(chunkData) {
    body += chunkData;
  });

  req.on('end',function(){
    res.writeHead(200, {'Content-Type':'application/json'});
    fs.writeFileSync(__dirname + '/../data/' + filename,body,'utf8');
    res.write(body);
    res.end();
  });
};
