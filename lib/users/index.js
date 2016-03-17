'use strict';

var storageBind = require('../storage_bind');
var hooks = require('./hooks');

var methods = ['create', 'update', 'getById', 'getByUsername', 'getByKey', 'deleteById'];

module.exports = function createUsers(storage, appId, options) {

	var client = {};

	storageBind(client, storage.users, methods, hooks, options, appId);

	return client;
};
