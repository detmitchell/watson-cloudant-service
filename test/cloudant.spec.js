'use strict';
var expect = require('chai').expect;
var Cloudant = require('../lib/cloudant');
var test = require('../camera_training.json');

var cloudant = new Cloudant({
		account: 'ef5b67ac-b73a-4454-8c76-aa943ab318fb-bluemix',
		password: 'b2fdd69e12f557c7a9628a51b6cc3ad7db2b0a853ff675c975a69af3abd321c3'
});

describe('cloudant', function () {
	it('.constructor', function () {
		expect(cloudant).to.be.instanceof(Cloudant);
		expect(cloudant).to.have.property('_cloudant');
		console.log('Constructor succeeded');
	})
	it('.use', function (done) {
		this.timeout(5000);
		var db = cloudant.use('test');
		expect(db).to.be.an('object');
		expect(db).to.have.property('insert');
		expect(db).to.have.property('get');
		expect(db).to.have.property('replicate');
		expect(db).to.have.property('destroy');
		expect(db).to.have.property('bulk');
		expect(db).to.have.property('find');
		console.log(db);
		done();
	})
})