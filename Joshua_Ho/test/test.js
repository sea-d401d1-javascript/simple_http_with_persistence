const fs = require('fs');
const server = require( __dirname + "/../server.js");

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const request = chai.request;
const expect = chai.expect;

var host = 'localhost:3000';

describe(' The server...' , () => {

	var filesBefore;

	before( () => {
		fs.readdir( __dirname + '/../log' , (err , files) => {
			filesBefore = files.length;
		});
	});

	//THIS WORKS
	//FOR SOME REASON THIS IS ASYNC?
	it('should respond to a GET request' , (done) => {
		request('localhost:3000')
			.get('/')
			.end( (err, res) => {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				done();
			});
	});

	//THIS WORKS
	it('should respond to a POST request' , (done) => {
		request('localhost:3000')
			.post('/')
			.end( (err , res) => {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body).to.eql({msg: "Hey guy, Object Received :)"});
				done();
			});
	});
	
	it('should create a new file after a POST request' , (done) => {

		//Count files first
		request('localhost:3000')
			.post('/')
			.send({msg:'Hello from test'})
			.end( (err , res) => {

				var filesAfter;

				//count files again
				fs.readdir( __dirname + '/../log' , (err , files) => {
					filesAfter = files.length;
					expect( (filesBefore + 1) ).to.eql( filesAfter );

					done();
				});

			});

		});

});