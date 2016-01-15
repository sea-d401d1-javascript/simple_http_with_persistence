const server = require(__dirname + '/../index.js'); //eslint-disable-line
const chai = require('chai');
chai.use(require('chai-http'));
const request = chai.request;
const expect = chai.expect;
const fs = require('fs');

describe('http server: GET', () => {
  it('should show the buddy.json file', (done) => {
    request('localhost:3000')
      .get('/buddy.json')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"buddy" : "you\'re my buddy"}');
        done();
      });
  });
  it('should show fuddy.json file couldn\'t be found', (done) => {
    request('localhost:3000')
      .get('/fuddy.json')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('\"file not found\"');
        done();
      });
  });
});

describe('http server: POST', function () {
  var oldCount;
  var newCount;
  before(function(done) {
    var list = fs.readdirSync(__dirname + '/../json');
    oldCount = list.length;
    request('localhost:3000')
      .post('/fuddy.json')
      .send({name: 'jim'})
      .end((err, res) => { //eslint-disable-line
        done();
      });
  });
  after('clean up', function(){
    fs.unlink(__dirname + '/../json/fuddy.json');
  });
  it('Should show we have a new file made', function () {
    var newList = fs.readdirSync(__dirname + '/../json');
    newCount = newList.length;
    expect(newCount).to.eql(oldCount + 1); 
  });
  it('Shouldn\t let a file get stored. JSON only my friend', function (done) {
    request('localhost:3000')
      .post('/fuddy.jso')
      .send({name: 'jim'})
      .end((err, res) => { //eslint-disable-line
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('\"file not found\"');
        done();
      }); 
  });
});