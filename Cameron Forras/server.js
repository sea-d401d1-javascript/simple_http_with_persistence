var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.get('/data', function(req, res) {
  var fileNames = fs.readdirSync(__dirname + '/data');
  res.send(fileNames);
  res.end();
  console.log('Yo, reading directory!');
});

app.post('/data/:name', bodyParser.json(), function(req, res) {
  fs.writeFileSync(__dirname + '/data' + req.params.num + '.json', req.body + ',');
  res.send(req.body);
  console.log('Yo, posting to file!');
});

app.listen(3000, function() {
  console.log('Yo, server is up and runnin!');
});
