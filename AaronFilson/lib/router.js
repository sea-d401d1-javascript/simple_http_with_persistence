var route = exports.route = function(handle, pathname, request, response){
  if(typeof handle[pathname] === 'function'){
    return handle[pathname](request, response);
  } else {
    return '404';
  }
};
