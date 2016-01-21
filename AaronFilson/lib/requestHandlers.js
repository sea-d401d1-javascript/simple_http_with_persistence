const fs = require('fs');
const url = require('url');

function start(request, response){
  var contentVar = 'Hi. This is the index page. Try going to the /store page.';
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(contentVar);
  response.end();
  return contentVar;
}

function store(request, response){
  
  function storeCallB(err, data){
    if(err){
      response.writeHead(500, {"Content-Type": "text/plain"});
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
    var theQ = url.parse(request.url).query;
    var filename = theQ ? theQ : Date.now();

    request.on('data', function(chunk){
      dataObj += chunk;

    });
    request.on('end', function(){
      fs.writeFile(filename, dataObj, storeCallB);
    });
  }

  if(request.method == 'POST'){
    var dataObj2;
    var theQ2 = url.parse(request.url).query;
    var filename2 = theQ2 ? theQ2 : Date.now();

    request.on('data', function(chunk){
      dataObj2 += chunk;

    });
    request.on('end', function(){
      fs.writeFile(filename2, dataObj2, storeCallB);
    });
  }

  if(request.method == 'GET'){
    var theQ3 = url.parse(request.url).query;
    var filename3 = theQ3 ? theQ3 : 'basicFile.json';
    var fileP = __dirname + filename3;
    fs.readFile(fileP, function (err, data) {
      if(err){
        response.writeHead(500, {"Content-Type": "application/json"});
        response.write(err.toString());
        response.end();
      }

      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(data);
      response.end();
    });

  }
}




exports.start = start;
exports.store = store;
