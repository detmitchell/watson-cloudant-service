'use strict';
var expect = require('chai').expect;
var Cloudant = require('../lib/cloudant');

var cloudant = new Cloudant({
	cred: {
		account: 'ef5b67ac-b73a-4454-8c76-aa943ab318fb-bluemix',
		username: 'ef5b67ac-b73a-4454-8c76-aa943ab318fb-bluemix',
		password: 'b2fdd69e12f557c7a9628a51b6cc3ad7db2b0a853ff675c975a69af3abd321c3'
		
	},
	dbname: 'watson-nlc-restructure'
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

		var objToInsert = {
			_id : 'test_id',
			a: 1,
			b: 'witchdoctor'
		};
		cloudant.createDocument(objToInsert, function (err, response) {
			if (err) console.log(err);
			else {
				var data = response;
				console.log('Document created');
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

		var _id= 'test_id';
		cloudant.readDocument(_id, function (err, response) {
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

		cloudant.readDocument('test_id', function (err, response) {
			if (err) console.log(err);
			else {
				dat = response;
				var objToUpdate = {
					_id: 'test_id',
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
		cloudant.readDocument('test_id', function (err, response) {
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
						console.log('Delete Successful');
					}
					done();
				})
			}
		});
	})

	it('.createIndex', function (done) {
		this.timeout(5000);
		expect(cloudant.createIndex).to.be.a('function');
		cloudant.createIndex('new_index', 'lang', function (err, response) {
			if (err) console.log(err);
			console.log('Index creation: ' + response.result);
			done();
		});

	})

	it('.search', function (done) {
		this.timeout(1000000000);
		expect(cloudant.search).to.be.a('function');
		var field = '_id';
		var value = 'xxx';
		cloudant.search(field, value, function (err, response) {
			if (err) console.log(err);
			else {
				console.log('Found: ' + response.docs.length + ' documents');
				expect(response).to.be.a('object');
				done();
			}
		})
	})
	it('.list',function(done){
		this.timeout(100000);
		expect(cloudant.list).to.be.a('function');
		cloudant.listAll(function(err,response){
			if(err) {
				console.log(err);
				return;
			}
			else{
				console.log("List ommitted");
				done();
			}
		})
	})

	it('.bulk',function(done){
		this.timeout(10000);
		expect(cloudant.bulkInsert).to.be.a('function');
		var toIns = {'docs': [{'a':1,'b':2},{'c':3,'d':4}]};
		cloudant.bulkInsert(toIns,function(err,response){
			if(err){
				return console.log(err);
			}
			else{
				console.log("Bulk Insert Successful")
				done();
			}
		}
		)}
	)
})