'use strict';
var Cloud = require('cloudant');
var async = require('async');
var creds = require('service-credentials');

function Cloudant(service) {
	var credentials = creds.getCredentials(service);
	this._cloudant = Cloud(credentials);
}

// Creates database connection
Cloudant.prototype.use = function(dbname, callback){
	return this._cloudant.db.use(dbname);
}

module.exports = Cloudant;