var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
require(__dirname + '/../server');

describe('a post request to /notes', function(){
  it('should add to an existing json file', function(done){
    chai.request('http://localhost:3000')
      .post('/notes')
      .send({note: 'Waaaaazzzaaaaap'})
      .end(function(res){
        expect(res.text).to.equal('{"note":"Waaaaazzzaaaaap"}');
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('a get request to /notes', function(){
  it('should return a json object', function(done){
    chai.request('http://localhost:3000')
      .get('/notes')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
