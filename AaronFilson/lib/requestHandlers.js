const fs = require('fs');
const url = require('url');

function start(request, response){
  var contentVar = 'Hi. This is the index page. Try going to the /store page.';
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(contentVar);
  response.end();
}

function store(request, response){

  function storeCallB(err, data){
    if(err){
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write("Error " + err + " on storing JSON.");
      response.end();
    }

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Success on storing JSON");
    response.end();
  }

  if(request.method == 'PUT'){
    var dataObj;
    var theQ = url.parse(request.url).query;
    var filename = theQ ? theQ : Date.now();
    filename = filename.replace('=', ''); //test files tend to have an = added
    var pathname = __dirname + '/../dStore/' + filename;

    request.on('data', function(chunk){
      dataObj += chunk;
    });

    request.on('end', function(){
      fs.writeFile(pathname, dataObj, storeCallB);
    });
  }

  if(request.method == 'POST'){
    var dataObj2;
    var theQ2 = url.parse(request.url).query;
    var filename2 = theQ2 ? theQ2 : Date.now();
    filename2 = filename2.replace('=', ''); //test files tend to have an = added
    var pathname2 = __dirname + '/../dStore/' + filename2;

    request.on('data', function(chunk){
      dataObj2 += chunk;
    });

    request.on('end', function(){
      fs.writeFile(pathname2, dataObj2, storeCallB);
    });
  }

  if(request.method == 'GET'){
    var theQ3 = url.parse(request.url).query;
    var filename3 = theQ3 ? '/../dStore/' + theQ3 : '/../dStore/basicFile.json';
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
