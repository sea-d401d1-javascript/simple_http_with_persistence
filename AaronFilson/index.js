var server = require(__dirname + '/lib/server');
var router = require(__dirname + '/lib/router');
var requestHandlers = require(__dirname + '/lib/requestHandlers');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/index'] = requestHandlers.start;
handle['/store'] = requestHandlers.store;


var nowstart = exports.nowstart = function(){
  server.startserver(router.route, handle);
};

var nowstop = exports.nowstop = function(){
  server.stopserver();
};

if(process.argv[2] == 'now' || process.argv[3] == 'now'){
  server.startserver(router.route, handle);
}
