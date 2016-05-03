const chai = require('chai'),
      chaihttp = require('chai-http');
      chai.use(chaihttp);

const expect = chai.expect;
require(__dirname + '/../server');

var server = 'localhost:3000';

describe('GET request to /data', function() {
  it('should respond to POST request by greeting the name in the request body', function(done) {
    chai.request(server)
      .post('/data/post')
      .send('{"name": "joeBlow"}')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response).to.have.status(200);
        expect(response.text).to.eql('{"name": "joeBlow"}');
        done();
      });
  });
  it('should respond to GET request to /data by returning the contents of the dir', function(done) {
    chai.request(server)
      .get('/data')
      .end(function(error, response) {
        expect(error).to.eql(null);
        expect(response).to.have.status(200);
        console.log('GET test');
        expect(response.text).to.not.be.null;
        done();
      });
  });
});
