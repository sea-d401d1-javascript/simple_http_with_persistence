var chai = require('chai');
var server = require(__dirname + '/../server');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
var request = chai.request;

describe('simple http server', function() {
  after(() => {
    server.close();
  });
  it('should write a file', function(done) {
    request('localhost:3000')
      .post('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('file written');
        done();
      });
  });

  it('should read a file', function(done) {
    request('localhost:3000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).not.eql(null);
        done();
      });
  });

  it('should 404 on a nonexistent page', function(done) {
    request('localhost:3000')
      .get('/dne')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });
});
