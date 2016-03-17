'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');
var methods = require('./methods');

module.exports = function createApps(storage, options) {

	var client = {};

	storageBind(client, storage.apps, methods, hooks, options);

	return client;
};
