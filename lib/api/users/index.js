'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var createLogin = require('./login');
var storageBind = require('../storage_bind');
var methods = ['getById', 'getByUsername', 'getByKey', 'update', 'deleteById'];

module.exports = function createUsers(connections, storage, appKey, options) {

	var client = {
		login: createLogin(connections, storage, appKey, options)
	};

	methods.forEach(function(method) {
		client[method] = storageBind(storage.users, method, appKey, options);
	});

	return client;
};
