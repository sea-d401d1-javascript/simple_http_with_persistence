const chai = require('chai');
const fs = require('fs');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const http = require('http');
chai.use(chaiHttp);
const request = chai.request;

const server = require(__dirname + '/../lib/http_server.js');

describe('simple http server', () => {

  it('should run server', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Hello World');
        done();
      });
  });

  it('should read data from json', (done) => {
  request('localhost:3000')
    .get('/data/one.json')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body).to.eql({"hello": "how are you?"});
    });
});

it('should run server', (done) => {
  request('localhost:3000')
    .get('/hello')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Hello World');
      done();
    });
});

  it('should have 404 on page that\'s not found', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });
});
