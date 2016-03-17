'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');
var methods = require('./methods');

module.exports = function createUsers(storage, appId, options) {

	var client = {};

	storageBind(client, storage.users, methods, hooks, options, appId);

	return client;
};
