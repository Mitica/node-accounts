'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');
var methods = require('./methods');

module.exports = function createConnections(storage, appId, options) {

	var client = {};

	storageBind(client, storage.connections, methods, hooks, options, appId);

	return client;
};
