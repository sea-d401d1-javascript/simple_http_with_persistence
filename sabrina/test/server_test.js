const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const fs = require('fs');

const httpServer = require(__dirname + '/../lib/server');
const fileHandler = require(__dirname + '/../lib/fileHandler');

chai.use(chaiHttp);

describe('the http server', () => {
  it('should respond to GET requests at /hello route', (done) => {
    chai.request('localhost:3000')
      .get('/hello')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('hello world');
        done();
      });
  });

  it('should respond to GET requests at /anotherroute route', (done) => {
    chai.request('localhost:3000')
      .get('/anotherroute')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('hello from another route');
        done();
      });
  });

  it('should respond to GET requests at /index route', (done) => {
    chai.request('localhost:3000')
      .get('/index')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  describe('the /index route', () => {
    before((done) => {
      fs.readFile(__dirname + '/../public/index.html', (err, data) => {
        this.index = data.toString();
        done();
      });
    });

    it('should return the index.html file to GET requests', (done) => {
      chai.request('localhost:3000')
        .get('/index')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.text).to.eql(this.index);
          done();
        });
    });
  });

  it('should respond to GET requests at /donors route', (done) => {
    chai.request('localhost:3000')
      .get('/donors')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  describe('the /donors route', () => {
    before((done) => {
      fs.readFile(__dirname + '/../data/team.json', (err, data) => {
        this.index = JSON.parse(data.toString());
        done();
      });
    });

    it('should return the team.json file to GET requests', (done) => {
      chai.request('localhost:3000')
        .get('/donors')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body).to.eql(this.index);
          done();
        });
    });
  });

  describe('the /donors POST request', () => {
    var filenameTest = Math.random().toString() + '.json';

    before((done) => {
      fileHandler.writeFile(filenameTest);
      done();
    });

    after((done) => {
      fs.unlinkSync('./' + filenameTest);
      done();
    });

    it('should have a fileHandler.writeFile() that should create a new file with a unique name', () => {
      console.log('./' + filenameTest);
      var createdNewFile = fs.statSync('./' + filenameTest).isFile();
      expect(createdNewFile).to.eql(true);
    });

    describe('the /donors POST request', () => {
      it('should return a response that write was successful', (done) => {
        var jsonName = {"name": "sab"};
        chai.request('localhost:3000')
          .post('/donors')
          .send(jsonName)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body.msg).to.eql('File written to server!');
            done();
          });
      });
    });
  });

  it('should respond a 404 error to GET requests at unknown routes', (done) => {
    chai.request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('Page not found');
        done();
      });
  });
});
