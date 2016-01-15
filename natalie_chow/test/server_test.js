const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');

const server = require(__dirname + '/../lib/server_with_router');

describe('HTTP server', () => {
  after(() => {
    server.close();
  });

  it('should 404 on a page that does not exist', (done) => {
    request('localhost:3000')
      .get('/dne')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('page not found');
        done();
      });
  });

  var testData = {
    hello: 'from the other side'
  };

  describe('handling POST requests to /hat', () => {
    after(() => {
      fs.unlink(__dirname + '/../data/1.json');
      fs.unlink(__dirname + '/../data/cat.json');
    });

    it('should assign a filename by default', (done) => {
      request('localhost:3000')
        .post('/hat')
        .send(testData)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);

          fs.readFile(__dirname + '/../data/1.json', (err, data) => {
            expect(err).to.eql(null);
            expect(JSON.parse(data.toString())).to.eql(testData);
            done();
          });
        });
    });

    it('should take a parameter for filename', (done) => {
      request('localhost:3000')
        .post('/hat/cat')
        .send(testData)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);

          fs.readFile(__dirname + '/../data/cat.json', (err, data) => {
            expect(err).to.eql(null);
            expect(JSON.parse(data.toString())).to.eql(testData);
            done();
          });
        });
    });
  });

  describe('handling GET requests to /hat', () => {
    before((done) => {
      fs.writeFile(__dirname + '/../data/test.json', JSON.stringify(testData), (err) => {
        if (err) throw err;
        done();
      });
    });

    after(() => {
      fs.unlink(__dirname + '/../data/test.json');
    });

    it('should read the specified json file', (done) => {
      request('localhost:3000')
        .get('/hat/test')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.hello).to.eql('from the other side');
          done();
        });
    });

    it('should return 404 if file does not exist', (done) => {
      request('localhost:3000')
        .get('/hat/doesnotexist')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(404);
          expect(res.body.msg).to.eql('file does not exist');
          done();
        });
    });

  });
});
