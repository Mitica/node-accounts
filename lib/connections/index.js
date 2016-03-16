'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;
var storageBind = require('../storage_bind');
var methods = ['getById', 'findByUserId', 'deleteById', 'deleteByUserId'];
var hooks = require('./hooks');

module.exports = function createConnections(storage, appKey, options) {

	var client = {};

	storageBind(client, storage.connections, methods, hooks, appKey, options);

	return client;
};
