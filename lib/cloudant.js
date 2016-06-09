'use strict';
var Cloud = require('cloudant');
var async = require('async');
var dbname = null;
var db = null;
var doc = null;

function Cloudant(credentials) {
	this._cloudant = Cloud(credentials.cred, function (er, cloudant) {
		if (er)
			return console.log('Error connecting to Cloudant account %s: %s', 'ildeddentragothrouldther', er.message);
		else
			this.db = cloudant.db.use(credentials.dbname);
		db.insert({id: "POTTEA"}, 'tast3', function (err, body, header) {
			if (err)
				return console.log('well that happened', err.message)

			console.log('you have inserted the rabbit.')
			console.log(body)
		});
	});
	// this.dbname = credentials.dbname;
	// db = this._cloudant.db.use(dbname);
}

// create a database
Cloudant.prototype.createDatabase = function (params, callback) {

};

// create a document
Cloudant.prototype.createDocument = function (params, callback) {
	console.log(this.db);
	this.db.insert(params.objToInsert, params.id,function (err, response) {
		if (err)
			callback(err);
		else
			callback(null, response);
	});
};

// read a document
Cloudant.prototype.readDocument = function (params, callback) {

};

// update a document
Cloudant.prototype.updateDocument = function (params, callback) {

};

// deleting a document
Cloudant.prototype.deleteDocument = function (params, callback) {

};

// deleting the database document
Cloudant.prototype.deleteDatabase = function (params, callback) {

};

module.exports = Cloudant;