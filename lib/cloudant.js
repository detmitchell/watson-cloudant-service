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

// create a database
Cloudant.prototype.createDatabase = function (params, callback) {

};

// create a document
Cloudant.prototype.createDocument = function (params, callback) {
	db.insert(params.objToInsert, function (err, response) {
		if (err)
			callback(err);
		else
			callback(null, response);
	});
};

// read a document
Cloudant.prototype.readDocument = function (params, callback) {
	db.get(params._id, function(err,response){
		if(err)
			callback(err);
		else
			callback(null, response);
	})
};

// update a document
Cloudant.prototype.updateDocument = function (params, callback) {
	db.insert(params.objToUpdate, function(err,response){
		if(err)
			callback(err);
		else
			callback(null, response);
	})
};

// deleting a document
Cloudant.prototype.deleteDocument = function (params, callback) {
	db.destroy(params._id,params._rev,function(err, reponse){
		if(err)
			callback(err);
		else
			callback(null,response);
	})
};

module.exports = Cloudant;