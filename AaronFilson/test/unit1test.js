/*eslint-disable no-unused-vars */
const mocha = require('mocha');
/*eslint-enable no-unused-vars */
const net = require('net');
const expect = require('chai').expect;
var chai = require('chai')
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');
const index = require(__dirname + '/../index');

describe('http server pointing at index', function(){

  before(function(){
    index.serverstart();
  });

  after(function(){
    index.serverstop();
  });

  it('should have a reply on index or /', (done) => {
    var app = 'http://localhost:3040';
    chai.request(app)
    .get('/')
    .end(function (err, res) {
       expect(err).to.be.null;
       expect(res).to.have.status(200);
    });
    chai.request(app)
    .get('/index')
    .end(function (err, res) {
       expect(err).to.be.null;
       expect(res).to.have.status(200);
       done();
    });
  });
});
