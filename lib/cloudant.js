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
	db.get(params._id, function (err, response) {
		if (err)
			callback(err);
		else
			callback(null, response);
	})
};

// update a document
Cloudant.prototype.updateDocument = function (params, callback) {
	db.insert(params.objToUpdate, function (err, response) {
		if (err)
			callback(err);
		else
			callback(null, response);
	})
};

// deleting a everything
Cloudant.prototype.armageddon = function (params, callback) {
	db.destroy(params._id,params._rev,function(err, reponse){
		if(err)
			callback(err);
		else
			callback(null,'Succesful deletion');
	})
};

//deleting a document
Cloudant.prototype.deleteDocument = function (params, callback) {
	var objToDelete;
	db.get(params._id, function (err, response) {
		if (err)
			callback(err);
		else {
			console.log("theactualResponse")
			console.log(response);
			objToDelete = response;
			console.log("THIS IS USEFUL")
			console.log(objToDelete);
			objToDelete._deleted = true;
			db.insert(objToDelete, function (err, response) {
				if (err)
					callback(err);
				else
					callback(null, response);
			})
		}
	})
}

Cloudant.prototype.search = function (params, callback) {
	var selector = {};
	selector[params.field] = params.value;
	console.log(selector)
	console.log("PreFind");
	db.find({ "selector": selector }, function (err, response) {
		console.log("pre if")
		if (err) {
			console.log("oh noes, an err")
			callback(err);

		}
		else
			console.log("looks like everything is working")
		callback(null, response);
	})
}

Cloudant.prototype.createIndex = function (_name, _field, callback) {
	var toIndex = { name: _name, type: 'json', index: { fields: [_field] } };
	db.index(toIndex, function (err, response) {
		if (err)
			throw err;
		callback(null, response);
	})
}
module.exports = Cloudant;