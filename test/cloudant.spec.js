'use strict';
var expect = require('chai').expect;
var Cloudant = require('../lib/cloudant');

var cloudant = new Cloudant({
	cred: {
		account: 'ef5b67ac-b73a-4454-8c76-aa943ab318fb-bluemix',
<<<<<<< HEAD
		username: 'hereeterembredidedntseds',
		password: 'a3d3a6fedfa14007b5a68d2c5e5fa7f44902fe4e'
=======
		username: 'htedingstimalecatruedirs',
		password: '51f56826bc15976e4adf13142b8e65930aa785b2'
>>>>>>> 6c08c1d10e3b2bb8816f9da7dec74120171a4b4b
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
<<<<<<< HEAD
		var params = {
			objToInsert: {
				_id: 'test_id',
				a: 1,
				b: 'soothsayer'
			}
=======
		var objToInsert = {
			a: 1,
			b: 'soothsayer'
>>>>>>> 6c08c1d10e3b2bb8816f9da7dec74120171a4b4b
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
<<<<<<< HEAD
		var params = {
			_id: 'test_id'
		}
		cloudant.readDocument(params, function (err, response) {
=======
		var _id= '100';
		cloudant.readDocument(_id, function (err, response) {
>>>>>>> 6c08c1d10e3b2bb8816f9da7dec74120171a4b4b
			if (err) console.log(err);
			else {
				var data = response;
				console.log('Read Document');
			}
			done();
		})
	})

	it('.updateDocument', function (done) {
		this.timeout(5000);
		var dat;
		expect(cloudant.updateDocument).to.be.a('function');

<<<<<<< HEAD
		cloudant.readDocument({ _id: 'test_id' }, function (err, response) {
=======
		cloudant.readDocument('0', function (err, response) {
>>>>>>> 6c08c1d10e3b2bb8816f9da7dec74120171a4b4b
			if (err) console.log(err);
			else {
				dat = response;

<<<<<<< HEAD
				var params = {
					objToUpdate: {
						_id: 'test_id',
						value: "new val",
						_rev: dat._rev
					}
=======
				var objToUpdate = {
					_id: '0',
					value: "new val",
					_rev: dat._rev
>>>>>>> 6c08c1d10e3b2bb8816f9da7dec74120171a4b4b
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

<<<<<<< HEAD
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

=======
>>>>>>> 6c08c1d10e3b2bb8816f9da7dec74120171a4b4b
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