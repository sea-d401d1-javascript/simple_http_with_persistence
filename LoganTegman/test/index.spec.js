'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index');
const fs = require('fs');
const path = require('path');
chai.use(chaiHttp);
const expect = chai.expect;

const testDir = path.join(__dirname, '/tmp');

/* eslint-disable no-unused-expressions */

describe('simple http server', () => {
  before(done => {
    fs.readdir(testDir, (err, files) => {
      this.origFiles = files ? files : [];
      this.hadFiles = !err;
      done();
    });
  });
  it('/kittens JSON post should repspond with success"', done => {
    chai.request('http://localhost:3030').post('/kittens')
      .send({'name': 'Gabby'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Kitten delivered successfully!');
        done();
      });
  });
  it('/kittens JSON post should create a file"', done => {
    chai.request('http://localhost:3030').post('/kittens')
      .send({'name': 'Gabby'})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        const currFiles = fs.readdirSync(testDir);
        expect(currFiles).to.have.length.above(this.origFiles.length);
        done();
      });
  });
  it('/kittens get {kittenID: "1"} should return json', done => {
    chai.request('http://localhost:3030').get('/kittens')
      .send({'kittenID': '1'}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.null;
        done();
      });
  });
  after((done) => {
    server.close();
    fs.readdir(testDir, (err, files) => {
      if (err) console.log(err);
      files.filter(file => this.origFiles.indexOf(file) === -1)
        .map(file => fs.unlinkSync(path.resolve(testDir, file)));
      if (!this.hadFiles) fs.rmdirSync(testDir);
      done();
    });
  });
});
