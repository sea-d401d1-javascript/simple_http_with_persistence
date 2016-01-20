const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');//eslint-disable-line
const request = chai.request;

describe('HTTP server', () => {

  before(function(done) {
    this.server = require(__dirname + '/../lib/server');
    done();
  });

  after(function(done) {
    this.server.close(done);
  });


  it('should have run server', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello world ');
        done();
      });
  });

  it('should have greet user', (done) => {
    request('localhost:3000')
      .get('/greet')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, user ');
        done();
      });
  });

  it('should create a new test file', (done) => {
    request('localhost:3000')
    .post('/data/')
    .send({ name: 'tester'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.have.eql('Hello, user ');
      done();
    });
  });

  it('should 404 on a page that does not exist', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('Page not found');
        done();
      });
  });

});
