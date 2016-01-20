const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require(__dirname +'/../server');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;


describe('simple http server', () => {
  after(() => {
    server.close();
  });

  it('should have a welcome route', (done) => {
    request('localhost:3000')
      .get('/welcome')
      .end( function(err,res){
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('welcome');
        done();
      });
  });

  it('should have a welcome route', (done) => {
    request('localhost:3000')
      .post('/note')
      .send('{"name":"yueyue"}')
      .end( function(err,res){
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(JSON.parse(res.body).name).to.equal('yueyue');
        done();
      });
  });

  it('should have 404 on unfound page', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end( function(err,res){
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.equal('page not found');
        done();
      });
  });
});
