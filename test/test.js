const chai = require('chai');
const chaiHttp = require('chai-http');
	  chai.use(chaiHttp);
const server = require('/../index');
const fs = require('fs');
const expect = chai.expect;
const request = chai.request;


describe('simp;e')