const chai = require('chai');
const fs = require('fs');
const test_server = require(__dirname + '/../server');  // eslint-disable-line
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;
var path = __dirname + '/../data';
var fileCount;

describe('persistent http server', () => {
  before((done) => {
    fs.readdir(path, function (err, files) {
      if (err) throw err;
      fileCount = files.length;
      // console.log('fileCount: ' + fileCount + ' files');
      done();
    });
  });
  it('should have a note route', (done) => {
    request('localhost:3000')
      .post('/note')
      .send({ msg: 'hello'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql({ msg: 'hello'});
        done();
      });
  });
  it('should create a new file when it receives post data', (done) => {
    var filesAfter;
    fs.readdir(path, function (err, files) {
      if (err) throw err;
      filesAfter = files.length;
      // console.log('filesAfter: ' + filesAfter + ' files');
      expect(filesAfter).to.eql(fileCount + 1);
      done();
    });
  });
});
