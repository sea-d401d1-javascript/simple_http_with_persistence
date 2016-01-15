var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.get('/:filename', function(req, res) {
  fs.readFile(__dirname + '/data/' + req.params.filename + '.json', function(err, data){
    var myObj = JSON.parse(data.toString());
    res.json(myObj);
    console.log('Yo, reading directory!');
  });
});

app.post('/:filename',jsonParser, function(req, res){
  var postString = JSON.stringify(req.body);
  fs.writeFile(__dirname + '/data/' + req.params.filename + '.json', postString, function(err){
      if (err) throw err;
      res.send(req.body);
      console.log('Yo, posting to file!');
    });
});

app.listen(3000, function() {
  console.log('Yo, server is up and runnin!');
});
