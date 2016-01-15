var Router = module.exports = exports = function() {
  this.router = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'PATCH': {},
    'DELETE': {},
    'FourOhFour': function(req, res) {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify({
        msg: '404.'
      }));
      return res.end();
    }
  };
}


var verbs = ['get', 'put', 'post', 'patch', 'delete'];

verbs.forEach(function(el, index) {
  Router.prototype[el] = function(url, callback) {
  	var newVerb = el.toUpperCase();
    this.router[newVerb][url] = callback;
  };
});


Router.prototype.route = function(options) {
  return (req, res) => {
    var routeFunction = this.router[req.method][req.url] || this.router.FourOhFour;
    routeFunction(req, res);
  }
}