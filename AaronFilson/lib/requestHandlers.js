var url = require('url');
const fs = require('fs');
var storeFiles = require(__dirname + '/storeFiles');

function start(request, response){
  console.log('in start handler');
  var contentVar = 'Hi. This is the index page. Try going to the /store page.';
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(contentVar);
  response.end();
  return contentVar;
}

function store(request, response){
  console.log('in store handler');

  function storeCallB(err, data){
    if(err){
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Error " + err + " on storing JSON.");
      response.end();
      return;
    }

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Success on storing JSON");
    response.end();
    return;
  }

  if(request.method == 'PUT'){
    var dataObj;
    console.log('handling PUT method in store');
    request.on('data', function(chunk){
      dataObj += chunk;

    });
    request.on('end', function(){
      storeFiles.writeOne(dataObj, storeCallB);
    });
  }

  if(request.method == 'POST'){
    var dataObj;
    console.log('handling PUT method in store');
    request.on('data', function(chunk){
      dataObj += chunk;

    });
    request.on('end', function(){
      storeFiles.writeOne(dataObj, storeCallB);
    });
  }

  if(request.method == 'GET'){
    var fileP = __dirname + '/../dStore/basicFile.json';
    storeFiles.readOne(fileP, (err, data) => {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write((err) ? err : data);
      response.end();
    });

  }
}

exports.start = start;
exports.store = store;
