const chai = require('chai');
const server = require(__dirname + '+/../server');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;



describe('http server', () => {
  it('should return the current time', (done) => {
    request('localhost:3000')
      .get('/time')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('time is: ' + new Date().toTimeString());
        done();
      });
  });

  it('should greet me using GET', (done) => {
    request('localhost:3000')
      .get('/greet/erika')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('howdyerika!');
        done();
      });
  });

  it('should greet me using POST data', (done) => {
    request('localhost:3000')
      .post('/greet')
      .send({ msg: 'erika'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('howdyerika');
        done();
      });
  });


  it('should return 404 not found', (done) => {
    request('localhost:3000')
      .get('/nonexistant')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });

});
