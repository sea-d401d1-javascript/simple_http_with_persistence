var url = require('url');

function start(request, response){
  console.log('in start handler');
  var contentVar = 'Hi. This is the index page. Try going to the /store page.';
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(contentVar);
  response.end();
  return contentVar;
}

function store(request, response){
  console.log('in store handler');
  if(request.method == 'PUT'){
    console.log('handling PUT method in store');
  }

}

exports.start = start;
exports.store = store;
