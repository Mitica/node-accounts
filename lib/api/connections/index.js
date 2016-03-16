'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var methods = ['getById', 'findByUserId', 'deleteById', 'deleteByUserId'];

module.exports = function createConnections(storage, appKey, options) {

	var client = {};

	methods.forEach(function(method) {
		client[method] = storageBind(storage.connections, method, appKey, options);
	});

	return client;
};
