var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
require(__dirname + '/../server');
var fs = require('fs');

describe('the server', function() {
  it('should respond to a POST request', function(done) {
    chai.request('localhost:3000')
    .post('/data')
    .send('{}')
    .end(function(res, req) {
      expect(req.text).to.eql('{}');
      done();
    });
  });
});

describe('GET request', function() {
  before(function() {
    this.dirData = fs.readdirSync(__dirname + '/../data').toString();
  });

  it('should return array', function(done) {
    chai.request('http://localhost:3000')
      .get('/data')
      .end(function(err, res) {
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      }.bind(this));
  });
});
