var http = require('http');
var url = require('url');

var startserver = exports.startserver = function(route, handle){
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('server has a request for pathname : ' + pathname);

    var storeReg = /store/ ;

    if(storeReg.test(pathname)) pathname = '/store';

    console.log('pathname ended up as : ' + pathname);
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
