'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');

var methods = ['create', 'getById'];

module.exports = function createApps(storage, options) {

	var client = {};

	storageBind(client, storage.apps, methods, hooks, options);

	return client;
};
