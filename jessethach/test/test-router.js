const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');//eslint-disable-line
const request = chai.request;

const server = require(__dirname + '/../lib/server.js');//eslint-disable-line

describe('HTTP server', () => {
  after(() => {
    server.close();
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

  it('should have run server', (done) => {
    request('localhost:3000')
      .get('/greet')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello, user ');
        done();
      });
  });

  it('should read data from first json file', (done) => {
    request('localhost:3000')
      .get('/data/1.json')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql({"noteBody":"hello world"});
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
