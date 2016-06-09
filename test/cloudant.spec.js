'use strict';
var expect = require('chai').expect;
var Cloudant = require('../lib/cloudant');

var cloudant = new Cloudant({
	cred:{
		account: 'ef5b67ac-b73a-4454-8c76-aa943ab318fb-bluemix',
		username: 'ildeddentragothrouldther',
		password: 'e962073e70810f1a6df1115b56cad7c06d93f41d'},
	dbname: 'watson-nlc'
});

describe('cloudant', function () {
	it('.constructor', function () {
		expect(cloudant).to.be.instanceof(Cloudant);
		expect(cloudant).to.have.property('_cloudant');
	})
	it('.createDatabase', function () {
		expect(cloudant.createDatabase).to.be.a('function');
	})
	it('.createDocument', function (done) {
		this.timeout(5000);
		expect(cloudant.createDocument).to.be.a('function');
		var params = {
			objToInsert: {
				id: 'documentoftheyear',
				a: 1,
				b: 'soothsayer'
			},
			id: 'taste'
		};
		cloudant.createDocument(params, function (err, response) {
			if (err) console.log(err);
			else {
				var data = response;
				console.log(data);
			}
			done();	
		});
	})
	it('.readDocument', function () {
		expect(cloudant.readDocument).to.be.a('function');
	})
	it('.updateDocument', function () {
		expect(cloudant.readDocument).to.be.a('function');
	})
	it('.deleteDocument', function () {
		expect(cloudant.deleteDocument).to.be.a('function');
	})
})