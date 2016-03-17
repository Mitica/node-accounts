'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');

var methods = ['sync', 'drop'];

module.exports = function createAdmin(storage, options) {

	var client = {};

	storageBind(client, storage.admin, methods, hooks, options);

	return client;
};
