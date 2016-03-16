'use strict';

// var utils = require('./utils');
// var Promise = utils.Promise;

var createLogin = require('./login');
var storageBind = require('../storage_bind');

module.exports = function createUsers(connections, storage, appKey, options) {

	var client = {
		login: createLogin(connections, storage, appKey, options)
	};

	storageBind(client, storage, 'users', appKey, options);

	return client;
};
