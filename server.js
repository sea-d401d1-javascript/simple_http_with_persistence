const Router = require(__dirname + '/lib/router');
const http = require ('http');
const requestHandlers = require(__dirname + 'lib/requestHandlers');

var router = new Router();

router.get('/howdy', requestHandlers.get);

router.post ('/note', requestHandlers.post);

var server = module.exports = exports = http.createServer(router.route());


server.listen(3000, () => console.log('Server up'));
