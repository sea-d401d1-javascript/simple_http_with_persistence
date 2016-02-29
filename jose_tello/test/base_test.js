const chai     = require('chai');
const server   = require(__dirname + '/../index');
const chaiHTTP = require('chai-http');
const fs       = require('fs');

chai.use(chaiHTTP);
const expect   = chai.expect;
const request  = chai.request;
var jsonString = '{"hello": "world", "goodbye": "everyone"}'

describe('test GET & POST on http server', () => {
  it('should have GET request responding with a resource', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should check POST request to see if data writes', (done) => {
    request('localhost:3000')
    .post('/')
    .send(jsonString)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(jsonString);
      done();
    });
  });
});
