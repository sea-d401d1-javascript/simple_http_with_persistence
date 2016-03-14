const chai = require('chai');
const path = require('path');
require(path.join(__dirname, '..', 'lib', 'server'));
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');

describe('simple http server', () => {
  it('should POST to create a file', (done) => {
    request('localhost:3000')
      .post('/notes')
      .send({ msg: 'I am a note' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        var exists = fs.existsSync(path.join(__dirname, '..', 'data', 'notes1.json'));//eslint-disable-line
        expect(exists).to.eql(true);
        done();
    });
  });

  it('should respond to a get request for a list of the files', (done) => {
    request('localhost:3000')
      .get('/notes')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('notes1.json');
        done();
    });
  });

  it('should 404', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
      //  expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });
});
