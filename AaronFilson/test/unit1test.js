const mocha = require('mocha');
const expect = require('chai').expect;
var chai = require('chai')
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const index = require(__dirname + '/../index');

describe('http server pointing at index', function(){

  before(function(){
    index.nowstart();
  });

  after(function(){
    index.nowstop();
  });


  it('should have a reply on index or /', (done) => {
    var app = 'http://localhost:3040';
    request(app)
    .get('/')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
    });
    request(app)
    .get('/index')
    .end(function (err, res) {
       expect(err).to.be.null;
       expect(res).to.have.status(200);
       done();
    });
  });
});

describe('the store page', function(){

  var app = 'http://localhost:3040';
  before(function(){
    index.nowstart();
  });

  after(function(){
    index.nowstop();
  });

  it('should have json in the reply to a get on store', (done) => {

    request(app)
    .get('/store')
    .end(function (err, res) {
       expect(err).to.eql(null);
       expect(res).to.have.status(200);
       expect(res.body).to.not.eql(null);
       done();
    });
  });

  it('should store on a put to the store', (done) => {

    request(app)
    .put('/store/?test1.json')
    .send({msg:"hello"})
    .end(function (err, res) {
       expect(err).to.be.null;
       expect(res).to.have.status(200);
       expect(res.body).to.not.eql(null);
       done();
    });
  });

  it('should store on a post to the store', (done) => {

    request(app)
    .post('/store/?test2.json')
    .send({msg:"hello2"})
    .end(function (err, res) {
       expect(err).to.be.null;
       expect(res).to.have.status(200);
       expect(res.body).to.not.eql(null);
       done();
    });
  });
});
