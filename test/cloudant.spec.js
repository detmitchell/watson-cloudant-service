'use strict';
var expect = require('chai').expect;
var Cloudant = require('../lib/cloudant');

var cloudant = new Cloudant({
	cred: {
		account: 'account',
		username: 'username',
		password: 'password'
	},
	dbname: 'db'
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
				_id: 'test_id',
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
			_id: 'test_id'
		}
		cloudant.readDocument(params, function (err, response) {
			if (err) console.log(err);
			else {
				var data = response;
				console.log(data);
			}
			done();
		})
	})

	it('.updateDocument', function (done) {
		this.timeout(5000);
		var dat;
		expect(cloudant.updateDocument).to.be.a('function');

		cloudant.readDocument({ _id: 'test_id' }, function (err, response) {
			if (err) console.log(err);
			else {
				dat = response;

				var params = {
					objToUpdate: {
						_id: 'test_id',
						value: "new val",
						_rev: dat._rev
					}
				};

				cloudant.updateDocument(params, function (err, response) {
					if (err) console.log('Update failed. Please ensure you have the correct revision number.');
					else {
						var data = response;
						console.log(data);
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

				var params = {
					objToDelete: {
						_id: 'test_id',
						_rev: dat._rev
					}
				}
				cloudant.deleteDocument(params, function (err, response) {
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
})