'use strict';

const http = require('http');

exports.start = (port, router) => {
  const server = http.createServer(router.route());
  server.listen(port);
  return server;
};
