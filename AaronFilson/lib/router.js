var route = exports.route = function(handle, pathname, request, response){
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function'){
    return handle[pathname](request, response);
  } else {
    console.log('No handler found in route for ' + pathname);
    return '404';
  }
};
