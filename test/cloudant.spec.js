'use strict';
var expect = require('chai').expect;
var Cloudant = require('../lib/cloudant');

var cloudant = new Cloudant({
	cred: {
		account: 'account',
		username: 'username',
		password: 'password'
	},
	dbname: 'watson-nlc'
});

describe('cloudant', function () {
	it('.constructor', function () {
		expect(cloudant).to.be.instanceof(Cloudant);
		expect(cloudant).to.have.property('_cloudant');
		console.log('Constructor succeeded');
	})
	it('.createDocument', function (done) {
		this.timeout(5000);
		expect(cloudant.createDocument).to.be.a('function');

		var params = {
			objToInsert: {
				_id: 'test_id',
				a: 1,
				b: 'soothsayer'
			}
		}
		var objToInsert = {
			a: 1,
			b: 'soothsayer'

		};
		cloudant.createDocument(objToInsert, function (err, response) {
			if (err) console.log(err);
			else {
				var data = response;
				console.log('Document Created');
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
			_id: 'test_id'
		}
		cloudant.readDocument(params, function (err, response) {

		var _id= '100';
		cloudant.readDocument(_id, function (err, response) {

			if (err) console.log(err);
			else {
				var data = response;
				console.log('Read Document');
			}
			done();
		})
	})
	})
	it('.updateDocument', function (done) {
		this.timeout(5000);
		var dat;
		expect(cloudant.updateDocument).to.be.a('function');

		cloudant.readDocument('0', function (err, response) {

			if (err) console.log(err);
			else {
				dat = response;
				var objToUpdate = {
					_id: '0',
					value: "new val",
					_rev: dat._rev

				};

				cloudant.updateDocument(objToUpdate, function (err, response) {
					if (err) console.log('Update failed. Please ensure you have the correct revision number.');
					else {
						var data = response;
						console.log('Update Succeeded');
						expect(data).to.be.a('object');
						expect(data).to.have.property('ok');
						expect(data.ok).to.be.equal(true);
						expect(data).to.have.property('id');
						expect(data).to.have.property('rev');
						done();
					}
				});
			}
		});
	})

	it('.deleteDocument', function (done) {
		this.timeout(5000);
		var dat;
		expect(cloudant.deleteDocument).to.be.a('function');
		cloudant.readDocument({ _id: 'test_id' }, function (err, response) {
			if (err) console.log(err);
			else {
				dat = response;
				var objToDelete= {
						_id: 'test_id',
						_rev: dat._rev
				}
				cloudant.deleteDocument(objToDelete, function (err, response) {
					if (err) console.log('Delete failed, ensure that you have admin access');
					else {
						var data = response;
						console.log(data);
					}
					done();
				})
			}
		});
	})

	it('.search', function (done) {
		this.timeout(5000);
		expect(cloudant.search).to.be.a('function');
		var field = 'value';
		var value = 'new val';
		cloudant.search(field, value, function (err, response) {
			if (err) console.log(err);
			else {
				console.log('Found: ' + response.docs.length + ' documents');
				expect(response).to.be.a('object');
				done();
			}
		})
	})

	it('.createIndex', function (done) {
		this.timeout(5000);
		expect(cloudant.createIndex).to.be.a('function');
		cloudant.createIndex('index_a', 'value.a', function (err, response) {
			if (err) console.log(err);
			console.log('Index creation: ' + response.result);
			done();
		});

	})
})
