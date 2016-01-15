var Router = exports = module.exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'FourOhFour': function(req, res) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({msg: 'file not found'}.msg));
      return res.end(); 
    }
  };
};

Router.prototype.get = function(callback) {
  this.routes['GET'] = callback;
};

Router.prototype.post= function(callback) {
  this.routes['POST'] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {

    var routeFunction = this.routes[req.method] || this.routes.FourOhFour;
    routeFunction(req, res);
  };
};