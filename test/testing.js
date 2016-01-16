const chai = require('chai');
const server = require(__dirname + '+/../server');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;



describe('http server persistant', () => {
  // it('should return the current time', (done) => {
  //   request('localhost:3000')
  //     .get('/time')
  //     .end((err, res) => {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       expect(res.body.msg).to.eql('time is: ' + new Date().toTimeString());
  //       done();
  //     });
  // });

  it('should GET the data', (done) => {
    request('localhost:3000')
      .get('/data')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('Here comes the data!');
        done();
      });
  });

  it('should POST the data', (done) => {
    request('localhost:3000')
      .post('/data')
      .send({ msg: 'data party'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('There goes the data!');
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
