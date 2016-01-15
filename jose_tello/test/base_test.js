const chai     = require('chai');
const server   = require(__dirname + '/../index');
const chaiHTTP = require('chai-http');
const fs       = require('fs');

chai.use(chaiHTTP);
const expect   = chai.expect;
const request  = chai.request;

describe('test GET & POST on http server', () => {
  it('should have GET request responding with a resource', (done) => {
    request('localhost:3000')
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should have POST request writing data into file as JSON', (done) => {
    request('localhost:3000')
    .post('/')
    .send({hello: 'world', goodbye: 'everyone'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      fs.readdir('../data/', (err, files) => {
        expect(files.length).to.eql(10);
        done();
      });
    });
  });
});
