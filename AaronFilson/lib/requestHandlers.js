var storeFiles = require(__dirname + '/storeFiles');

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
    request.on('data', function(chunk){
      dataObj += chunk;

    });
    request.on('end', function(){
      storeFiles.writeOne(dataObj, storeCallB);
    });
  }

  if(request.method == 'POST'){
    var dataObj2;
    request.on('data', function(chunk){
      dataObj2 += chunk;

    });
    request.on('end', function(){
      storeFiles.writeOne(dataObj2, storeCallB);
    });
  }

  if(request.method == 'GET'){
    var fileP = __dirname + '/../dStore/basicFile.json';
    storeFiles.readOne(fileP, (err, data) => {
      if(err){
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(err);
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
