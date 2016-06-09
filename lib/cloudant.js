'use strict';
var Cloud = require('cloudant');
var async = require('async');
var dbname = null;
var db = null;
var doc = null;

function Cloudant(credentials) {
	this._cloudant = Cloud(credentials.cred);
	dbname = credentials.dbname;
	db = this._cloudant.db.use(dbname);
}

// create a document
Cloudant.prototype.createDocument = function (obj, callback) {
	db.insert(obj, function (err, response) {
		if (err)
			callback(err);
		else
			callback(null, response);
	});
};

// read a document
Cloudant.prototype.readDocument = function (_id, callback) {
	db.get(_id, function (err, response) {
		if (err)
			callback(err);
		else
			callback(null, response);
	})
};

// update a document
Cloudant.prototype.updateDocument = function (obj, callback) {
	db.insert(obj, function (err, response) {
		if (err)
			callback(err);
		else
			callback(null, response);
	})
};

Cloudant.prototype.search = function (field,value, callback) {
	var selector = {};
	selector[field] = value;
	db.find({ "selector": selector }, function (err, response) {
		if (err) {
			callback(err);

		}
		else
		callback(null, response);
	})
}

Cloudant.prototype.createIndex = function (_name,_field, callback) {
	var toIndex = { name: _name, type: 'json', index: { fields: [_field] } };
	db.index(toIndex,function(err,response){
		if(err)
			throw err;
		callback(null,response);
	})
}
module.exports = Cloudant;