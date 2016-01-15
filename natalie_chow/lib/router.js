var Router = module.exports = exports = function() {
  this.routeLibrary = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'PATCH': {},
    'DELETE': {},
    'FourOhFour': function(req, res) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({msg: 'page not found'}));
      return res.end();
    }
  };
};

['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(function(verb) {
  Router.prototype[verb.toLowerCase()] = function(url, callback) {
    this.routeLibrary[verb][url] = callback;
  };
});

Router.prototype.route = function(options) {
  return (req, res) => {
    var endpoint = req.url.split('/')[1];
    var routeFunction = this.routeLibrary[req.method]['/' + endpoint] || this.routeLibrary.FourOhFour;
    routeFunction(req, res);
  };
};
