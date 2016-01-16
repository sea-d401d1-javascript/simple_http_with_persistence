const chai = require('chai');
const server = require(__dirname +'/../test/testing_server');
const chaiHTTP = require('chai-http');
const fs = require('fs');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

var path = __dirname + '/../data';
var fileCount;

describe('simple http server with persistence', () => {
  before((done) => {
    fs.readdir(path, function (err, files) {
      if (err) throw err;
      fileCount = files.length;
        done();
      });
  });

  it ('should have a note route', (done) => {
    request('localhost:3000')
      .post('/note')
      .send({ msg: 'Here is a note!'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql({ msg: 'The note!'});
        done();
      });
  });

    it('should create a new file when it receives note post data', (done) => {
      var filesAfter;
      fs.readdir(path, function (err, files) {
        if (err) throw err;
        filesAfter = files.length;
        expect(filesAfter).to.eql(fileCount + 1);
        done();
        });
      });
    });
