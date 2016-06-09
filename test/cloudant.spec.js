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
				a: 1,
				b: 'soothsayer'
			}
		};
		cloudant.createDocument(params, function (err, response) {
			if (err) console.log(err);
			else {
				var data = response;
			}
			expect(data).to.be.a('object');
			expect(data).to.have.property('ok');
			expect(data.ok).to.be.equal(true);
			expect(data).to.have.property('id');
			expect(data).to.have.property('rev');
			done();	
		});
	})
	it('.readDocument', function (done) {
		expect(cloudant.readDocument).to.be.a('function');
		var params = {
			_id: '1656d8e6f437b3d9f1532a6f8272b3a9'
		}
		cloudant.readDocument(params, function(err,response){
			if(err) console.log(err);
			else{
				var data = response;
				console.log(data);
			}
			done();
		})
	})
	it('.updateDocument', function (done) {
		this.timeout(5000);
		expect(cloudant.readDocument).to.be.a('function');
		var params = {
			objToUpdate: {
				_id: 'test',
				value: 'the document is under my control now',
				other_value: 666,
				_rev: '4-1f6e47050cbff64b3f77fde4e3909f89'
			}
		};
		cloudant.updateDocument(params, function(err,response){
			if(err) console.log('Update failed. Please ensure you have the correct revision number.');
			else{
				var data = response;
				console.log(data);
				expect(data).to.be.a('object');
				expect(data).to.have.property('ok');
				expect(data.ok).to.be.equal(true);
				expect(data).to.have.property('id');
				expect(data).to.have.property('rev');
			}
			done();
		});
	})
	it('.deleteDocument', function (done) {
		this.timeout(5000);
		expect(cloudant.deleteDocument).to.be.a('function');
		var params = {
			objToDelete:{
				_id: 'test',
				_rev: '4-1f6e47050cbff64b3f77fde4e3909f89'
			}
		}
		cloudant.deleteDocument(params, function(err,response){
			if(err) console.log('Delete failed, ensure that you have admin access');
			else{
				var data = response;
				console.log(data);
			}
			done();
		})
	})
})