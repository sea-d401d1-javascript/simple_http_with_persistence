var http = require('http');
var url = require('url');

var startserver = exports.startserver = function(route, handle){
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var greetRegex = /\/greet/ ;

    if(greetRegex.test(pathname)){
      pathname = '/greet'
    }

    route(handle, pathname, request, response);
  }

  var servHandle = http.createServer(onRequest).listen(3040);
  console.log("Server has started on port 3040.");

  var stopper = function(){
    servHandle.close();
    console.log('Server stopped.')
  };

  var stopserver = exports.stopserver = stopper.bind(startserver);
};
