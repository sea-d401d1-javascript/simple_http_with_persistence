var fs = require('fs');
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect, request = chai.request;
describe('HTTP Server with Basic Routing and Persistence', function() {
  before(function(done) {
    fs.access(__dirname + '/../data/', function(err) {
      if (err) {
        fs.mkdirSync(__dirname + '/../data');
        done();
      } else {
        var dataFiles = fs.readdirSync(__dirname + '/../data/');
        for (i = 0; i < dataFiles.length; i++) {
          fs.unlinkSync(__dirname + '/../data/' + dataFiles[i]);
        }
        this.server = require(__dirname + '/../lib/httpServer');
        done();
      }
    });
  });
  after(function(done) {
    fs.access(__dirname + '/../data/', function(err) {
      if (!err) {
        var dataFiles = fs.readdirSync(__dirname + '/../data/');
        for (i = 0; i < dataFiles.length; i++) {
          fs.unlinkSync(__dirname + '/../data/' + dataFiles[i]);
        }
        this.server.close(done);
      }
    });
  });
  it('Should return the default message JSON file when a client performs a GET request to "/json" and there are no JSON files in the data folder.', function(done) {
    request('http://localhost:3000').get('/json').end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message":"default"}\n');
      done();
    });
  });
  it('Should return "Data recorded." when a client performs a POST request to "/json" and successfully creates a new JSON file equal to a sent JSON object with a property, message.', function(done) {
    request('http://localhost:3000').post('/json').send('{"message": "testString"}').end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Data recorded.\n');
      done();
    });
  });
  it('Should return the most recently created JSON file when a client performs a GET request to "/json".', function(done) {
    request('http://localhost:3000').get('/json').end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('{"message": "testString"}\n');
      done();
    });
  });
  it('Should return "Error, invalid JSON sent by request." when a client performs a POST request to "/json" carrying an invalid JSON object.', function(done) {
    request('http://localhost:3000').post('/json').send('aksfhasfl{message: "testString"').end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Error, invalid JSON sent by request.\n');
      done();
    });
  });
});
