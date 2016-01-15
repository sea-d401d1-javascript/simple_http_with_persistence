const Router = require(__dirname + '/lib/router');
const http = require('http');
const requestHandlers = require(__dirname + '/lib/requestHandlers');

var router = new Router();

router.get('/welcome', requestHandlers.get);

router.post ('/note',requestHandlers.post);



var server = exports = module.exports = http.createServer(router.route());

server.listen(3000, () => {
  console.log('server up');
});
