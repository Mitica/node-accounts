'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var createLogin = require('./login');
var storageBind = require('../storage_bind');
var hooks = require('./hooks');

var methods = ['getById', 'getByUsername', 'getByKey', 'update', 'deleteById'];

module.exports = function createUsers(connections, storage, appKey, options) {

	var client = {
		login: createLogin(connections, storage, appKey, options)
	};

	storageBind(client, storage.users, methods, hooks, appKey, options);

	return client;
};
