const chai = require('chai');
const server = require(__dirname + '/../lib/server_http.js');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');

describe('simple http server', () => {
  it('shouild create a file whith a POST request', (done) => {
    request('localhost:3000')
      .post('/notes')
      .send({ msg: 'Hello notes' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        var exists = fs.existsSync(__dirname + '/../data/' + 'notes' + 1 + '.json');
        expect(exists).to.eql(true);
        done();
    });
  });

  it('should respond to a request to notes with list of files', (done) => {
    request('localhost:3000')
      .get('/notes')
      .end((err,res) => {
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
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });
});
