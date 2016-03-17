'use strict';

var createLogin = require('./login');
var storageBind = require('../storage_bind');
var hooks = require('./hooks');

var methods = ['create', 'update', 'getById', 'getByUsername', 'getByKey', 'deleteById'];

module.exports = function createUsers(connections, storage, appId, options) {

	var client = {};

	storageBind(client, storage.users, methods, hooks, appId, options);

	client.login = createLogin(client, connections, storage, appId, options);

	return client;
};
