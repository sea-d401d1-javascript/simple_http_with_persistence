const chai = require('chai');
const chaihttp = require('chai-http');
const server = require(__dirname +'/../server');
chai.use(chaihttp);
const expect = chai.expect;
const request = chai.request;

// var path = __dirname + '/../data';
// var fileCount;

describe('simple http server with persistence', () => {
  after(() => {
    server.close();
  });

  it ('should have a howdy route', (done) => {
    request('localhost:3000')
    .get('/howdy')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.msg).to.eql('howdy');
      done();
    });
  });


  it ('should have a note route', (done) => {
    request('localhost:3000')
      .post('/note')
      .send({ msg: 'Noted!'})
      .end((err, res) => {
        var obj = JSON.parse(res.text);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(obj.msg).to.eql('Noted!');
        done();
      });
  });

  it('should show 404 if page not found', (done) => {
    request('localhost:3000')
    .get('/pagenotfound')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(404);
      expect(res.body.msg).to.eql('page not found');
      done();
    });
  });
});
