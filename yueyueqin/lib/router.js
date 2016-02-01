var Router = module.exports = exports = function() {
  this.routes = {
    'GET':{},
    'POST':{},
    '404': function(req,res) {
      res.writeHead(404,{'Content-Type':'application/json'});
      res.write(JSON.stringify({msg: 'page not found'}));
      return res.end();
    }
  };
};

Router.prototype.get = function(url,callback){
  this.routes['GET'][url]=callback;
};

Router.prototype.post = function(url,callback){
  this.routes['POST'][url]=callback;
};

Router.prototype.route = function(req,res){
  return (req,res) => {
    var routerFunction = this.routes[req.method][req.url] || this.routes['404'];
    routerFunction(req,res);
  };
};
