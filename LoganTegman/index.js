'use strict';

const path = require('path');
const fs = require('fs');
const concat = require('concat-stream');
const server = require(path.join(__dirname, 'lib/server'));
const Router = require(path.join(__dirname, 'lib/router'));

const router = new Router();
const kittenDir = './kittens';
let counter = 0;

if (!fs.existsSync(kittenDir)) fs.mkdirSync(kittenDir);

fs.readdir(kittenDir, (err, data) => {
  if (err) return console.log(err);
  if (data.length === 0) return;
  counter = data.length;
});

router.post('/kittens', (req, res) => {
  const ws = fs.createWriteStream(path.join(kittenDir, ++counter + '.txt'));
  req.pipe(ws);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Kitten delivered successfully!');
  res.end();
})
.get('/kittens', (req, res) => {
  const concatArgs = concat((argBuffer) => {
    const args = JSON.parse(argBuffer);
    const filepath = path.join(kittenDir, args.kittenID + '.txt');
    if (!fs.existsSync(filepath)) {
      return router.routes['404'](req, res);
    }
    const rs = fs.createReadStream(filepath);
    res.writeHead(200, {'Content-Type': 'application/json'});
    rs.pipe(res);
  });
  req.pipe(concatArgs);
});

const serverInstance = server.start(3000, router);

module.exports = serverInstance;
