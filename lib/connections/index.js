'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');

var methods = ['create', 'update', 'getById', 'findByUserId', 'deleteById', 'deleteByUserId'];

module.exports = function createConnections(storage, appId, options) {

	var client = {};

	storageBind(client, storage.connections, methods, hooks, options, appId);

	return client;
};
