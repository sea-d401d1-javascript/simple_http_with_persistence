var server = require(__dirname + '/lib/server');
var router = require(__dirname + '/lib/router');
var requestHandlers = require(__dirname + '/lib/requestHandlers');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/index'] = requestHandlers.start;
handle['/store'] = requestHandlers.store;


var nowStart = exports.serverstart = function(){
  server.start(router.route, handle);
};

var serverstop = exports.serverstop = function(){
  server.stop();
};

if(process.argv[2] == 'now' || process.argv[3] == 'now'){
  server.start(router.route, handle);
}
